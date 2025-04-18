import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { supabase, mapAuthError } from '../lib/supabase'
import { AuthState, UserProfile, AuthResponse } from '../types/auth.types'
import { Session } from '@supabase/supabase-js'
import { useAppEvents } from './AppEventsContext'
import { USER_SIGNED_IN, USER_SIGNED_UP, USER_SIGNED_OUT } from './AppEventsContext'

type AuthChangeEvent =
  | 'INITIAL_SESSION'
  | 'SIGNED_IN'
  | 'SIGNED_OUT'
  | 'TOKEN_REFRESHED'
  | 'USER_UPDATED'
  | 'USER_DELETED'
  | 'PASSWORD_RECOVERY'

interface AuthContextType extends Omit<AuthState, 'error'> {
  error: string | null
  signUp: (email: string, password: string) => Promise<AuthResponse>
  signIn: (email: string, password: string) => Promise<AuthResponse>
  signOut: () => Promise<AuthResponse>
  updateProfile: (profile: Partial<UserProfile>) => Promise<AuthResponse>
  updateEmail: (newEmail: string, password: string) => Promise<AuthResponse>
  updatePassword: (newPassword: string) => Promise<AuthResponse>
  deleteAccount: () => Promise<AuthResponse>
  clearError: () => void
  resetPassword: (email: string) => Promise<AuthResponse>
  refreshUserProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
    error: null,
  })

  const { emit } = useAppEvents();

  const clearError = () => setState(prev => ({ ...prev, error: null }))

  // Function to fetch user profile
  const fetchUserProfile = async (userId: string) => {
    try {
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
      
      if (error) {
        if (error.code === 'PGRST116') {
          // Profile doesn't exist yet, create it
          const { data: newProfile, error: insertError } = await supabase
            .from('profiles')
            .insert({ id: userId })
            .select()
            .single()
          
          if (insertError) {
            console.error('Error creating profile:', insertError);
            throw insertError;
          }
          
          if (newProfile) {
            setState(prev => ({ ...prev, user: newProfile as UserProfile }));
          }
        } else {
          console.error('Error fetching user profile:', error);
          throw error;
        }
      } else if (data) {
        setState(prev => ({ ...prev, user: data as UserProfile }));
      }
    } catch (error: any) {
      console.error('Error in fetchUserProfile:', error);
    }
  }

  useEffect(() => {
    let mounted = true

    async function getInitialSession() {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        if (mounted) {
          if (error) throw error
          setState(prev => ({ ...prev, session, loading: false }))
          
          // Fetch user profile if session exists
          if (session?.user?.id) {
            await fetchUserProfile(session.user.id)
          }
        }
      } catch (error: any) {
        if (mounted) {
          console.error('Error getting initial session:', error);
          setState(prev => ({ 
            ...prev, 
            error: error.error || error,
            loading: false 
          }))
        }
      }
    }

    getInitialSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        
        setState(prev => ({ ...prev, session, loading: false }))
        
        // Fetch user profile when session changes
        if (session?.user?.id) {
          try {
            await fetchUserProfile(session.user.id)
          } catch (error) {
            console.error('Error fetching user profile on auth state change:', error);
          }
        } else {
          setState(prev => ({ ...prev, user: null }))
        }
      }
    )

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  const signIn = useCallback(async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return {
          success: false,
          error: {
            type: 'auth/signin-failed' as const,
            message: error.message
          }
        };
      }

      if (!data?.user) {
        return {
          success: false,
          error: {
            type: 'auth/no-user' as const,
            message: 'No user data returned'
          }
        };
      }

      // Check if onboarding is completed
      const { data: profile } = await supabase
        .from('profiles')
        .select('onboarding_completed')
        .eq('id', data.user.id)
        .single();

      setState(prev => ({ ...prev, user: data.user }));
      emit(USER_SIGNED_IN);

      return {
        success: true,
        onboardingCompleted: profile?.onboarding_completed
      };
    } catch (error) {
      return {
        success: false,
        error: {
          type: 'auth/unknown' as const,
          message: error instanceof Error ? error.message : 'Unknown error'
        }
      };
    }
  }, [emit]);

  const signUp = useCallback(async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        return {
          success: false,
          error: {
            type: 'auth/signup-failed' as const,
            message: error.message
          }
        };
      }

      if (!data?.user) {
        return {
          success: false,
          error: {
            type: 'auth/no-user' as const,
            message: 'No user data returned'
          }
        };
      }

      setState(prev => ({ ...prev, user: data.user }));
      emit(USER_SIGNED_UP);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: {
          type: 'auth/unknown' as const,
          message: error instanceof Error ? error.message : 'Unknown error'
        }
      };
    }
  }, [emit]);

  const signOut = useCallback(async (): Promise<AuthResponse> => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        return {
          success: false,
          error: {
            type: 'auth/signout-failed' as const,
            message: error.message
          }
        };
      }

      setState(prev => ({ ...prev, user: null, session: null }));
      emit(USER_SIGNED_OUT);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: {
          type: 'auth/unknown' as const,
          message: error instanceof Error ? error.message : 'Unknown error'
        }
      };
    }
  }, [emit]);

  const refreshUserProfile = useCallback(async (): Promise<void> => {
    if (!state.user?.id) return;
    
    try {
      const profile = await fetchUserProfile(state.user.id);
      if (!profile) {
        console.error('No profile data returned');
        return;
      }

      setState(prev => ({
        ...prev,
        user: {
          ...prev.user!,
          ...profile as UserProfile
        }
      }));
    } catch (error: any) {
      console.error('Error refreshing user profile:', error);
      setState(prev => ({ ...prev, error: error.message }));
    }
  }, [state.user?.id]);

  const updateProfile = useCallback(async (profile: Partial<UserProfile>): Promise<AuthResponse> => {
    try {
      if (!state.user?.id) {
        throw new Error('No user logged in');
      }
      
      const { error } = await supabase
        .from('profiles')
        .update({ ...profile, updated_at: new Date().toISOString() })
        .eq('id', state.user.id);
      
      if (error) throw error;
      
      // Update the local user state
      setState(prev => ({
        ...prev,
        user: { ...prev.user!, ...profile }
      }));
      
      return { success: true };
    } catch (error: any) {
      console.error('Error updating profile:', error);
      return {
        success: false,
        error: {
          type: 'auth/update-failed',
          message: error.message || 'Failed to update profile'
        }
      };
    }
  }, [state.user?.id]);

  const updateEmail = useCallback(async (newEmail: string, password: string): Promise<AuthResponse> => {
    try {
      if (!state.user?.id) {
        throw new Error('No user logged in');
      }
      
      // Update email in auth.users
      const { error: authError } = await supabase.auth.updateUser({
        email: newEmail
      });
      
      if (authError) throw authError;
      
      // Update email in profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ email: newEmail })
        .eq('id', state.user.id);
      
      if (profileError) throw profileError;
      
      // Update the local user state
      setState(prev => ({
        ...prev,
        user: { ...prev.user!, email: newEmail }
      }));
      
      return { success: true };
    } catch (error: any) {
      console.error('Error updating email:', error);
      return {
        success: false,
        error: {
          type: 'auth/update-failed',
          message: error.message || 'Failed to update email'
        }
      };
    }
  }, [state.user?.id]);

  const updatePassword = useCallback(async (newPassword: string): Promise<AuthResponse> => {
    try {
      if (!state.user?.id) {
        throw new Error('No user logged in');
      }
      
      // Update password in auth.users
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      
      if (error) throw error;
      
      return { success: true };
    } catch (error: any) {
      console.error('Error updating password:', error);
      return {
        success: false,
        error: {
          type: 'auth/update-failed',
          message: error.message || 'Failed to update password'
        }
      };
    }
  }, [state.user?.id]);

  const deleteAccount = useCallback(async (): Promise<AuthResponse> => {
    try {
      if (!state.user?.id) {
        throw new Error('No user logged in');
      }
      
      // Call the server-side function to delete the user's account
      const { error: deleteError } = await supabase
        .rpc('delete_user', { user_id: state.user.id });
      
      if (deleteError) {
        console.error('Error deleting user account:', deleteError);
        throw deleteError;
      }
      
      // Clear the user state and session
      setState(prev => ({ 
        ...prev, 
        user: null,
        session: null,
        loading: false
      }));
      
      return { success: true };
    } catch (error: any) {
      console.error('Error in deleteAccount:', error);
      return {
        success: false,
        error: {
          type: 'auth/delete-failed',
          message: error.message || 'Failed to delete account'
        }
      };
    }
  }, [state.user?.id]);

  const resetPassword = useCallback(async (email: string): Promise<AuthResponse> => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'naijacore://reset-password',
      });
      
      if (error) {
        setState(prev => ({ ...prev, error: error.message }));
        return {
          success: false,
          error: {
            type: 'auth/reset-failed',
            message: error.message
          }
        };
      }
      
      return { success: true };
    } catch (error: any) {
      setState(prev => ({ ...prev, error: error.message || 'An error occurred while resetting password' }));
      return {
        success: false,
        error: {
          type: 'auth/reset-failed',
          message: error.message || 'Failed to reset password'
        }
      };
    }
  }, []);

  const value: AuthContextType = {
    user: state.user,
    session: state.session,
    loading: state.loading,
    error: state.error?.message ?? null,
    clearError,
    signUp,
    signIn,
    signOut,
    updateProfile,
    updateEmail,
    updatePassword,
    deleteAccount,
    resetPassword,
    refreshUserProfile
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 