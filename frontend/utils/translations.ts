import { UserProfile } from '../types/auth.types';

type GenderedText = {
  male: string;
  female: string;
};

export const getGenderedText = (text: string | GenderedText, user?: UserProfile | null): string => {
  // If text is not gendered, return as is
  if (typeof text === 'string') {
    return text;
  }

  // If no user or no gender specified, default to male form
  if (!user?.gender || !['male', 'female'].includes(user.gender.toLowerCase())) {
    return text.male;
  }

  // Return gender-specific text based on user's gender (converting to lowercase to match our keys)
  return text[user.gender.toLowerCase() as keyof GenderedText];
};
