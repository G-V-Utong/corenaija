 # 🔧 CoreNaija - Backend Structure Document

This document outlines the backend architecture for the **CoreNaija** application, detailing the structure for **database setup**, **authentication**, **storage**, and overall backend service configuration. It ensures that all backend components are set up correctly, facilitating smooth communication between the frontend and backend, while ensuring scalability and maintainability.

---

## 🔐 Authentication and Authorization

### **Supabase Authentication**
Supabase offers built-in user authentication, making it easy to handle sign-ups, log-ins, and authorization with minimal effort.

#### **Steps to Set Up Authentication**:
1. **Create a Supabase Project**:
   - Go to [Supabase Dashboard](https://app.supabase.io/), create a new project, and configure your database.
   - Choose PostgreSQL as the database provider.

2. **Enable Authentication**:
   - Go to the **Authentication** section on the Supabase dashboard.
   - Enable **Email/Password Auth** and any other providers (Google, Facebook, etc.) that you want to use.

3. **Add Authentication API Endpoints**:
   - Use the Supabase client to call authentication endpoints in the frontend:
     ```javascript
     // Sign Up
     const { user, error } = await supabase.auth.signUp({
       email: 'user@example.com',
       password: 'yourpassword',
     });

     // Sign In
     const { user, error } = await supabase.auth.signIn({
       email: 'user@example.com',
       password: 'yourpassword',
     });

     // Sign Out
     const { error } = await supabase.auth.signOut();
     ```

4. **Role-based Access Control (RBAC)**:
   - Use Supabase’s built-in policies to control access to sensitive data. Set up row-level security (RLS) for each table to ensure that users only have access to their own data.
   - Example policy for user data:
     ```sql
     CREATE POLICY "Users can access their own data"
     ON users
     FOR SELECT
     USING (auth.uid() = user_id);
     ```

5. **Password Recovery & Email Verification**:
   - Supabase handles email verification and password reset automatically. Ensure that email templates are set up correctly under the **Authentication Settings** section in Supabase.

---

## 🗄️ Database Structure

### **PostgreSQL Schema Design**
The database should be structured in a way that supports all of CoreNaija’s features, including workout tracking, meal planning, user profiles, etc.

#### **Tables & Relationships**:

1. **Users Table**:
   - Stores user information, including authentication data.
   - Automatically created by Supabase when authentication is enabled.
   - Columns: `id (UUID)`, `email (TEXT)`, `password (TEXT)`, `created_at (TIMESTAMP)`, `updated_at (TIMESTAMP)`, `role (TEXT)`.

2. **Profiles Table**:
   - Stores user-specific data like fitness goals, progress, and preferences.
   - Columns: `id (UUID)`, `user_id (UUID)` (foreign key to Users table), `first_name (TEXT)`, `last_name (TEXT)`, `date_of_birth (DATE)`, `height (FLOAT)`, `weight (FLOAT)`, `goal (TEXT)`, `created_at (TIMESTAMP)`, `updated_at (TIMESTAMP)`.

3. **Workouts Table**:
   - Stores details of user workouts.
   - Columns: `id (UUID)`, `user_id (UUID)` (foreign key to Users table), `workout_type (TEXT)`, `duration (INTEGER)`, `calories_burned (FLOAT)`, `created_at (TIMESTAMP)`, `updated_at (TIMESTAMP)`.

4. **Meals Table**:
   - Stores data about the meals consumed by the user.
   - Columns: `id (UUID)`, `user_id (UUID)` (foreign key to Users table), `meal_name (TEXT)`, `calories (FLOAT)`, `created_at (TIMESTAMP)`, `updated_at (TIMESTAMP)`.

5. **Progress Table**:
   - Tracks fitness progress (e.g., weight loss, muscle gain).
   - Columns: `id (UUID)`, `user_id (UUID)` (foreign key to Users table), `weight (FLOAT)`, `body_fat_percentage (FLOAT)`, `muscle_mass (FLOAT)`, `created_at (TIMESTAMP)`.

6. **Payments Table**:
   - Tracks payment transactions for premium services or credits.
   - Columns: `id (UUID)`, `user_id (UUID)` (foreign key to Users table), `amount (FLOAT)`, `payment_status (TEXT)`, `created_at (TIMESTAMP)`.

#### **SQL Example to Create a Table**:
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  height FLOAT NOT NULL,
  weight FLOAT NOT NULL,
  goal TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
