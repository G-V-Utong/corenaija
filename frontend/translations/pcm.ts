export const pcm = {
  // Common
  common: {
    loading: 'E dey load...',
    error: 'Error',
    success: 'E don work!',
    cancel: 'Cancel am',
    save: 'Save am',
    delete: 'Delete am',
    update: 'Update am',
    confirm: 'Confirm am',
    next: 'Next',
    back: 'Go back',
    skip: 'Skip am',
    getStarted: 'Start am',
  },

  // Auth Screens
  auth: {
    signIn: {
      title: 'Sign In',
      emailLabel: 'Email',
      emailPlaceholder: 'Put your email',
      passwordLabel: 'Password',
      passwordPlaceholder: 'Put your password',
      forgotPassword: 'You don forget password?',
      noAccount: 'You never get account?',
      signUp: 'Create Account',
      signInButton: 'Enter',
    },
    signUp: {
      title: 'Create New Account',
      fullNameLabel: 'Your Full Name',
      fullNamePlaceholder: 'Put your full name',
      emailLabel: 'Email Address',
      emailPlaceholder: 'Put your email',
      passwordLabel: 'Password',
      passwordPlaceholder: 'Put your password',
      confirmPasswordLabel: 'Confirm Password',
      confirmPasswordPlaceholder: 'Put your password again',
      signUpButton: 'Create Account',
      hasAccount: 'You get account already?',
      signIn: 'Sign In Now'
    },
    forgotPassword: {
      title: 'Forgot Password',
      description: 'Put your email make we send you link to change your password.',
      emailLabel: 'Email',
      emailPlaceholder: 'Put your email',
      sendButton: 'Send Reset Link',
      backToSignIn: 'Go back to Sign In',
    },
    resetPassword: {
      title: 'Change Password',
      newPasswordLabel: 'New Password',
      newPasswordPlaceholder: 'Put new password',
      confirmPasswordLabel: 'Confirm Password',
      confirmPasswordPlaceholder: 'Put new password again',
      resetButton: 'Change Password',
    },
  },

  // Tab Navigation
  tabs: {
    training: 'Training',
    nutrition: 'Food Matter',
    fasting: 'Fasting',
    profile: 'My Profile',
  },

  // Sidebar Menu
  sidebar: {
    viewProfile: 'See your profile',
    stats: {
      kilometers: 'Kilometers',
      rides: 'Rides'
    },
    menu: {
      coach: 'Coach',
      trainingHistory: 'Training Record',
      nutrition: 'Food Matter',
      help: 'Help Me',
      about: 'About Us',
      settings: 'Settings'
    }
  },

  // Training Screen
  training: {
    title: 'Training',
    startWorkout: 'Start Workout',
    noWorkouts: 'You never do any workout',
  },

  // Nutrition Screen
  nutrition: {
    title: 'Food',
    trackMeal: 'Add Food',
    noMeals: 'You never add any food',
  },

  // Fasting Screen
  fasting: {
    title: 'Fasting',
    startFast: 'Start Fasting',
    endFast: 'Stop Fasting',
    noFasts: 'You never do any fasting',
  },

  // Profile Screen
  profile: {
    title: 'My Profile',
    editProfile: 'Edit Profile',
    myProgress: 'My Progress',
    achievements: 'My Achievements',
  },

  // Onboarding
  onboarding: {
    getStarted: {
      title: 'Welcome to FitCore',
      description: 'Your complete fitness partner',
      startButton: 'Start am',
    },
  },

  // Settings Screen
  settings: {
    title: 'Settings',
    theme: {
      label: 'Theme',
      light: 'Light Mode',
      dark: 'Dark Mode',
      system: 'System Mode',
      modalTitle: 'Choose your Theme',
    },
    account: {
      label: 'Account',
      value: 'Manage am',
      modalTitle: 'Account Settings',
      changeEmail: 'Change Email',
      changePassword: 'Change Password',
      currentEmail: 'Your Email now',
      newEmail: 'New Email',
      enterNewEmail: 'Put your new email',
      currentPassword: 'Your Password now',
      enterCurrentPassword: 'Put your password',
      newPassword: 'New Password',
      enterNewPassword: 'Put your new password',
      confirmPassword: 'Confirm Password',
      confirmNewPassword: 'Put your new password again',
      passwordsDontMatch: 'The passwords no match',
      emailUpdated: 'Email don change well!',
      passwordUpdated: 'Password don change well!',
    },
    notifications: {
      label: 'Notifications',
      value: 'On',
    },
    language: {
      label: 'Language',
      modalTitle: 'Choose Language',
      selectLanguage: 'Choose di language wey you want'
    },
    deleteAccount: {
      label: 'Delete Account',
      modalTitle: 'Delete Account',
      warning: 'This one no fit change back o. All your things go disappear forever.',
      question: 'You sure say you wan delete your account?',
      deleting: 'E dey delete...',
    },
    logout: {
      label: 'Comot',
    },
  },

  // Form Validation
  validation: {
    required: 'Abeg fill all di fields wey dey required',
    invalidEmail: 'Abeg put correct email',
    passwordLength: 'Password must reach 8 characters',
    passwordsDontMatch: 'Di passwords no match',
  },

  // Error Messages
  errors: {
    default: 'Error don happen. Abeg try again.',
    updateFailed: 'E no fit update',
    deleteFailed: 'E no fit delete account',
    signInFailed: 'E no fit sign in',
    signUpFailed: 'E no fit create account',
    resetPasswordFailed: 'E no fit change password',
    networkError: 'Network wahala. Abeg check your connection.',
  },
}; 