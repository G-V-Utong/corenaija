import { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { useRouter } from 'expo-router'
import { supabase } from '../../lib/supabase'
import { useToast } from '../../context/ToastContext'
import { authStyles as styles } from '../../styles/auth.styles'
import { Ionicons } from '@expo/vector-icons'
import HomeLogo from '@/components/HomeLogo'

export default function ResetPassword() {
  const router = useRouter()
  const { showToast } = useToast()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleResetPassword = async () => {
    if (!password || !confirmPassword) {
      showToast('Please fill in all fields', 'error')
      return
    }

    if (password !== confirmPassword) {
      showToast('Passwords do not match', 'error')
      return
    }

    setLoading(true)
    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      })
      
      if (error) throw error
      
      showToast('Your password has been reset successfully', 'success')
      setTimeout(() => {
        router.push('/sign-in')
      }, 1500)
    } catch (error: any) {
      showToast(error.message || 'Failed to reset password', 'error')
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
          <Text style={styles.headerText}>Reset Password</Text>
          <Text style={styles.subHeaderText}>
            Enter your new password
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#64748B" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="New Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              placeholderTextColor="#94A3B8"
            />
            <TouchableOpacity 
              onPress={() => setShowPassword(!showPassword)}
              style={styles.passwordToggle}
            >
              <Ionicons 
                name={showPassword ? "eye-outline" : "eye-off-outline"} 
                size={20} 
                color="#64748B" 
              />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#64748B" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              placeholderTextColor="#94A3B8"
            />
            <TouchableOpacity 
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              style={styles.passwordToggle}
            >
              <Ionicons 
                name={showConfirmPassword ? "eye-outline" : "eye-off-outline"} 
                size={20} 
                color="#64748B" 
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={styles.button} 
            onPress={handleResetPassword}
            disabled={loading || !password || !confirmPassword}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Reset Password</Text>
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