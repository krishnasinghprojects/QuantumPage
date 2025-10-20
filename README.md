# Random Page Generator

A React/Next.js application that generates random web pages using Google's Gemini AI, deployed on Vercel.

## Features

- **Serverless Architecture**: Uses Next.js API routes for secure backend operations
- **AI-Powered**: Generates unique, creative web pages using Gemini AI
- **Modern UI**: Beautiful loading animations and responsive design
- **Secure**: API keys stored safely in environment variables

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env.local` file with your Gemini API key:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment on Vercel

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)

2. Connect your repository to Vercel:
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Vercel will automatically detect it's a Next.js project

3. Add environment variables:
   - In your Vercel project dashboard, go to Settings → Environment Variables
   - Add `GEMINI_API_KEY` with your Google Gemini API key

4. Deploy:
   - Vercel will automatically build and deploy your project
   - Every push to your main branch will trigger a new deployment

## Getting a Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key and add it to your environment variables

## Project Structure

```
├── pages/
│   ├── api/
│   │   └── generate.js     # API endpoint for Gemini calls
│   └── index.js            # Main React component
├── .env                    # Environment variables (local)
├── next.config.js          # Next.js configuration
├── package.json            # Dependencies and scripts
└── vercel.json            # Vercel deployment config
```

## Technologies Used

- **Next.js**: React framework with API routes
- **React**: Frontend library
- **Vercel**: Deployment platform
- **Google Gemini AI**: Content generation
- **CSS-in-JS**: Styled JSX for component styling