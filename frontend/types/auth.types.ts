import { AuthError, Session } from '@supabase/supabase-js'

export interface UserProfile {
  id: string
  email: string
  first_name?: string
  last_name?: string
  full_name?: string
  avatar_url?: string
  onboarding_completed?: boolean
  created_at?: string
  updated_at?: string
}

export interface AuthState {
  user: UserProfile | null
  session: Session | null
  loading: boolean
  error: AuthError | null
}

export type AuthErrorType = 
  | 'auth/signup-failed'
  | 'auth/signin-failed'
  | 'auth/signout-failed'
  | 'auth/no-user'
  | 'auth/unknown'
  | 'auth/update-failed'
  | 'auth/delete-failed'
  | 'auth/reset-failed'

export interface AuthResponse {
  success: boolean
  error?: {
    type: AuthErrorType
    message: string
  }
  onboardingCompleted?: boolean
}