import { createContext, useContext, useEffect, useState } from 'react'
import { supabase, mapAuthError } from '../lib/supabase'
import { AuthState, UserProfile, AuthResponse } from '../types/auth.types'
import { Session } from '@supabase/supabase-js'

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
  signUp: (email: string, password: string, fullName: string) => Promise<AuthResponse>
  signIn: (email: string, password: string) => Promise<AuthResponse>
  signOut: () => Promise<AuthResponse>
  updateProfile: (profile: Partial<UserProfile>) => Promise<AuthResponse>
  deleteAccount: () => Promise<AuthResponse>
  clearError: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
    error: null,
  })

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

  const value = {
    user: state.user,
    session: state.session,
    loading: state.loading,
    error: state.error?.message ?? null,
    clearError,
    
    signUp: async (email: string, password: string, fullName: string): Promise<AuthResponse> => {
      try {
        // Sign up the user
        const { data, error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        
        // Wait a moment for the trigger to create the profile
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Create or update the user's profile with their full name
        if (data.user) {
          // First check if profile exists
          const { data: existingProfile, error: checkError } = await supabase
            .from('profiles')
            .select('id')
            .eq('id', data.user.id)
            .single()
          
          if (checkError && checkError.code !== 'PGRST116') { // PGRST116 is "not found" error
            throw checkError
          }
          
          if (existingProfile) {
            // Update existing profile
            const { error: updateError } = await supabase
              .from('profiles')
              .update({ full_name: fullName })
              .eq('id', data.user.id)
            
            if (updateError) throw updateError
          } else {
            // Create new profile
            const { error: insertError } = await supabase
              .from('profiles')
              .insert({ 
                id: data.user.id,
                full_name: fullName,
                email: email
              })
            
            if (insertError) {
              console.error('Error inserting profile:', insertError);
              throw insertError;
            }
          }
          
          // Fetch the profile to update the state
          await fetchUserProfile(data.user.id)
        }
        
        return { success: true }
      } catch (error: any) {
        console.error('Error in signUp:', error);
        const errorType = mapAuthError(error)
        return {
          success: false,
          error: {
            type: errorType,
            message: error.message
          }
        }
      }
    },

    signIn: async (email: string, password: string): Promise<AuthResponse> => {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        
        // Fetch user profile after successful sign-in
        if (data.user) {
          await fetchUserProfile(data.user.id)
        }
        
        return { success: true }
      } catch (error: any) {
        const errorType = mapAuthError(error)
        return {
          success: false,
          error: {
            type: errorType,
            message: error.message
          }
        }
      }
    },

    signOut: async (): Promise<AuthResponse> => {
      try {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
        
        // Clear the user state and session
        setState(prev => ({ 
          ...prev, 
          user: null,
          session: null,
          loading: false
        }))
        
        return { success: true }
      } catch (error: any) {
        const errorType = mapAuthError(error)
        return {
          success: false,
          error: {
            type: errorType,
            message: error.message
          }
        }
      }
    },

    updateProfile: async (profile: Partial<UserProfile>): Promise<AuthResponse> => {
      try {
        if (!state.user?.id) {
          throw new Error('No user logged in')
        }
        
        const { error } = await supabase
          .from('profiles')
          .update({ ...profile, updated_at: new Date().toISOString() })
          .eq('id', state.user.id)
        
        if (error) throw error
        
        // Update the local user state
        setState(prev => ({
          ...prev,
          user: { ...prev.user!, ...profile }
        }))
        
        return { success: true }
      } catch (error: any) {
        return {
          success: false,
          error: {
            type: 'Unknown',
            message: error.message
          }
        }
      }
    },

    deleteAccount: async (): Promise<AuthResponse> => {
      try {
        if (!state.user?.id) {
          throw new Error('No user logged in')
        }
        
        // Call the server-side function to delete the user's account
        const { error: deleteError } = await supabase
          .rpc('delete_user', { user_id: state.user.id })
        
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
        }))
        
        return { success: true }
      } catch (error: any) {
        console.error('Error in deleteAccount:', error);
        return {
          success: false,
          error: {
            type: 'Unknown',
            message: error.message || 'Failed to delete account'
          }
        }
      }
    },
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