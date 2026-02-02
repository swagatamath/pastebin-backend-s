# Pastebin Lite - Vercel Compatible

A lightweight Pastebin-like application built with Node.js, Express.js, and PostgreSQL, optimized for Vercel deployment.

The application allows users to create text pastes and share them via a unique URL. Each paste can optionally expire after a certain time (TTL) or after a limited number of views.

## Features

- Create text pastes with optional expiration time and view limits
- View pastes in both JSON and HTML format
- PostgreSQL database storage
- Serverless deployment ready with individual API routes

## API Endpoints

- `POST /api/pastes` - Create a new paste
- `GET /api/pastes/:id` - Get paste by ID (JSON)
- `GET /p/:id` - View paste in HTML format
- `GET /api/healthz` - Health check endpoint

## Local Development

### Prerequisites
- Node.js (v18+)
- A PostgreSQL database (Neon recommended)
- Vercel CLI (optional): `npm i -g vercel`

### Steps

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd pastebin-project
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your DATABASE_URL
   ```

4. **Start development server:**
   ```bash
   npm run dev
   # or npm start
   ```

The app will run at: http://localhost:3000

## Vercel Deployment

### Prerequisites
- Vercel account
- PostgreSQL database (Vercel Postgres, Supabase, Neon, etc.)

### Deployment Steps

1. **Set up database:**
   Create a PostgreSQL database and get the connection string.

2. **Configure environment variables in Vercel:**
   ```bash
   vercel env add DATABASE_URL
   # Enter your PostgreSQL connection string when prompted
   ```

3. **Deploy:**
   ```bash
   npm run deploy
   ```

### Environment Variables

Set these in your Vercel dashboard:

- `DATABASE_URL` - PostgreSQL connection string

## Project Structure (Updated for Vercel)

```
├── api/
│   ├── index.js           # Main API entry point
│   ├── healthz.js         # Health check endpoint
│   ├── pastes.js          # Create pastes endpoint
│   ├── pastes/[id].js     # Get paste by ID (JSON)
│   └── p/[id].js          # View paste (HTML)
├── src/
│   ├── db/
│   │   └── postgres.js    # Database connection
│   ├── services/
│   │   └── paste.service.js
│   ├── routes/            # Legacy routes (kept for reference)
│   └── config/
├── sql/
│   └── init.sql           # Database schema
├── vercel.json            # Vercel configuration
├── .env.example           # Environment variables template
└── package.json
```

## Database Schema

The application uses a single `pastes` table. The schema is automatically created when the application starts.

## Usage Examples

### Creating a paste:
```bash
curl -X POST https://your-app.vercel.app/api/pastes \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Hello World!",
    "ttl_seconds": 3600,
    "max_views": 5
  }'
```

Response:
```json
{
  "id": "a1b2c3d4e5f6g7h8",
  "url": "https://your-app.vercel.app/p/a1b2c3d4e5f6g7h8"
}
```

### Viewing a paste:
- **JSON API**: `GET /api/pastes/:id`
- **HTML View**: `GET /p/:id`

## Migration Notes

This version has been restructured to follow Vercel's modern standards:

- ✅ Individual API route files instead of monolithic Express app
- ✅ Updated `vercel.json` configuration using modern syntax
- ✅ Environment-aware database SSL configuration
- ✅ Optimized for serverless functions
- ✅ Proper error handling and response formatting# pastebin-backend-s
