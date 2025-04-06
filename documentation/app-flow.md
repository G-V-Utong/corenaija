# 📲 App Flow Document: CoreNaija

The user opens the app and lands on the **Splash Screen**, which displays the CoreNaija logo with a smooth animated transition. After a few seconds, the user is automatically directed to the **Onboarding Screen** if they are a new user, or to the **Login Screen** if they have used the app before.

## Onboarding Flow (First-time users only)

The **Onboarding Screen** contains a short 3-step walkthrough. The user swipes through screens that explain the app's value, such as "Personalized Fitness", "Nigerian Meal Plans", and "Earn Rewards for Working Out". At the end of the walkthrough, the user taps “Get Started”, which takes them to the **Account Setup Screen**.

On the **Account Setup Screen**, the user chooses to either **Sign up with email**, **Sign up with phone (OTP)**, or **Continue with Google**. After successful registration, the user proceeds to the **Fitness Goal Setup Screen**.

On the **Fitness Goal Setup Screen**, the user selects one of the predefined goals: Lose Weight, Build Muscle, Improve Stamina, or Maintain Health. Then the user enters their age, gender, height, weight, fitness level, and dietary preference. After submitting, the AI generates a starter workout and a meal plan suggestion, and the user is directed to the **Home Screen**.

---

## Authenticated App Flow (Post-Onboarding or Returning Users)

From the **Login Screen**, returning users log in using phone number, email, or Google. After successful login, they are redirected to the **Home Screen**.

---

## Home Screen

The **Home Screen** is the central hub of the app. It displays a daily workout card, a quick AI meal suggestion, progress tracking, and access to rewards. Users can scroll vertically through motivational quotes, quick tips, and featured challenges. A bottom tab bar allows navigation to 4 main sections: Home, Workouts, Challenges, and Profile.

- Tapping the workout card opens the **Workout Player Screen**  
- Tapping the meal suggestion opens the **Meal Plan Screen**  
- Tapping the reward tracker opens the **Rewards Summary Screen**

---

## Workout Player Screen

This screen shows the name of the workout, duration, and the target muscle group. The user can play the workout as an animated or video-guided session with audio cues and a timer. The user can pause, skip, or restart exercises. Once completed, the screen shows a success screen with earned points and a "Rate This Workout" option. After rating, the user is taken back to the **Home Screen**.

---

## Meal Plan Screen

This screen shows 3 personalized meal suggestions for the day based on local Nigerian cuisine. Each meal has a photo, nutritional breakdown, and an "I Ate This" button. The user can also tap "Refresh" to regenerate meals using AI. A "Save Meal" button allows them to add it to their favorites. After interaction, the user can navigate back to **Home** using the bottom tab bar.

---

## Challenges Screen

The **Challenges Screen** shows trending fitness challenges in grid view. The user can tap any challenge card to view its details, rules, and rewards. From here, the user can tap “Join Challenge” to participate. The screen also has a tab to "Create a Challenge" where users set a name, target goal (e.g., 30 pushups daily), duration, and invite friends. Active challenges display progress bars. On completion, the user earns points and is prompted to share their badge. Navigation continues via the bottom tab bar.

---

## Rewards Summary Screen

This screen shows a breakdown of total points earned, daily streaks, unlocked badges, and available airtime/data rewards. The user can tap “Redeem Points” to access a modal where they choose what to exchange points for. After redeeming, they see a success message and can tap "Back to Home".

---

## Profile Screen

On the **Profile Screen**, the user sees their name, avatar, and stats like current weight, total workouts, and completed challenges. From here, users can tap:

- **My Plan** to view their fitness plan and update preferences  
- **Subscriptions** to view current plan and upgrade via Paystack  
- **Settings** to toggle dark mode, change language, or enable notifications  
- **Progress Tracker** to see charts for weight, reps, calories, and streaks  
- **Invite Friends** to share referral code via WhatsApp, SMS, etc.  
- **Logout** to sign out of the app  

Each page under Profile uses simple modals or full pages, and the bottom tab bar remains visible for easy return to **Home**.

---

## Subscription Flow

From the **Profile** or a “Locked Content” prompt, the user is directed to the **Subscription Screen**. Here, they view three plans: Daily (₦50), Weekly (₦300), and Monthly (₦1000). Tapping a plan opens the **Paystack Payment Modal**. On successful payment, the user sees a confirmation message and is redirected to the previous locked content.

If payment fails, an error message is shown with retry and support contact options.

---

## Error & Empty States

If the user has no internet, an **Offline Screen** appears with a Lottie animation and a message: "You’re offline. Viewing saved workouts." Offline workout content is cached and accessible.

If AI meal plan or workouts fail to load, an empty state is shown with a "Retry" button and fallback suggestions.

---

## Exit Flow

On Android, pressing the back button from **Home** triggers a confirmation modal: “Do you want to exit CoreNaija?” with Yes/No options.

---

This flow describes how a user navigates from entry to every screen in the CoreNaija app, ensuring there are no dead-ends, broken states, or missing transitions.

---
