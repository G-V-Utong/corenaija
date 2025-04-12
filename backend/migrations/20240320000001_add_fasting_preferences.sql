-- Add fasting-related columns to profiles table
ALTER TABLE profiles
ADD COLUMN fasting_status TEXT NOT NULL DEFAULT 'none',
ADD COLUMN preferred_fasting_protocol TEXT,
ADD COLUMN fasting_reason TEXT,
ADD COLUMN fasting_experience TEXT;

-- Add comments to explain the columns
COMMENT ON COLUMN profiles.fasting_status IS 'Current fasting practice (none, intermittent, extended, time_restricted, religious)';
COMMENT ON COLUMN profiles.preferred_fasting_protocol IS 'Preferred fasting schedule (16_8, 18_6, 20_4, 5_2, custom)';
COMMENT ON COLUMN profiles.fasting_reason IS 'Primary reason for fasting (weight_loss, metabolic_health, insulin_sensitivity, mental_clarity, longevity)';
COMMENT ON COLUMN profiles.fasting_experience IS 'Experience level with fasting (beginner, intermediate, advanced)'; 