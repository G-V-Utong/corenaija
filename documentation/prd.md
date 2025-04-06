# 💪 CoreNaija - Product Requirements Document (PRD)

---

## 📱 App Overview

**App Name**: *CoreNaija*

**Description**:  
CoreNaija is a mobile-first fitness application tailored to the Nigerian lifestyle. It provides locally-relevant, AI-personalized fitness plans, micro-payment flexibility, gamified challenges, offline video access, and real-world rewards (airtime, data, merchandise). It blends cultural relevancy, affordability, and community-driven motivation to foster long-term fitness habits.

**Target Audience**:
- Nigerians aged 16–45
- Beginners to intermediate fitness enthusiasts
- People with limited access to gyms or personal trainers
- Users with budget-conscious spending behavior

**Goals**:
- Promote fitness with minimal barriers to entry
- Leverage micro-payments and mobile money culture
- Offer AI-enhanced, hyper-personalized experiences
- Create a sticky, gamified ecosystem with social proof

---

## 🧭 User Flow

### 1. **Onboarding**
- Launch app → Welcome screen → Skip/Login/Signup
- Choose goals (e.g., weight loss, muscle gain, stamina)
- Fill optional info (height, weight, diet preference, fitness level)
- Preview recommended plan → Begin with Free Tier

### 2. **Home Dashboard**
- Daily Workout Card (video + steps)
- Quick Access: [Workout] [AI Meal Plan] [Progress]
- Daily Streak Tracker + Rewards Counter
- Motivational Quote / Lottie Animation

### 3. **Workout Session**
- Tap workout → Animation + audio guide
- Timer + reps → Track progress
- End screen → Earn rewards, rate session

### 4. **AI Meal Plan**
- Generate 3-meal suggestions based on local Nigerian dishes
- Allow refresh / save / share

### 5. **Pricing / Subscription**
- Navigate to "Upgrade" → View tiers
- Choose: Daily/Weekly/Monthly
- Pay with Paystack (Card/USSD/Transfer)
- Post-payment → Unlock premium features

### 6. **Social & Challenges**
- Join or Create a Challenge
- Compete with friends / community
- Earn points, climb leaderboard

### 7. **Profile & Settings**
- Track: Progress, weight, completed workouts
- Manage plan, payment method, dark mode

---

## 🧱 Tech Stack & APIs

### 🔧 Frontend (Mobile)
- **React Native (Expo)**: Core framework
- **NativeWind**: Tailwind for styling
- **Moti + Reanimated + Gesture Handler**: For fluid animations
- **React Navigation + Shared Element**: Screen transitions

### 🔙 Backend
- **Supabase**:
  - Postgres database
  - Auth (email, OTP)
  - Row-level security (RLS)
  - Storage for images/videos
  - Realtime & edge functions

### 🧠 AI APIs
- **Meal Recommendation API** (custom LLM or fine-tuned model)
- **Workout Plan Generator API** (fitness GPT integration)
- **Pose Detection (Future)**: ML Kit / Mediapipe

### 💳 Payments
- **Paystack**:
  - One-time and recurring payments
  - Subscriptions & micropayments
  - Webhooks for plan unlocking

### 📦 DevOps & Monitoring
- **Expo EAS Build** for CI/CD
- **Sentry** or **LogRocket** for crash/error tracking
- **Firebase Analytics** for usage data

---

## 🔑 Core Features

### 🎯 Personalized Workouts
- AI-generated based on goals, BMI, and level
- Includes rest day logic, stretch routines

### 🍽️ AI Meal Plans
- Nigerian-specific dish suggestions
- Diet-style toggle: regular / vegetarian / high-protein

### 💰 Micro-Payment Subscriptions
- Pay-as-you-go: ₦50/day, ₦300/week, ₦1000/month
- Integrated with Paystack’s recurring payments

### 🏆 Gamified Challenges
- Create or join challenges
- Daily streaks, rewards, leaderboards
- Win airtime or unlock content

### 🏅 Reward System
- Earn points for workout completion, referrals
- Points redeemable for content or mobile data/airtime

### 🧘 Offline Support
- Downloadable workout videos
- Cached tips and animations

### 📊 Progress Tracker
- Charts: Weight, reps, streaks, calories
- Goal visualizer with motivational messages

### 🌙 Dark Mode & Accessibility
- System theme adaptation
- Scalable fonts, voiceover support

---

## ✅ In-Scope Features

| Feature                               | Status   |
|---------------------------------------|----------|
| Personalized workout & meal plans     | ✅ Yes   |
| AI-assisted goal setting              | ✅ Yes   |
| Offline workouts                      | ✅ Yes   |
| Paystack integration                  | ✅ Yes   |
| Reward system (airtime, data)         | ✅ Yes   |
| Challenge system + leaderboard        | ✅ Yes   |
| Lottie animations & guided UI         | ✅ Yes   |
| Profile progress analytics            | ✅ Yes   |
| Tailored for Nigerian dishes & slang  | ✅ Yes   |

---

## ❌ Out-of-Scope (MVP Phase)

| Feature                               | Reason                         |
|---------------------------------------|--------------------------------|
| 3rd-party gym integrations            | Low user value at MVP          |
| AI-based pose correction              | Too complex for MVP            |
| Video call with personal trainers     | Requires heavy infra           |
| Advanced body tracking (camera ML)    | Needs future iteration         |
| Full web version                      | Focused mobile-first launch    |
| Wearable device integration           | Not core to target audience    |
| In-app chat or DMs                    | Moderation overhead            |

---

> This PRD serves as the North Star for development, design, and business planning. Updates to this document should follow user feedback and post-MVP growth phases.
