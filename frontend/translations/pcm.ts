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
    ok: 'OK',
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
    selectYear: 'Choose Year',
    activities: 'Exercise Wey You Don Do',
    history: 'All Your Exercise History',
    bodyInformation: 'Body Info',
    add: 'Add New One'
  },

  // Water Tracker
  waterTracker: {
    title: 'Water Monitor',
    description: 'To make your body strong and healthy, you need to drink enough water. We don calculate say you need at least 2.0 L based on your body weight.',
    waterDrunk: 'Water wey you don drink:',
    goal: 'Target: {amount} L',
    dailyGoal: {
      title: 'Daily Target',
      value: '2.0 L'
    },
    servingSize: {
      title: 'Cup Size',
      value: '0.3 L per cup'
    },
    reminders: {
      title: 'Reminders',
      interval: 'Time between reminders',
      hourFormat: '{hours} Hour'
    },
    notifications: {
      title: 'Drink Water! ',
      body: 'Time to drink water. Your body go thank you!'
    }
  },

  // Weight Tracker
  weightTracker: {
    title: "Weight",
    starting: "First Weight",
    goal: "Target",
    updateWeight: "Update Weight",
    enterWeight: "Put your weight (kg)",
    save: "Save am",
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
      week: 'Dis Week',
      month: 'Dis Month'
    },
    stats: {
      activeMinutes: {
        title: 'Active Minutes',
        value: '{minutes}',
        info: 'E dey count how many minutes you do exercise. Try do at least 30 minutes every day.'
      },
      caloriesBurned: {
        title: 'Calories Wey You Burn',
        value: '{calories}',
        info: 'E dey show how many calories you burn for exercise. Wetin you need fit change.'
      },
      fastingHours: {
        title: 'Fasting Hours',
        value: '{hours}',
        info: 'E dey check how many hours you dey fast. Normal target na 16 hours.'
      },
      waterIntake: {
        title: 'Water Wey You Don Drink',
        value: '{amount}/{goal}L',
        info: 'E dey check how much water you drink for one day. Beta make you drink at least 2L water every day.'
      }
    },
    workoutDuration: {
      title: '{duration} mins',
      subtitle: 'How Long You Exercise',
      info: 'How long you do exercise. Try do 30-60 minutes.'
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

  // BMI
  bmi: {
    title: "BMI (kg/m²)",
    description: "Body Mass Index (BMI) na simple way wey dem dey take check if your weight correct for your height.",
    status: {
      underweight: "Weight no reach",
      normal: "Normal weight",
      overweight: "Weight pass",
      obese: "Weight pass too much"
    },
    ranges: {
      underweight: "Weight no reach: less than 18.5",
      normal: "Normal weight: 18.5 to 24.9",
      overweight: "Weight pass: 25 to 29.9",
      obese: "Weight pass too much: 30 or more"
    },
    recommendation: "For your height of {{height}}cm, better weight suppose dey between {{minWeight}}kg and {{maxWeight}}kg"
  },
};