import { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'
import { useAuth } from '../../context/AuthContext'
import { authStyles as styles } from '../../styles/auth.styles'

export default function SignUp() {
  const router = useRouter()
  const { signUp, error, loading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      // Handle password mismatch
      return
    }

    const response = await signUp(email, password)
    if (response.success) {
      router.push('/(auth)/onboarding' as any) // Temporary type assertion
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Create Account</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        {error && <Text style={styles.errorText}>{error}</Text>}

        <TouchableOpacity 
          style={styles.button} 
          onPress={handleSignUp}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Sign Up</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/sign-in')}>
          <Text style={styles.linkText}>Already have an account? Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
} 