import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
import { AppState, AppStateStatus } from 'react-native'
import Constants from 'expo-constants'
import { AuthErrorType } from '../types/auth.types'

const SUPABASE_URL = Constants.expoConfig?.extra?.supabaseUrl
const SUPABASE_ANON_KEY = Constants.expoConfig?.extra?.supabaseAnonKey

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
  db: {
    schema: 'public',
  },
})

// Handle app state changes
AppState.addEventListener('change', (state: AppStateStatus) => {
  if (state === 'active') {
    supabase.realtime.connect()
  } else if (state === 'background') {
    supabase.realtime.disconnect()
  }
})

export const mapAuthError = (error: any): AuthErrorType => {
  if (!error) return 'Unknown'
  
  switch (error.message) {
    case 'Invalid login credentials':
      return 'InvalidCredentials'
    case 'Email not confirmed':
      return 'EmailNotConfirmed'
    case 'Network error':
      return 'NetworkError'
    case 'User already registered':
      return 'UserExists'
    case 'Invalid phone number':
      return 'InvalidPhone'
    default:
      return 'Unknown'
  }
} 