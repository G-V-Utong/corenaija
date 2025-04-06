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
  signUp: (email: string, password: string) => Promise<AuthResponse>
  signIn: (email: string, password: string) => Promise<AuthResponse>
  signOut: () => Promise<AuthResponse>
  updateProfile: (profile: Partial<UserProfile>) => Promise<AuthResponse>
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

  useEffect(() => {
    let mounted = true

    async function getInitialSession() {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        if (mounted) {
          if (error) throw error
          setState(prev => ({ ...prev, session, loading: false }))
        }
      } catch (error: any) {
        if (mounted) {
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
    
    signUp: async (email: string, password: string): Promise<AuthResponse> => {
      try {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
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

    signIn: async (email: string, password: string): Promise<AuthResponse> => {
      try {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
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
        const { error } = await supabase
          .from('profiles')
          .update({ ...profile, updated_at: new Date().toISOString() })
          .eq('id', state.user?.id)
        if (error) throw error
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