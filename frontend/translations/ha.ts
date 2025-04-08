export const ha = {
  // Common
  common: {
    loading: 'Ana ɗauka...',
    error: 'Kuskure',
    success: 'Nasara!',
    cancel: 'Soke',
    save: 'Ajiye',
    delete: 'Share',
    update: 'Sabunta',
    confirm: 'Tabbata',
    next: 'Gaba',
    back: 'Baya',
    skip: 'Tsallake',
    getStarted: 'Fara',
  },

  // Auth Screens
  auth: {
    signIn: {
      title: 'Shiga',
      emailLabel: 'Email',
      emailPlaceholder: 'Shigar da email ɗinka',
      passwordLabel: 'Kalmar sirri',
      passwordPlaceholder: 'Shigar da kalmar sirri',
      forgotPassword: 'Manta kalmar sirri?',
      noAccount: 'Ba ka da asusu?',
      signUp: 'Yi rajista',
      signInButton: 'Shiga',
    },
    signUp: {
      title: 'Yi Rajista',
      fullNameLabel: 'Sunanka Gabaɗaya',
      fullNamePlaceholder: 'Shigar da sunanka gabaɗaya',
      emailLabel: 'Email',
      emailPlaceholder: 'Shigar da email ɗinka',
      passwordLabel: 'Kalmar sirri',
      passwordPlaceholder: 'Shigar da kalmar sirri',
      confirmPasswordLabel: 'Tabbatar da kalmar sirri',
      confirmPasswordPlaceholder: 'Tabbatar da kalmar sirri',
      signUpButton: 'Yi Rajista',
      hasAccount: 'Kana da asusu?',
      signIn: 'Shiga'
    },
    forgotPassword: {
      title: 'Manta Kalmar Sirri',
      description: 'Shigar da adireshin email ɗinka, za mu aika miki hanyar dawo da kalmar sirri.',
      emailLabel: 'Email',
      emailPlaceholder: 'Shigar da email ɗinka',
      sendButton: 'Aika Hanyar Dawo',
      backToSignIn: 'Komawa zuwa Shiga',
    },
    resetPassword: {
      title: 'Dawo da Kalmar Sirri',
      newPasswordLabel: 'Sabuwar Kalmar Sirri',
      newPasswordPlaceholder: 'Shigar da sabuwar kalmar sirri',
      confirmPasswordLabel: 'Tabbatar da Kalmar Sirri',
      confirmPasswordPlaceholder: 'Tabbatar da sabuwar kalmar sirri',
      resetButton: 'Dawo da Kalmar Sirri',
    },
  },

  // Tab Navigation
  tabs: {
    training: 'Horarwa',
    nutrition: 'Abinci',
    fasting: 'Azumi',
    profile: 'Bayanan Kai',
  },

  // Sidebar Menu
  sidebar: {
    viewProfile: 'Duba bayanan kai',
    stats: {
      kilometers: 'Kilomita',
      rides: 'Tafiya'
    },
    menu: {
      coach: 'Koci',
      trainingHistory: 'Tarihin Horarwa',
      nutrition: 'Abinci',
      help: 'Taimako',
      about: 'Game da Mu',
      settings: 'Saituna'
    }
  },

  // Training Screen
  training: {
    title: 'Horarwa',
    startWorkout: 'Fara Aiki',
    noWorkouts: 'Babu ayyuka',
  },

  // Nutrition Screen
  nutrition: {
    title: 'Abinci',
    trackMeal: 'Bincika Abinci',
    noMeals: 'Babu abinci',
  },

  // Fasting Screen
  fasting: {
    title: 'Azumi',
    startFast: 'Fara Azumi',
    endFast: 'Kawo Ƙarshen Azumi',
    noFasts: 'Babu azumi',
  },

  // Profile Screen
  profile: {
    title: 'Bayanan Kai',
    editProfile: 'Gyara Bayanan Kai',
    myProgress: 'Ci Gabana',
    achievements: 'Nasarori',
  },

  // Onboarding
  onboarding: {
    getStarted: {
      title: 'Barka da zuwa FitCore',
      description: 'Mataimakin ku na fitness',
      startButton: 'Fara',
    },
  },

  // Settings Screen
  settings: {
    title: 'Saituna',
    theme: {
      label: 'Yanayi',
      light: 'Haskakawa',
      dark: 'Duhu',
      system: 'Tsarin',
      modalTitle: 'Zaɓi Yanayi',
    },
    account: {
      label: 'Asusu',
      value: 'Sarrafa',
      modalTitle: 'Saitunan Asusu',
      changeEmail: 'Canza Email',
      changePassword: 'Canza Kalmar Sirri',
      currentEmail: 'Email na Yanzu',
      newEmail: 'Sabuwar Email',
      enterNewEmail: 'Shigar da sabuwar email',
      currentPassword: 'Kalmar Sirri ta Yanzu',
      enterCurrentPassword: 'Shigar da kalmar sirri ta yanzu',
      newPassword: 'Sabuwar Kalmar Sirri',
      enterNewPassword: 'Shigar da sabuwar kalmar sirri',
      confirmPassword: 'Tabbatar da Kalmar Sirri',
      confirmNewPassword: 'Tabbatar da sabuwar kalmar sirri',
      passwordsDontMatch: 'Kalmar sirri biyu ba su daidaita',
      emailUpdated: 'An sabunta email da nasara',
      passwordUpdated: 'An sabunta kalmar sirri da nasara',
    },
    notifications: {
      label: 'Sanarwa',
      value: 'Kunna',
    },
    language: {
      label: 'Harshe',
      modalTitle: 'Zaɓi Harshe',
      selectLanguage: 'Zaɓi harshen da kake so'
    },
    deleteAccount: {
      label: 'Share Asusunka',
      modalTitle: 'Share Asusunka',
      warning: 'Wannan aikin ba zai iya juyewa ba. Duk bayananka za a share.',
      question: 'Ka tabbata cewa kana son share asusunka?',
      deleting: 'Ana share...',
    },
    logout: {
      label: 'Fita',
    },
  },

  // Form Validation
  validation: {
    required: 'Da fatan za a cika duk filayen da ake buƙata',
    invalidEmail: 'Da fatan za a shigar da email mai inganci',
    passwordLength: 'Kalmar sirri dole ta kasance aƙalla haruffa takwas',
    passwordsDontMatch: 'Kalmar sirri biyu ba su daidaita',
  },

  // Error Messages
  errors: {
    default: 'Akwai kuskure. Da fatan za a sake gwadawa.',
    updateFailed: 'An kasa sabuntawa',
    deleteFailed: 'An kasa sharewa',
    signInFailed: 'An kasa shiga',
    signUpFailed: 'An kasa yin rajista',
    resetPasswordFailed: 'An kasa dawo da kalmar sirri',
    networkError: 'Kuskuren hanyar sadarwa. Da fatan za a duba hanyar sadarwarka.',
  },
}; 