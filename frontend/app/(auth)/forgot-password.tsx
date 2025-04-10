import { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { useRouter } from 'expo-router'
import { supabase } from '../../lib/supabase'
import { useToast } from '../../context/ToastContext'
import { authStyles as styles } from '../../styles/auth.styles'
import { Ionicons } from '@expo/vector-icons'
import HomeLogo from '@/components/HomeLogo'
import { ThemedText } from '@/components/ThemedText'
import { useTheme } from '@/context/ThemeContext'

export default function ForgotPassword() {
  const router = useRouter()
  const { showToast } = useToast()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const { isDarkMode } = useTheme()

  const handleResetPassword = async () => {
    if (!email) {
      showToast('Please enter your email address', 'error')
      return
    }

    setLoading(true)
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'naijacore://reset-password',
      })
      
      if (error) throw error
      
      setSent(true)
      showToast('Password reset link sent to your email', 'success')
      
      setTimeout(() => {
        router.push('/reset-password')
      }, 1500)
    } catch (error: any) {
      showToast(error.message || 'Failed to send reset link', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.logoContainer}>
        <HomeLogo size={40} color="#FF6B00" />
      </View>


        <View style={styles.header}>
          <Text style={styles.title}>Forgot Password</Text>
          <Text style={styles.subtitle}>
            {sent 
              ? 'Check your email for reset instructions' 
              : 'Enter your email to reset your password'}
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
          <ThemedText style={styles.label}>Email</ThemedText>
            <TextInput
              style={[
                styles.input,
                { 
                  color: isDarkMode ? '#FFFFFF' : '#000000',
                  backgroundColor: isDarkMode ? '#1E293B' : '#F1F5F9',
                  borderColor: isDarkMode ? '#334155' : '#CBD5E1'
                }
              ]}
              placeholder="Enter your email"
              placeholderTextColor={isDarkMode ? '#64748B' : '#94A3B8'}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              editable={!sent}
            />
          </View>

          <TouchableOpacity 
            style={styles.button} 
            onPress={handleResetPassword}
            disabled={loading || !email || sent}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>
                {sent ? 'Email Sent' : 'Reset Password'}
              </Text>
            )}
          </TouchableOpacity>

          <View style={styles.footer}>
          <Ionicons name="arrow-back" size={20} color="#FF6B00" />
              
              <TouchableOpacity onPress={() => router.push('/sign-in')}>
              <ThemedText style={styles.backButtonText}>
                Back to Sign In
              </ThemedText>
              </TouchableOpacity>
            </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
} 