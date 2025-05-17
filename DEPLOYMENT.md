# Deployment Guide

This document provides instructions for deploying the portfolio website to various hosting platforms.

## Prerequisites

Before deploying, make sure you have:

1. A PostgreSQL database (you can use services like Neon, Supabase, or any PostgreSQL provider)
2. Set up your environment variables (see `.env.example`)
3. Built the application using `npm run build`

## Deployment Options

### Option 1: Vercel

1. Sign up for a [Vercel](https://vercel.com) account
2. Install the Vercel CLI: `npm i -g vercel`
3. Run `vercel` in the project directory
4. Follow the prompts to link your project
5. Set up the environment variables in the Vercel dashboard
6. Deploy with `vercel --prod`

### Option 2: Netlify

1. Sign up for a [Netlify](https://netlify.com) account
2. Install the Netlify CLI: `npm i -g netlify-cli`
3. Run `netlify init` in the project directory
4. Follow the prompts to link your project
5. Set up the environment variables in the Netlify dashboard
6. Deploy with `netlify deploy --prod`

### Option 3: Heroku

1. Sign up for a [Heroku](https://heroku.com) account
2. Install the Heroku CLI: `npm i -g heroku`
3. Run `heroku create your-app-name` in the project directory
4. Add PostgreSQL: `heroku addons:create heroku-postgresql:hobby-dev`
5. Set environment variables: `heroku config:set NODE_ENV=production`
6. Deploy with `git push heroku main`

## Database Migration

After deploying, you may need to run database migrations:

```bash
# If deploying to Vercel or Netlify with their CLI
npm run db:push

# If deploying to Heroku
heroku run npm run db:push
```

## Troubleshooting

If you encounter any issues during deployment:

1. Check that all environment variables are set correctly
2. Verify that your database connection string is valid
3. Check the deployment logs for any error messages
4. Ensure you've built the application with `npm run build`

## Contact

If you need help with deployment, contact Aum Patel at [patelaum37@gmail.com](mailto:patelaum37@gmail.com).