Deploy your NanoSoft Suite project with a PostgreSQL database for free,
 we can use the following combination of services:

1. Vercel for hosting the Next.js application
2. Supabase for hosting the PostgreSQL database


Here's a step-by-step guide to deploy your project:

1. Deploy the PostgreSQL database on Supabase:

a. Go to [https://supabase.com/](https://supabase.com/) and sign up for a free account.
b. Create a new project in Supabase.
c. Once the project is created, go to the "Settings" > "Database" section.
d. You'll find your database connection details here. Keep this page open as you'll need these details later.


2. Update your project for deployment:

a. Create a new file named `.env.production` in your project root and add the following:

```plaintext
DATABASE_URL=your_supabase_database_url
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=https://your-vercel-app-url.vercel.app
```

Replace `your_supabase_database_url` with the connection string from Supabase, and set a secure `NEXTAUTH_SECRET`.


3. Deploy the Next.js application on Vercel:

a. Push your project to a GitHub repository if you haven't already.

b. Go to [https://vercel.com/](https://vercel.com/) and sign up for a free account.

c. Click on "New Project" and select your GitHub repository.

d. In the "Configure Project" step:

1. Set the Framework Preset to "Next.js"
2. Expand the "Environment Variables" section
3. Add all the variables from your `.env.production` file


e. Click "Deploy"


4. Run database migrations:

After the initial deployment is complete, you need to run your Prisma migrations on the production database. You can do this using the Vercel CLI:

a. Install the Vercel CLI:

```shellscript
npm i -g vercel
```

b. Log in to your Vercel account:

```shellscript
vercel login
```

c. Link your project:

```shellscript
vercel link
```

d. Run the database migration:

```shellscript
vercel env pull .env.production
npx prisma migrate deploy
```


5. Redeploy your application:

Go to the Vercel dashboard, select your project, and click "Redeploy" to ensure all changes are applied.




Additional considerations:

1. Update your `next.config.js` file to include Supabase in the allowed image domains:


```javascript project="nanosoft-suite" file="next.config.js"
...
```

Replace `your-project-id` with your actual Supabase project ID.

2. If you're using NextAuth.js email provider, you'll need to set up an email service. You can use services like SendGrid or Mailgun, which offer free tiers. Add the necessary environment variables to your Vercel project settings.
3. Remember to update the `NEXTAUTH_URL` in your Vercel environment variables with the actual URL of your deployed application.
4. For local development, keep using your `.env.local` file with local database settings.


By following these steps, you'll have your NanoSoft Suite project deployed on Vercel with a PostgreSQL database hosted on Supabase, all for free. Both services offer generous free tiers that should be sufficient for most small to medium-sized projects.

Remember to monitor your usage to ensure you stay within the free tier limits. As your project grows, you may need to consider paid plans for additional resources and features.