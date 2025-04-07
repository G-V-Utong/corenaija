import { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { useRouter } from 'expo-router'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import { authStyles as styles } from '../../styles/auth.styles'
import { Ionicons } from '@expo/vector-icons'
import HomeLogo from '@/components/HomeLogo'

export default function SignIn() {
  const router = useRouter()
  const { signIn, error, loading, clearError } = useAuth()
  const { showToast } = useToast()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSignIn = async () => {
    if (!email || !password) {
      return
    }
    
    setIsSubmitting(true)
    clearError()
    
    try {
      const response = await signIn(email, password)
      if (response.success) {
        showToast('Successfully signed in!', 'success')
        router.push('/(tabs)')
      } else {
        showToast(error || 'Failed to sign in', 'error')
      }
    } catch (err) {
      showToast('An error occurred during sign in', 'error')
    } finally {
      setIsSubmitting(false)
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
          <Text style={styles.headerText}>Welcome Back</Text>
          <Text style={styles.subHeaderText}>Sign in to continue</Text>
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
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#64748B" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
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

          <TouchableOpacity 
            onPress={() => router.push('/forgot-password')}
            style={styles.forgotPassword}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          {error && <Text style={styles.errorText}>{error}</Text>}

          <TouchableOpacity 
            style={styles.button} 
            onPress={handleSignIn}
            disabled={isSubmitting || !email || !password}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Sign In</Text>
            )}
          </TouchableOpacity>

          {/* <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity 
            style={styles.socialButton}
            onPress={() => {}}
          >
            <Ionicons name="logo-google" size={20} color="#000" />
            <Text style={styles.socialButtonText}>Continue with Google</Text>
          </TouchableOpacity> */}

          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/sign-up')}>
              <Text style={styles.signUpLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
} 