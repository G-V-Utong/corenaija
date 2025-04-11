import { AuthError, Session } from '@supabase/supabase-js'

export interface UserProfile {
  id: string
  email?: string
  phone?: string
  full_name: string
  first_name: string
  age: number
  fitness_goals: string[]
  height?: number
  weight?: number
  created_at: string
  updated_at: string
}

export interface AuthState {
  user: UserProfile | null
  session: Session | null
  loading: boolean
  error: AuthError | null
}

export type AuthErrorType = 
  | 'InvalidCredentials'
  | 'EmailNotConfirmed'
  | 'NetworkError'
  | 'UserExists'
  | 'InvalidPhone'
  | 'Unknown'

export interface AuthResponse {
  success: boolean
  onboardingCompleted?: boolean
  error?: {
    type: AuthErrorType
    message: string
  }
} 