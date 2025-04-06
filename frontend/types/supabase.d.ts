declare module '@supabase/supabase-js' {
  export * from '@supabase/supabase-js'
  export const createClient: any
  export type AuthChangeEvent =
    | 'INITIAL_SESSION'
    | 'SIGNED_IN'
    | 'SIGNED_OUT'
    | 'TOKEN_REFRESHED'
    | 'USER_UPDATED'
    | 'USER_DELETED'
    | 'PASSWORD_RECOVERY'

  export interface Session {
    access_token: string
    refresh_token: string
    expires_in: number
    expires_at: number
    user: any
  }

  export interface AuthError {
    message: string
    status: number
  }
} 