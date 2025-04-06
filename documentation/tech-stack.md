# 🧑‍💻 CoreNaija - Tech Stack Document

This document outlines the full technical stack used to build the CoreNaija fitness app. It includes the technologies for both front-end and back-end, as well as additional dependencies and APIs required for seamless functionality.

---

## ⚙️ Frontend (Mobile)

### 1. **React Native (Expo)**
   - **Description**: React Native is the primary framework for building the mobile app. Expo simplifies the setup process for React Native by providing easy-to-use tools and pre-configured setups for building apps quickly.
   - **Why**: It provides a unified codebase for both Android and iOS platforms and offers a fast development cycle with hot reloading.
   - **Installation**:
     ```bash
     npx expo init CoreNaija
     ```
     [React Native Docs](https://reactnative.dev/docs/getting-started)

### 2. **NativeWind**
   - **Description**: A utility-first CSS framework built on top of TailwindCSS for React Native. It offers responsive and easy-to-use design utilities.
   - **Why**: It provides a quick way to style components without writing custom CSS for each one, making the app development faster and more efficient.
   - **Installation**:
     ```bash
     npm install nativewind
     ```
     [NativeWind Docs](https://www.nativewind.dev/)

### 3. **Moti & Reanimated**
   - **Description**: Moti is built on top of React Native Reanimated for smooth and complex animations. It allows for fluid, high-performance animations and gestures.
   - **Why**: These libraries make creating custom animations easy and ensure that the app feels responsive and visually engaging.
   - **Installation**:
     ```bash
     npm install moti react-native-reanimated react-native-gesture-handler
     ```
     [Moti Docs](https://moti.fyi/)  
     [Reanimated Docs](https://docs.swmansion.com/react-native-reanimated/)

### 4. **React Navigation + Shared Element**
   - **Description**: React Navigation is the go-to library for navigation in React Native apps. The Shared Element library enables seamless page transitions with shared elements between screens.
   - **Why**: React Navigation is flexible, and Shared Element ensures smooth screen transitions and shared animations across screens.
   - **Installation**:
     ```bash
     npm install @react-navigation/native @react-navigation/stack @react-navigation/native-stack react-native-screens react-native-safe-area-context
     npm install react-navigation-shared-element
     ```
     [React Navigation Docs](https://reactnavigation.org/docs/getting-started)  
     [Shared Element Docs](https://github.com/ivanschuetz/react-navigation-shared-element)

---

## 🔙 Backend

### 1. **Supabase**
   - **Description**: Supabase is an open-source alternative to Firebase. It provides a Postgres database, real-time functionality, user authentication, file storage, and serverless functions.
   - **Why**: It is easy to integrate and maintain, offering built-in security, fast queries, and scalability. Supabase simplifies backend operations while offering powerful features.
   - **Installation**:
     ```bash
     npm install @supabase/supabase-js
     ```
     [Supabase Docs](https://supabase.com/docs)

### 2. **PostgreSQL (via Supabase)**
   - **Description**: PostgreSQL is a relational database used to store and query user data, workout records, payment history, etc.
   - **Why**: It is highly reliable, supports complex queries, and integrates seamlessly with Supabase for scalability.
   - **Database Structure**: Tables for users, workouts, subscriptions, progress tracking, rewards, and more.

### 3. **Serverless Functions (Supabase Edge Functions)**
   - **Description**: Edge functions are deployed close to users, enabling fast, low-latency API calls.
   - **Why**: Supabase Edge Functions offer real-time APIs for workout tracking, reward systems, and other personalized features.
   - **Installation**:
     ```bash
     supabase functions new
     ```

### 4. **Supabase Auth**
   - **Description**: Supabase Auth handles user authentication (sign-up/sign-in) using email/password or OTP.
   - **Why**: It provides secure authentication that is easy to implement with built-in support for social logins and OTP.
   - **Installation**:
     ```bash
     npm install @supabase/supabase-js
     ```

---

## 🧠 AI APIs

### 1. **Meal Recommendation API**
   - **Description**: This custom AI-powered API recommends meal plans based on user preferences and Nigerian food culture. It could either use a pre-built LLM model (fine-tuned) or use custom machine learning models for recipe generation.
   - **Why**: Personalized meal suggestions enhance the user experience and make the app culturally relevant.
   - **Technology**: Python, TensorFlow, PyTorch, or Hugging Face models.

### 2. **Workout Plan Generator API**
   - **Description**: This API generates personalized workout plans using AI, considering factors like fitness goals, BMI, level, and exercise preferences. It can pull from a large database of exercises, ensuring variety.
   - **Why**: Personalized workouts cater to users' individual fitness goals, which keeps them engaged and motivated.
   - **Technology**: Python, TensorFlow, or GymAPI.

### 3. **Pose Detection (Future Integration)**
   - **Description**: This feature uses pose detection models (such as Google’s Mediapipe or TensorFlow Lite) to assess workout form and give feedback.
   - **Why**: Pose detection can help users correct their form and reduce the risk of injury during workouts.
   - **Installation**:
     ```bash
     npm install @mediapipe/pose
     ```
     [Mediapipe Docs](https://google.github.io/mediapipe/)

---

## 💳 Payments

### 1. **Paystack**
   - **Description**: Paystack handles one-time and recurring payments for subscriptions. It integrates with mobile money and card payments in Nigeria.
   - **Why**: Paystack is the most reliable and popular payment gateway in Nigeria, enabling seamless transactions.
   - **Installation**:
     ```bash
     npm install paystack
     ```
     [Paystack Docs](https://paystack.com/docs)

---

## 📦 DevOps & Monitoring

### 1. **Expo EAS Build**
   - **Description**: Expo EAS (Expo Application Services) Build is used for CI/CD to automate the building and deployment of the mobile app.
   - **Why**: EAS Build helps automate app builds and deployments to both the App Store and Google Play Store.
   - **Installation**:
     ```bash
     expo install eas-cli
     ```
     [Expo EAS Docs](https://docs.expo.dev/eas/)

### 2. **Sentry / LogRocket**
   - **Description**: Sentry and LogRocket help with crash/error tracking. Sentry provides real-time error reporting, while LogRocket helps track and visualize front-end issues.
   - **Why**: They allow quick detection and resolution of bugs, ensuring a smooth user experience.
   - **Installation**:
     ```bash
     npm install @sentry/react-native
     ```
     [Sentry Docs](https://docs.sentry.io/platforms/react-native/)  
     [LogRocket Docs](https://logrocket.com/docs)

### 3. **Firebase Analytics**
   - **Description**: Firebase Analytics tracks app usage and helps optimize user experience based on real-time data.
   - **Why**: Firebase Analytics helps make data-driven decisions to improve app engagement and retention.
   - **Installation**:
     ```bash
     npm install @react-native-firebase/analytics
     ```
     [Firebase Docs](https://firebase.google.com/docs/analytics)

---

## 📈 Additional Tools

### 1. **Lottie**
   - **Description**: Lottie is used for adding animations to the app to enhance the UI/UX experience.
   - **Why**: It improves app engagement by adding visually appealing and smooth animations to various transitions and feedback.
   - **Installation**:
     ```bash
     npm install lottie-react-native
     ```
     [Lottie Docs](https://airbnb.io/lottie/)

### 2. **React Query**
   - **Description**: React Query handles data fetching, caching, and synchronization in the app.
   - **Why**: It simplifies handling API calls, reduces loading states, and automatically caches responses to optimize performance.
   - **Installation**:
     ```bash
     npm install react-query
     ```
     [React Query Docs](https://react-query.tanstack.com/)

---

## 📦 Other Dependencies

- **Axios** for HTTP requests
- **Formik** for managing forms and validations
- **Yup** for schema validation
- **React Native Paper** for UI components (like buttons, cards)
- **Redux** for state management (optional, depending on app complexity)

---

This document should serve as a comprehensive guide to all the technologies and tools used in building the CoreNaija app. Each dependency and library is selected to ensure smooth development, optimal performance, and scalability.
