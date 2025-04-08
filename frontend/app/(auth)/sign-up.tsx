import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native'
import { useRouter } from 'expo-router'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import { authStyles as styles } from '../../styles/auth.styles'
import { Ionicons } from '@expo/vector-icons'
import HomeLogo from '@/components/HomeLogo'
import { useTheme } from '../../context/ThemeContext'
import { useLanguage } from '../../context/LanguageContext'
import { ThemedView } from '../../components/ThemedView'
import { ThemedText } from '../../components/ThemedText'

export default function SignUp() {
  const router = useRouter()
  const { signUp, error, loading, clearError, updateProfile } = useAuth()
  const { showToast } = useToast()
  const { isDarkMode } = useTheme()
  const { t } = useLanguage()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSignUp = async () => {
    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert(t('common.error'), t('validation.required'))
      return
    }

    if (password !== confirmPassword) {
      Alert.alert(t('common.error'), t('validation.passwordsDontMatch'))
      return
    }

    try {
      setIsLoading(true)
      const response = await signUp(email, password, fullName)
      if (!response.success) {
        Alert.alert(t('common.error'), response.error?.message || t('errors.signUpFailed'))
      }
    } catch (error) {
      console.error('Sign up error:', error)
      Alert.alert(t('common.error'), t('errors.default'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <ThemedText style={styles.title}>{t('auth.signUp.title')}</ThemedText>
        
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>{t('auth.signUp.fullNameLabel')}</ThemedText>
            <TextInput
              style={[
                styles.input,
                { 
                  color: isDarkMode ? '#FFFFFF' : '#000000',
                  backgroundColor: isDarkMode ? '#1E293B' : '#F1F5F9',
                  borderColor: isDarkMode ? '#334155' : '#CBD5E1'
                }
              ]}
              value={fullName}
              onChangeText={setFullName}
              placeholder={t('auth.signUp.fullNamePlaceholder')}
              placeholderTextColor={isDarkMode ? '#64748B' : '#94A3B8'}
            />
          </View>

          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>{t('auth.signUp.emailLabel')}</ThemedText>
            <TextInput
              style={[
                styles.input,
                { 
                  color: isDarkMode ? '#FFFFFF' : '#000000',
                  backgroundColor: isDarkMode ? '#1E293B' : '#F1F5F9',
                  borderColor: isDarkMode ? '#334155' : '#CBD5E1'
                }
              ]}
              value={email}
              onChangeText={setEmail}
              placeholder={t('auth.signUp.emailPlaceholder')}
              placeholderTextColor={isDarkMode ? '#64748B' : '#94A3B8'}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>{t('auth.signUp.passwordLabel')}</ThemedText>
            <TextInput
              style={[
                styles.input,
                { 
                  color: isDarkMode ? '#FFFFFF' : '#000000',
                  backgroundColor: isDarkMode ? '#1E293B' : '#F1F5F9',
                  borderColor: isDarkMode ? '#334155' : '#CBD5E1'
                }
              ]}
              value={password}
              onChangeText={setPassword}
              placeholder={t('auth.signUp.passwordPlaceholder')}
              placeholderTextColor={isDarkMode ? '#64748B' : '#94A3B8'}
              secureTextEntry
            />
          </View>

          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>{t('auth.signUp.confirmPasswordLabel')}</ThemedText>
            <TextInput
              style={[
                styles.input,
                { 
                  color: isDarkMode ? '#FFFFFF' : '#000000',
                  backgroundColor: isDarkMode ? '#1E293B' : '#F1F5F9',
                  borderColor: isDarkMode ? '#334155' : '#CBD5E1'
                }
              ]}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder={t('auth.signUp.confirmPasswordPlaceholder')}
              placeholderTextColor={isDarkMode ? '#64748B' : '#94A3B8'}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleSignUp}
            disabled={isLoading}
          >
            <ThemedText style={styles.buttonText}>
              {isLoading ? t('common.loading') : t('auth.signUp.signUpButton')}
            </ThemedText>
          </TouchableOpacity>

          <View style={styles.footer}>
            <ThemedText style={styles.footerText}>
              {t('auth.signUp.hasAccount')}
            </ThemedText>
            <TouchableOpacity onPress={() => router.push('/sign-in')}>
              <ThemedText style={styles.footerLink}>
                {t('auth.signUp.signIn')}
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ThemedView>
  )
} 