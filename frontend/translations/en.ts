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
    ok: 'OK',
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

  // Water Tracker
  waterTracker: {
    title: 'Water Tracker',
    description: 'To support your health and overall success, staying well-hydrated is essential. Our recommended daily minimum of 2.0 L is calculated based on your body weight.',
    waterDrunk: 'Water drunk:',
    goal: 'Goal: {amount} L',
    dailyGoal: {
      title: 'Daily Goal',
      value: '2.0 L'
    },
    servingSize: {
      title: 'Serving Size',
      value: '0.3 L per glass'
    },
    reminders: {
      title: 'Reminders',
      interval: 'Reminder interval',
      hourFormat: '{hours} Hr'
    },
    notifications: {
      title: 'Stay Hydrated! 💧',
      body: 'Time to drink some water. Your body will thank you!'
    }
  },

  // Weight Tracker
  weightTracker: {
    title: "Weight",
    starting: "Starting",
    goal: "Goal",
    updateWeight: "Update Weight",
    enterWeight: "Enter weight (kg)",
    save: "Save",
    timeframes: {
      day: "Day",
      week: "Week",
      month: "Month"
    }
  },

  // Activity Summary
  activitySummary: {
    title: 'Activity Summary',
    timeframes: {
      today: 'Today',
      week: 'Week',
      month: 'Month'
    },
    stats: {
      activeMinutes: {
        title: 'Active Minutes',
        value: '{minutes}',
        info: 'Measures your total active minutes. Aim for at least 30 minutes daily.'
      },
      caloriesBurned: {
        title: 'Calories Burned',
        value: '{calories}',
        info: 'Shows calories burned through activity. Target varies by goal.'
      },
      fastingHours: {
        title: 'Fasting Hours',
        value: '{hours}',
        info: 'Tracks your fasting hours. Common goal: 16 hours.'
      },
      waterIntake: {
        title: 'Water Intake',
        value: '{amount}/{goal}L',
        info: 'Tracks your daily water intake. Recommended: 2L per day.'
      }
    },
    workoutDuration: {
      title: '{duration} mins',
      subtitle: 'Workout Duration',
      info: 'Duration of your workout session. Aim for 30-60 minutes.'
    },
    weekDays: {
      mon: 'MON',
      tue: 'TUE',
      wed: 'WED',
      thu: 'THU',
      fri: 'FRI',
      sat: 'SAT',
      sun: 'SUN'
    }
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

  // BMI Information
  bmi: {
    title: "BMI (kg/m²)",
    description: "Body Mass Index (BMI) is a simple measure that uses your height and weight to work out if your weight is healthy.",
    status: {
      underweight: "Underweight",
      normal: "Normal",
      overweight: "Overweight",
      obese: "Obese"
    },
    ranges: {
      underweight: "Underweight: less than 18.5",
      normal: "Normal weight: 18.5 to 24.9",
      overweight: "Overweight: 25 to 29.9",
      obese: "Obese: 30 or greater"
    },
    recommendation: "For your height of {{height}}cm, a healthy weight range would be between {{minWeight}}kg and {{maxWeight}}kg"
  },
};