# CineMatch 🎬
> **"What should I watch tonight?"** — An intelligent, research-grade movie discovery & recommendation platform.

[![Node.js](https://img.shields.io/badge/Node.js-v20+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-cyan.svg)](https://reactjs.org/)
[![Expo](https://img.shields.io/badge/Expo-51-black.svg)](https://expo.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-emerald.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-purple.svg)](LICENSE)

---

## 🌟 Highlights

- **Natural Language Discovery**: Discover movies conversationally (*"I want an emotional sci-fi movie around 2 hours, preferably Hindi"*).
- **Hybrid Recommendation Engine**: Content-based filtering (TF-IDF + Cosine similarity), personalized user signal weighting, cold-start mitigation, and diversity re-ranking (MMR).
- **Explainable AI (XAI)**: Every recommendation provides clear, grounded reasoning (*"Because you loved Interstellar and rated thought-provoking sci-fi highly"*).
- **RAG Movie Assistant**: Fact-grounded conversational agent powered by chunked movie knowledge and vector retrieval with citation links.
- **Group Movie Night**: Multi-user preference aggregation algorithm finding consensus movies that satisfy all participants while respecting vetoes.
- **Aspect-Based Review Sentiment**: Automatic extraction of sentiments across story, acting, direction, pacing, and visual effects.

---

## 🏗️ Architecture & Monorepo Structure

```text
cinematch/
├── apps/
│   ├── web/          # React 18, Vite, Tailwind CSS, TanStack Query, Recharts
│   └── mobile/       # React Native, Expo, React Navigation, TanStack Query
├── server/           # Node.js, Express, TypeScript, MongoDB, Mongoose, Zod
├── packages/
│   └── shared/       # Shared TypeScript types, Zod schemas, domain constants
├── docker-compose.yml
├── .env.example
└── package.json      # NPM Workspaces
```

---

## 🚀 Quick Start

### 1. Prerequisites
- Node.js >= 20
- MongoDB (running locally or MongoDB Atlas connection string)

### 2. Installation
```bash
# Install dependencies across all workspaces
npm install
```

### 3. Environment Setup
```bash
cp .env.example .env
# Configure MONGODB_URI and JWT_SECRET in .env
```

### 4. Development
```bash
# Run server
npm run dev:server

# Run web app
npm run dev:web

# Run mobile app
npm run dev:mobile
```