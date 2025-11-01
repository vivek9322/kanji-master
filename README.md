# JLPT N5 Kanji Flashcards

A modern, responsive web application for learning Japanese JLPT N5 kanji using an interactive flashcard system. Built with Next.js, TypeScript, Tailwind CSS, Framer Motion, and Supabase.

## Features

- 📚 **110 JLPT N5 Kanjis**: Pre-loaded with all N5 kanji and their readings
- 🎴 **Interactive Flashcards**: Flip animations with Framer Motion
- 🔍 **Search & Filter**: Find kanjis by meaning, reading, or kanji character
- 👤 **User Authentication**: Sign up/sign in with email or Google OAuth
- 💾 **Cloud Storage**: Save your custom flashcards to Supabase (synced across devices)
- 🌙 **Dark Mode**: Toggle between light and dark themes
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices
- 🎯 **Study Mode**: Randomize flashcards for better learning

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **State Management**: Zustand
- **Deployment**: Vercel

## Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- A Supabase account (free tier is sufficient)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd jlpt-n5-kanji-flashcards
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Project Settings > API
3. Copy your Project URL and `anon` public key
4. In your Supabase SQL Editor, run the migration script:

```sql
-- Copy and paste the contents of supabase/migrations/001_create_flashcards_table.sql
```

This will create the `flashcards` table with Row Level Security (RLS) enabled.

5. (Optional) Enable Google OAuth:
   - Go to Authentication > Providers in your Supabase dashboard
   - Enable Google provider
   - Add your OAuth credentials

### 4. Configure Environment Variables

1. Copy the example environment file:

```bash
cp env.example .env.local
```

2. Open `.env.local` and fill in your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 5. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
.
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page (N5 Kanjis)
│   ├── my-flashcards/     # My Flashcards page
│   ├── add-new/           # Add New Flashcard page
│   ├── auth/              # Authentication page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Navbar.tsx         # Navigation bar
│   └── Flashcard.tsx      # Flashcard component
├── data/                  # Static data
│   └── jlpt_n5_kanji.json # N5 kanji data
├── lib/                   # Utilities
│   ├── supabase.ts       # Supabase client
│   └── store.ts          # Zustand store
├── types/                 # TypeScript types
│   └── index.ts          # Type definitions
└── supabase/             # Supabase migrations
    └── migrations/       # Database migration scripts
```

## Deployment to Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Click "Deploy"

### 3. Configure Supabase Redirect URLs

After deployment, add your Vercel URL to Supabase:
1. Go to Supabase Dashboard > Authentication > URL Configuration
2. Add your Vercel URL to "Redirect URLs"
3. Add `https://your-vercel-url.vercel.app/**` to "Site URL" if needed

## Usage

### Home Page (N5 Kanjis)
- Browse all 110 JLPT N5 kanjis
- Click on any flashcard to flip and see details
- Use the search bar to filter kanjis
- Toggle "Study Mode" to randomize the order

### My Flashcards
- View all flashcards you've created
- Requires authentication
- Delete flashcards you no longer need

### Add New Flashcard
- Create custom flashcards
- Requires authentication
- Fill in kanji, readings, meaning, and example

### Authentication
- Sign up with email/password or Google
- Your flashcards are synced across devices via Supabase

## Database Schema

The `flashcards` table has the following structure:

- `id` (UUID): Primary key
- `user_id` (UUID): Foreign key to auth.users
- `kanji` (TEXT): The kanji character
- `onyomi` (TEXT): On-reading
- `kunyomi` (TEXT): Kun-reading
- `meaning` (TEXT): English meaning
- `example` (TEXT): Example word/usage
- `created_at` (TIMESTAMP): Creation timestamp
- `updated_at` (TIMESTAMP): Last update timestamp

Row Level Security (RLS) is enabled, ensuring users can only access their own flashcards.

## Customization

### Adding More Kanji
Edit `data/jlpt_n5_kanji.json` to add more kanji. The format is:

```json
{
  "id": 1,
  "kanji": "一",
  "onyomi": "イチ",
  "kunyomi": "ひと-",
  "meaning": "one",
  "example": "一人 (ひとり) - one person"
}
```

### Styling
Modify `tailwind.config.ts` to customize colors, fonts, and other design tokens.

## Troubleshooting

### Environment Variables Not Working
- Ensure `.env.local` exists and contains the correct values
- Restart your development server after changing `.env.local`
- Check that variable names start with `NEXT_PUBLIC_` for client-side access

### Supabase Connection Issues
- Verify your Supabase URL and API key are correct
- Check that Row Level Security policies are set up correctly
- Ensure the `flashcards` table exists in your Supabase database

### Build Errors
- Run `npm run build` to check for TypeScript errors
- Ensure all dependencies are installed: `npm install`

## License

MIT License - feel free to use this project for your own learning or projects!

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.

