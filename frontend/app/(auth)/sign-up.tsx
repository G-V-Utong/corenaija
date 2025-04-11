import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native'
import { useRouter } from 'expo-router'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import { authStyles as styles } from '../../styles/auth.styles'
import { Ionicons } from '@expo/vector-icons'
import HomeLogo from '@/components/HomeLogo'
import { ThemedView } from '../../components/ThemedView'
import { ThemedText } from '../../components/ThemedText'
import { useTheme } from '../../context/ThemeContext'
import { useLanguage } from '../../context/LanguageContext'

export default function SignUpScreen() {
  const router = useRouter()
  const { signUp, error, loading, clearError } = useAuth()
  const { showToast } = useToast()
  const { isDarkMode } = useTheme()
  const { t } = useLanguage()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields')
      return
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match')
      return
    }
    
    setIsSubmitting(true)
    clearError()
    
    try {
      setIsLoading(true)
      const response = await signUp(email, password)
      if (response.success) {
        showToast('Successfully signed up!', 'success')
        router.replace('/onboarding')
      } else {
        showToast(error || 'Failed to sign up', 'error')
      }
    } catch (err) {
      console.error('Sign up error:', err)
      showToast('An error occurred during sign up', 'error')
    } finally {
      setIsSubmitting(false)
      setIsLoading(false)
    }
  }

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.logoContainer}>
            <HomeLogo size={40} />
          </View>
          
          <ThemedText style={styles.title}>Create Account</ThemedText>
          <ThemedText style={styles.subtitle}>Join us to start your fitness journey</ThemedText>
          
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
              />
            </View>

            <View style={styles.inputContainer}>
              <ThemedText style={styles.label}>Password</ThemedText>
              <TextInput
                style={[
                  styles.input,
                  { 
                    color: isDarkMode ? '#FFFFFF' : '#000000',
                    backgroundColor: isDarkMode ? '#1E293B' : '#F1F5F9',
                    borderColor: isDarkMode ? '#334155' : '#CBD5E1'
                  }
                ]}
                placeholder="Enter your password"
                placeholderTextColor={isDarkMode ? '#64748B' : '#94A3B8'}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
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
              <ThemedText style={styles.label}>Confirm Password</ThemedText>
              <TextInput
                style={[
                  styles.input,
                  { 
                    color: isDarkMode ? '#FFFFFF' : '#000000',
                    backgroundColor: isDarkMode ? '#1E293B' : '#F1F5F9',
                    borderColor: isDarkMode ? '#334155' : '#CBD5E1'
                  }
                ]}
                placeholder="Confirm your password"
                placeholderTextColor={isDarkMode ? '#64748B' : '#94A3B8'}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
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

            {error && <Text style={styles.errorText}>{error}</Text>}

            <TouchableOpacity
              style={[styles.button, isLoading && styles.buttonDisabled]}
              onPress={handleSignUp}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <ThemedText style={styles.buttonText}>
                  Sign Up
                </ThemedText>
              )}
            </TouchableOpacity>

            <View style={styles.footer}>
              <ThemedText style={styles.footerText}>
                Already have an account?
              </ThemedText>
              <TouchableOpacity onPress={() => router.replace('/sign-in')}>
                <ThemedText style={styles.footerLink}>
                  Sign In
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  )
} 