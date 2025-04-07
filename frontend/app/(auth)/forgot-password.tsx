import { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { useRouter } from 'expo-router'
import { supabase } from '../../lib/supabase'
import { useToast } from '../../context/ToastContext'
import { authStyles as styles } from '../../styles/auth.styles'
import { Ionicons } from '@expo/vector-icons'
import HomeLogo from '@/components/HomeLogo'

export default function ForgotPassword() {
  const router = useRouter()
  const { showToast } = useToast()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

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
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.logoContainer}>
        <HomeLogo size={40} color="#FF6B00" />
      </View>


        <View style={styles.header}>
          <Text style={styles.headerText}>Forgot Password</Text>
          <Text style={styles.subHeaderText}>
            {sent 
              ? 'Check your email for reset instructions' 
              : 'Enter your email to reset your password'}
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color="#64748B" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholderTextColor="#94A3B8"
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

          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.push('/sign-in')}
          >
            <Ionicons name="arrow-back" size={20} color="#FF6B00" />
            <Text style={styles.backButtonText}>Back to Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
} 