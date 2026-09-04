import type { Genre, MoodTag, AspectCategory, SentimentPolarity } from '../constants/index.js';

export interface CastMember {
  name: string;
  character?: string;
  order?: number;
  profilePath?: string;
}

export interface DirectorInfo {
  name: string;
  profilePath?: string;
}

export interface Movie {
  _id: string;
  externalId?: number;
  title: string;
  originalTitle?: string;
  overview: string;
  genres: (Genre | string)[];
  language: string;
  releaseDate: string;
  releaseYear?: number;
  runtime: number; // in minutes
  rating: number; // 0 to 10
  voteCount: number;
  popularity: number;
  poster: string;
  backdrop?: string;
  cast: CastMember[];
  directors: DirectorInfo[];
  keywords: string[];
  countries?: string[];
  ageRating?: string;
  moodTags: (MoodTag | string)[];
  themes: string[];
  embedding?: number[];
  createdAt?: string;
  updatedAt?: string;
}

export interface MovieSummary {
  _id: string;
  title: string;
  releaseYear: number;
  poster: string;
  backdrop?: string;
  rating: number;
  runtime: number;
  genres: string[];
  language: string;
  moodTags?: string[];
}

export interface UserPreferences {
  preferredGenres: string[];
  preferredLanguages: string[];
  favoriteActors: string[];
  favoriteDirectors: string[];
  dislikedGenres: string[];
  preferredRuntime?: 'SHORT' | 'MEDIUM' | 'LONG' | 'ANY';
  moodPreferences?: string[];
}

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences: UserPreferences;
  onboardingCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  onboardingCompleted: boolean;
  token?: string;
}

export interface WatchlistItem {
  _id: string;
  userId: string;
  movie: Movie;
  createdAt: string;
}

export interface WatchHistoryItem {
  _id: string;
  userId: string;
  movie: Movie;
  watchedAt: string;
  completionStatus: 'COMPLETED' | 'PARTIAL' | 'ABANDONED';
  source: 'MANUAL' | 'RECOMMENDATION' | 'AI_DISCOVER';
}

export interface RatingItem {
  _id: string;
  userId: string;
  movieId: string;
  rating: number; // 1 - 10
  createdAt: string;
  updatedAt: string;
}

export interface AspectSentiment {
  aspect: AspectCategory;
  sentiment: SentimentPolarity;
  score: number; // -1 to 1
  snippets?: string[];
}

export interface ReviewItem {
  _id: string;
  userId: string;
  userName?: string;
  userAvatar?: string;
  movieId: string;
  text: string;
  rating: number;
  sentiment: SentimentPolarity;
  sentimentScore: number; // -1 to 1
  aspects: AspectSentiment[];
  createdAt: string;
  updatedAt: string;
}

export interface RecommendationExplanation {
  primaryReason: string;
  secondaryReasons: string[];
  matchedSignals: {
    genres?: string[];
    moods?: string[];
    actors?: string[];
    directors?: string[];
    runtimeFit?: boolean;
    historyReferenceMovie?: string;
  };
}

export interface RecommendationItem {
  movie: Movie;
  score: number; // 0 to 100
  explanation: RecommendationExplanation;
  matchType?: 'PERFECT' | 'GREAT' | 'GOOD' | 'ALTERNATIVE';
}

export interface ExtractedPreferences {
  genres: string[];
  moods: string[];
  languages: string[];
  runtime?: {
    min?: number;
    max?: number;
  };
  intensity?: 'low' | 'medium' | 'high';
  themes: string[];
  dislikedGenres: string[];
  actors?: string[];
  directors?: string[];
  occasion?: string;
  familyFriendly?: boolean;
  confidenceScore?: number;
}

export interface AIDiscoverRequest {
  query: string;
  filters?: {
    languages?: string[];
    runtimeMax?: number;
    preferredGenres?: string[];
  };
}

export interface AIDiscoverResponse {
  query: string;
  extractedPreferences: ExtractedPreferences;
  recommendations: RecommendationItem[];
  naturalSummary: string;
}

export interface CitationItem {
  movieId: string;
  movieTitle: string;
  releaseYear?: number;
  factSnippet: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  citations?: CitationItem[];
  suggestedMovies?: MovieSummary[];
}

export interface AIConversationSession {
  _id: string;
  userId?: string;
  messages: ChatMessage[];
  extractedPreferences?: ExtractedPreferences;
  recommendedMovies?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface GroupParticipant {
  userId?: string;
  name: string;
  preferredGenres: string[];
  dislikedGenres: string[];
  preferredLanguages?: string[];
  preferredMoods?: string[];
}

export interface GroupSession {
  _id: string;
  sessionCode: string;
  hostUserId: string;
  title: string;
  participants: GroupParticipant[];
  status: 'OPEN' | 'VOTING' | 'DECIDED';
  candidateMovies: MovieSummary[];
  rankedResults: {
    movie: MovieSummary;
    consensusScore: number;
    groupCompatibility: number; // percentage 0-100
    participantBreakdown: {
      name: string;
      compatibility: number;
      pros: string[];
      cons: string[];
    }[];
    groupVerdict: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface RecommendationEventLog {
  userId?: string;
  movieId: string;
  source: 'HOME_TRENDING' | 'PERSONALIZED' | 'AI_DISCOVER' | 'SEMANTIC_SEARCH' | 'GROUP_SESSION' | 'BECAUSE_YOU_WATCHED';
  action: 'IMPRESSION' | 'CLICK' | 'WATCHLIST' | 'WATCH' | 'DISMISS';
  score?: number;
  reason?: string;
  createdAt?: string;
}

export interface AnalyticsDashboardData {
  totalImpressions: number;
  totalClicks: number;
  clickThroughRate: number;
  totalWatchlistAdds: number;
  totalWatches: number;
  conversionRate: number;
  topGenres: { genre: string; count: number }[];
  recommendationSourcePerformance: { source: string; impressions: number; clicks: number; ctr: number }[];
  dailyInteractions: { date: string; impressions: number; clicks: number; watchlistAdds: number }[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
