export const GENRES = [
  'Action',
  'Adventure',
  'Animation',
  'Comedy',
  'Crime',
  'Documentary',
  'Drama',
  'Family',
  'Fantasy',
  'History',
  'Horror',
  'Music',
  'Mystery',
  'Romance',
  'Science Fiction',
  'Thriller',
  'War',
  'Western',
] as const;

export type Genre = (typeof GENRES)[number];

export const MOOD_TAGS = [
  'Happy',
  'Sad',
  'Romantic',
  'Excited',
  'Relaxed',
  'Motivated',
  'Nostalgic',
  'Scared',
  'Thought-provoking',
  'Emotional',
  'Dark',
  'Suspenseful',
  'Mind-bending',
  'Wholesome',
  'Inspiring',
  'Funny',
] as const;

export type MoodTag = (typeof MOOD_TAGS)[number];

export const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ta', name: 'Tamil' },
  { code: 'te', name: 'Telugu' },
  { code: 'ml', name: 'Malayalam' },
] as const;

export const RUNTIME_BRACKETS = {
  SHORT: { label: 'Short (<90 min)', max: 90 },
  MEDIUM: { label: 'Standard (90-120 min)', min: 90, max: 120 },
  LONG: { label: 'Epic (>120 min)', min: 120 },
  ANY: { label: 'Any runtime' },
} as const;

export const OCCASIONS = [
  'Solo Watch',
  'Date Night',
  'Family Movie Night',
  'Friends Hangout',
  'Late Night Chill',
  'Study / Background',
] as const;

export const ASPECT_CATEGORIES = [
  'story',
  'acting',
  'direction',
  'cinematography',
  'music',
  'pacing',
  'ending',
  'visualEffects',
] as const;

export type AspectCategory = (typeof ASPECT_CATEGORIES)[number];

export const SENTIMENT_POLARITY = ['positive', 'negative', 'neutral', 'mixed'] as const;
export type SentimentPolarity = (typeof SENTIMENT_POLARITY)[number];

export const DEFAULT_REC_WEIGHTS = {
  genreMatch: 0.20,
  languageMatch: 0.10,
  ratingScore: 0.10,
  popularityScore: 0.05,
  runtimeMatch: 0.10,
  actorMatch: 0.10,
  directorMatch: 0.10,
  historySimilarity: 0.10,
  watchlistSimilarity: 0.05,
  moodMatch: 0.10,
};
