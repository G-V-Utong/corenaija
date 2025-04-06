import { StyleSheet } from 'react-native'

export const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    marginVertical: 36,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  form: {
    gap: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#3B82F6',
    padding: 16,
    borderRadius: 8,
    marginTop: 24,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  linkText: {
    color: '#3B82F6',
    textAlign: 'center',
    marginTop: 16,
  },
  errorText: {
    color: '#EF4444',
    textAlign: 'center',
    marginTop: 8,
  },
}) 