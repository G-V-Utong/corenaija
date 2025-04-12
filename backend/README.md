# Supabase Setup Instructions

This directory contains SQL scripts and configuration files for setting up the Supabase backend for the ReformBodi app.

## Setting Up the Profiles Table

The app uses a Supabase profiles table to store additional user information that isn't available in the default auth.users table. This includes:

- Full name
- Phone number
- Age
- Fitness goals
- Height
- Weight
- Avatar URL

### Steps to Set Up the Profiles Table

1. Log in to your Supabase dashboard at https://app.supabase.io
2. Select your project
3. Go to the SQL Editor
4. Create a new query
5. Copy and paste the contents of `supabase/profiles_table.sql` into the editor
6. Run the query

This will:
- Create a profiles table linked to the auth.users table
- Set up Row Level Security (RLS) policies to ensure users can only access their own data
- Create a trigger to automatically create a profile entry when a new user signs up
- Create an index for faster lookups

### How It Works

- When a user signs up, a record is automatically created in the profiles table
- The profiles table is linked to the auth.users table via the user's ID
- The app fetches the user's profile information when they sign in
- The user's profile information is available throughout the app via the AuthContext

## Environment Variables

Make sure your `.env` file contains the following variables:

```
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

These variables are used to connect to your Supabase project.
