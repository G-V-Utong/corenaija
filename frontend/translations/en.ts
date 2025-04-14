export const en = {
  // Common
  common: {
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    update: 'Update',
    confirm: 'Confirm',
    next: 'Next',
    back: 'Back',
    skip: 'Skip',
    getStarted: 'Get Started',
  },

  // Auth Screens
  auth: {
    signIn: {
      title: 'Sign In',
      emailLabel: 'Email',
      emailPlaceholder: 'Enter your email',
      passwordLabel: 'Password',
      passwordPlaceholder: 'Enter your password',
      forgotPassword: 'Forgot Password?',
      noAccount: 'Don\'t have an account?',
      signUp: 'Sign Up',
      signInButton: 'Sign In',
    },
    signUp: {
      title: 'Create Account',
      fullNameLabel: 'Full Name',
      fullNamePlaceholder: 'Enter your full name',
      emailLabel: 'Email',
      emailPlaceholder: 'Enter your email',
      passwordLabel: 'Password',
      passwordPlaceholder: 'Enter your password',
      confirmPasswordLabel: 'Confirm Password',
      confirmPasswordPlaceholder: 'Confirm your password',
      signUpButton: 'Sign Up',
      hasAccount: 'Already have an account?',
      signIn: 'Sign In'
    },
    forgotPassword: {
      title: 'Forgot Password',
      description: 'Enter your email address and we\'ll send you a link to reset your password.',
      emailLabel: 'Email',
      emailPlaceholder: 'Enter your email',
      sendButton: 'Send Reset Link',
      backToSignIn: 'Back to Sign In',
    },
    resetPassword: {
      title: 'Reset Password',
      newPasswordLabel: 'New Password',
      newPasswordPlaceholder: 'Enter new password',
      confirmPasswordLabel: 'Confirm Password',
      confirmPasswordPlaceholder: 'Confirm new password',
      resetButton: 'Reset Password',
    },
  },

  // Tab Navigation
  tabs: {
    training: 'Training',
    nutrition: 'Nutrition',
    fasting: 'Fasting',
    profile: 'Profile',
  },

  // Sidebar Menu
  sidebar: {
    viewProfile: 'View profile',
    stats: {
      kilometers: 'Kilometers',
      rides: 'Rides'
    },
    menu: {
      coach: 'Coach',
      trainingHistory: 'Training History',
      nutrition: 'Nutrition',
      help: 'Help',
      about: 'About',
      settings: 'Settings'
    }
  },

  // Training Screen
  training: {
    title: 'Training',
    startWorkout: 'Start Workout',
    noWorkouts: 'No workouts yet',
  },

  // Nutrition Screen
  nutrition: {
    title: 'Nutrition',
    trackMeal: 'Track Meal',
    noMeals: 'No meals tracked yet',
  },

  // Fasting Screen
  fasting: {
    title: 'Fasting',
    startFast: 'Start Fast',
    endFast: 'End Fast',
    noFasts: 'No fasts tracked yet',
  },

  // Profile Screen
  profile: {
    title: 'Profile',
    editProfile: 'Edit Profile',
    myProgress: 'My Progress',
    achievements: 'Achievements',
  },

  // Onboarding
  onboarding: {
    getStarted: {
      title: 'Welcome to FitCore',
      description: 'Your all-in-one fitness companion',
      startButton: 'Get Started',
    },
  },

  // Calendar
  calendar: {
    weekDays: {
      sunday: 'S',
      monday: 'M',
      tuesday: 'T',
      wednesday: 'W',
      thursday: 'T',
      friday: 'F',
      saturday: 'S',
    },
    months: {
      january: 'January',
      february: 'February',
      march: 'March',
      april: 'April',
      may: 'May',
      june: 'June',
      july: 'July',
      august: 'August',
      september: 'September',
      october: 'October',
      november: 'November',
      december: 'December',
    },
    selectYear: 'Select Year',
    activities: 'Activities',
    history: 'History',
    bodyInformation: 'Body Information',
    add: 'Add'
  },

  // Settings Screen
  settings: {
    title: 'Settings',
    theme: {
      label: 'Theme',
      light: 'Light',
      dark: 'Dark',
      system: 'System',
      modalTitle: 'Choose Theme',
    },
    account: {
      label: 'Account',
      value: 'Manage',
      modalTitle: 'Account Settings',
      changeEmail: 'Change Email',
      changePassword: 'Change Password',
      currentEmail: 'Current Email',
      newEmail: 'New Email',
      enterNewEmail: 'Enter new email',
      currentPassword: 'Current Password',
      enterCurrentPassword: 'Enter current password',
      newPassword: 'New Password',
      enterNewPassword: 'Enter new password',
      confirmPassword: 'Confirm Password',
      confirmNewPassword: 'Confirm new password',
      passwordsDontMatch: 'Passwords do not match',
      emailUpdated: 'Email updated successfully',
      passwordUpdated: 'Password updated successfully',
    },
    notifications: {
      label: 'Notifications',
      value: 'On',
    },
    language: {
      label: 'Language',
      modalTitle: 'Select Language',
      selectLanguage: 'Select your language'
    },
    deleteAccount: {
      label: 'Delete Account',
      modalTitle: 'Delete Account',
      warning: 'This action is irreversible. All your data will be permanently deleted.',
      question: 'Are you sure you want to delete your account?',
      deleting: 'Deleting...',
    },
    logout: {
      label: 'Logout',
    },
  },

  // Form Validation
  validation: {
    required: 'Please fill in all required fields',
    invalidEmail: 'Please enter a valid email',
    passwordLength: 'Password must be at least 8 characters',
    passwordsDontMatch: 'Passwords do not match',
  },

  // Error Messages
  errors: {
    default: 'An error occurred. Please try again.',
    updateFailed: 'Update failed',
    deleteFailed: 'Failed to delete account',
    signInFailed: 'Sign in failed',
    signUpFailed: 'Failed to create account',
    resetPasswordFailed: 'Failed to reset password',
    networkError: 'Network error. Please check your connection.',
  },
}; 