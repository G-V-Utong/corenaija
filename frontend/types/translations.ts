export interface Translations {
  common: {
    loading: string;
    error: string;
    success: string;
    cancel: string;
    save: string;
    delete: string;
    update: string;
    confirm: string;
    next: string;
    back: string;
    skip: string;
    getStarted: string;
    ok: string;
  };
  auth: {
    signIn: {
      title: string;
      emailLabel: string;
      emailPlaceholder: {
        male: string;
        female: string;
      };
      passwordLabel: string;
      passwordPlaceholder: {
        male: string;
        female: string;
      };
      forgotPassword: string;
      noAccount: {
        male: string;
        female: string;
      };
      signUp: string;
      signInButton: string;
    };
    signUp: {
      title: string;
      fullNameLabel: string;
      fullNamePlaceholder: {
        male: string;
        female: string;
      };
      emailLabel: string;
      emailPlaceholder: {
        male: string;
        female: string;
      };
      passwordLabel: string;
      passwordPlaceholder: {
        male: string;
        female: string;
      };
      confirmPasswordLabel: string;
      confirmPasswordPlaceholder: {
        male: string;
        female: string;
      };
      signUpButton: string;
      hasAccount: {
        male: string;
        female: string;
      };
      signIn: string;
    };
    forgotPassword: {
      title: string;
      description: {
        male: string;
        female: string;
      };
      emailLabel: string;
      emailPlaceholder: {
        male: string;
        female: string;
      };
      sendButton: string;
      backToSignIn: string;
    };
    resetPassword: {
      title: string;
      newPasswordLabel: string;
      newPasswordPlaceholder: {
        male: string;
        female: string;
      };
      confirmPasswordLabel: string;
      confirmPasswordPlaceholder: {
        male: string;
        female: string;
      };
      resetButton: string;
    };
  };
  tabs: {
    training: string;
    nutrition: string;
    fasting: string;
    profile: string;
  };
  sidebar: {
    viewProfile: string;
    stats: {
      kilometers: string;
      rides: string;
    };
    menu: {
      coach: string;
      trainingHistory: string;
      nutrition: string;
      help: string;
      about: string;
      settings: string;
    };
  };
  training: {
    title: string;
    startWorkout: string;
    noWorkouts: string;
  };
  nutrition: {
    title: string;
    trackMeal: string;
    noMeals: string;
  };
  fasting: {
    title: string;
    startFast: string;
    endFast: string;
    noFasts: string;
  };
  profile: {
    title: string;
    editProfile: string;
    myProgress: string;
    achievements: string;
  };
  onboarding: {
    getStarted: {
      title: string;
      description: string;
      startButton: string;
    };
  };
  calendar: {
    weekDays: {
      sunday: string;
      monday: string;
      tuesday: string;
      wednesday: string;
      thursday: string;
      friday: string;
      saturday: string;
    };
    months: {
      january: string;
      february: string;
      march: string;
      april: string;
      may: string;
      june: string;
      july: string;
      august: string;
      september: string;
      october: string;
      november: string;
      december: string;
    };
    selectYear: string;
    activities: string;
    history: string;
    bodyInformation: string;
    add: string;
  };
  waterTracker: {
    title: string;
    description: {
      male: string;
      female: string;
    };
    waterDrunk: string;
    goal: string;
    dailyGoal: {
      title: string;
      value: string;
    };
    servingSize: {
      title: string;
      value: string;
    };
    reminders: {
      title: string;
      interval: string;
      hourFormat: string;
    };
    notifications: {
      title: string;
      body: {
        male: string;
        female: string;
      };
    };
  };
  activitySummary: {
    title: string;
    timeframes: {
      today: string;
      week: string;
      month: string;
    };
    stats: {
      activeMinutes: {
        title: string;
        value: string;
        info: string;
      };
      caloriesBurned: {
        title: string;
        value: string;
        info: string;
      };
      fastingHours: {
        title: string;
        value: string;
        info: string;
      };
      waterIntake: {
        title: string;
        value: string;
        info: string;
      };
    };
    workoutDuration: {
      title: string;
      subtitle: string;
      info: string;
    };
    weekDays: {
      mon: string;
      tue: string;
      wed: string;
      thu: string;
      fri: string;
      sat: string;
      sun: string;
    };
  };
  settings: {
    title: string;
    theme: {
      label: string;
      light: string;
      dark: string;
      system: string;
      modalTitle: string;
    };
    account: {
      label: string;
      value: string;
      modalTitle: string;
      changeEmail: string;
      changePassword: string;
      currentEmail: string;
      newEmail: string;
      enterNewEmail: string;
      currentPassword: string;
      enterCurrentPassword: string;
      newPassword: string;
      enterNewPassword: string;
      confirmPassword: string;
      confirmNewPassword: string;
      passwordsDontMatch: string;
      emailUpdated: string;
      passwordUpdated: string;
    };
    notifications: {
      label: string;
      value: string;
    };
    language: {
      label: string;
      modalTitle: string;
      selectLanguage: string;
    };
    deleteAccount: {
      label: string;
      modalTitle: string;
      warning: string;
      question: string;
      deleting: string;
    };
    logout: {
      label: string;
    };
  };
  validation: {
    required: string;
    invalidEmail: string;
    passwordLength: string;
    passwordsDontMatch: string;
  };
  errors: {
    default: string;
    updateFailed: string;
    deleteFailed: string;
    signInFailed: string;
    signUpFailed: string;
    resetPasswordFailed: string;
    networkError: string;
  };
  bmi: {
    title: string;
    description: string;
    ranges: {
      underweight: string;
      normal: string;
      overweight: string;
      obese: string;
    };
    recommendation: string;
  };
}