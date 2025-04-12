-- Add muscle_group_focus column to profiles table
ALTER TABLE profiles
ADD COLUMN muscle_group_focus TEXT;

-- Add comment to explain the column
COMMENT ON COLUMN profiles.muscle_group_focus IS 'The primary muscle group the user wants to focus on (balanced, chest, back, arms, legs, abs, glutes)'; 