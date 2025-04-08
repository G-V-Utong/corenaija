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

export default function SignInScreen() {
  const router = useRouter()
  const { signIn, error, loading, clearError } = useAuth()
  const { showToast } = useToast()
  const { isDarkMode } = useTheme()
  const { t } = useLanguage()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert(t('common.error'), t('validation.required'))
      return
    }
    
    setIsSubmitting(true)
    clearError()
    
    try {
      setIsLoading(true)
      const response = await signIn(email, password)
      if (response.success) {
        showToast('Successfully signed in!', 'success')
        router.push('/(tabs)')
      } else {
        showToast(error || 'Failed to sign in', 'error')
      }
    } catch (err) {
      console.error('Sign in error:', err)
      showToast('An error occurred during sign in', 'error')
    } finally {
      setIsSubmitting(false)
      setIsLoading(false)
    }
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <ThemedText style={styles.title}>{t('auth.signIn.title')}</ThemedText>
        
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>{t('auth.signIn.emailLabel')}</ThemedText>
            <TextInput
              style={[
                styles.input,
                { 
                  color: isDarkMode ? '#FFFFFF' : '#000000',
                  backgroundColor: isDarkMode ? '#1E293B' : '#F1F5F9',
                  borderColor: isDarkMode ? '#334155' : '#CBD5E1'
                }
              ]}
              placeholder={t('auth.signIn.emailPlaceholder')}
              placeholderTextColor={isDarkMode ? '#64748B' : '#94A3B8'}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>{t('auth.signIn.passwordLabel')}</ThemedText>
            <TextInput
              style={[
                styles.input,
                { 
                  color: isDarkMode ? '#FFFFFF' : '#000000',
                  backgroundColor: isDarkMode ? '#1E293B' : '#F1F5F9',
                  borderColor: isDarkMode ? '#334155' : '#CBD5E1'
                }
              ]}
              placeholder={t('auth.signIn.passwordPlaceholder')}
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

          <TouchableOpacity 
            style={styles.forgotPassword}
            onPress={() => router.push('/forgot-password')}
          >
            <ThemedText style={styles.forgotPasswordText}>
              {t('auth.signIn.forgotPassword')}
            </ThemedText>
          </TouchableOpacity>

          {error && <Text style={styles.errorText}>{error}</Text>}

          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleSignIn}
            disabled={isLoading}
          >
            <ThemedText style={styles.buttonText}>
              {isLoading ? t('common.loading') : t('auth.signIn.signInButton')}
            </ThemedText>
          </TouchableOpacity>

          <View style={styles.footer}>
            <ThemedText style={styles.footerText}>
              {t('auth.signIn.noAccount')}
            </ThemedText>
            <TouchableOpacity onPress={() => router.push('/sign-up')}>
              <ThemedText style={styles.footerLink}>
                {t('auth.signIn.signUp')}
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ThemedView>
  )
} 