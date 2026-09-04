import { z } from 'zod';

export const RegisterSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password is too long'),
});
export type RegisterInput = z.infer<typeof RegisterSchema>;

export const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});
export type LoginInput = z.infer<typeof LoginSchema>;

export const UserPreferencesSchema = z.object({
  preferredGenres: z.array(z.string()).default([]),
  preferredLanguages: z.array(z.string()).default([]),
  favoriteActors: z.array(z.string()).default([]),
  favoriteDirectors: z.array(z.string()).default([]),
  dislikedGenres: z.array(z.string()).default([]),
  preferredRuntime: z.enum(['SHORT', 'MEDIUM', 'LONG', 'ANY']).optional(),
  moodPreferences: z.array(z.string()).optional().default([]),
});
export type UserPreferencesInput = z.infer<typeof UserPreferencesSchema>;

export const OnboardingSchema = z.object({
  preferences: UserPreferencesSchema,
});

export const RatingSchema = z.object({
  rating: z.number().min(1).max(10),
});
export type RatingInput = z.infer<typeof RatingSchema>;

export const ReviewSchema = z.object({
  text: z.string().min(5, 'Review must be at least 5 characters').max(2000),
  rating: z.number().min(1).max(10),
});
export type ReviewInput = z.infer<typeof ReviewSchema>;

export const AIDiscoverSchema = z.object({
  query: z.string().min(3, 'Query must be at least 3 characters').max(500),
  filters: z
    .object({
      languages: z.array(z.string()).optional(),
      runtimeMax: z.number().positive().optional(),
      preferredGenres: z.array(z.string()).optional(),
    })
    .optional(),
});
export type AIDiscoverInput = z.infer<typeof AIDiscoverSchema>;

export const ChatMessageSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty').max(1000),
  conversationId: z.string().optional(),
});
export type ChatMessageInput = z.infer<typeof ChatMessageSchema>;

export const GroupCreateSchema = z.object({
  title: z.string().min(3).max(100).default('Movie Night'),
  hostName: z.string().min(1).max(50),
  preferredGenres: z.array(z.string()).default([]),
  dislikedGenres: z.array(z.string()).default([]),
  preferredLanguages: z.array(z.string()).default([]),
  preferredMoods: z.array(z.string()).default([]),
});
export type GroupCreateInput = z.infer<typeof GroupCreateSchema>;

export const GroupJoinSchema = z.object({
  name: z.string().min(1).max(50),
  preferredGenres: z.array(z.string()).default([]),
  dislikedGenres: z.array(z.string()).default([]),
  preferredLanguages: z.array(z.string()).default([]),
  preferredMoods: z.array(z.string()).default([]),
});
export type GroupJoinInput = z.infer<typeof GroupJoinSchema>;

export const PaginationQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(50).default(20),
});

export const MovieSearchQuerySchema = PaginationQuerySchema.extend({
  q: z.string().optional(),
  genre: z.string().optional(),
  language: z.string().optional(),
  mood: z.string().optional(),
  minRating: z.coerce.number().min(0).max(10).optional(),
  maxRuntime: z.coerce.number().positive().optional(),
  sort: z.enum(['popularity', 'rating', 'releaseDate', 'title']).default('popularity'),
  order: z.enum(['asc', 'desc']).default('desc'),
});
export type MovieSearchQuery = z.infer<typeof MovieSearchQuerySchema>;
