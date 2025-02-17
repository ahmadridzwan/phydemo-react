# Phygrid React App

This is Phygrid React App made with [Next.js](https://nextjs.org) and bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

A live demo site is available on [https://phygrid.ahmadridzwan.com](https://phygrid.ahmadridzwan.com).

## Project Features

- Built with [Next.js](https://nextjs.org) and [Tailwind](https://tailwindcss.com/)
- Auth Guards integrated with [Supabase](https://supabase.com/) authentication
  - Custom authentication form with interactive password requirements and strength indicator
- Integration with Mock API from [Reqres](https://reqres.in/)
- Lazy loading of content
- Responsive design for variety of screen sizes
- Unit tests implemented with [Jest](https://jestjs.io/)
- Integrated with [Husky](https://typicode.github.io/husky/) for pre-commit and pre-push git hooks to ensure proper linting
- Automatic code formatting and linting with [Prettier](https://prettier.io/) and [ESlint](https://eslint.org/)

## Prerequisites

This application was built to integrate with [Supabase](https://supabase.com/) authentication provider. To run this project locally, follow these steps:

1. Create an account on Supabase
2. Create a new `project` on a region closest to you and leave the rest to their default settings
3. Take note of the project URL and API key details to be used later in your `.env` file. These can be found under Settings > Data API, then under `URL` and `anon public`

## Getting Started

To run the development server locally, follow these steps:

1. Clone this git repository by running within your desired directory:
   `git clone https://github.com/ahmadridzwan/phygrid-react.git`
2. Create a `.env` file at the root of your project (e.g. `.env.local`) and include the following contents:

   ```
   NEXT_PUBLIC_API_URL=https://reqres.in/api
   NEXT_PUBLIC_SUPABASE_URL=<SUPABASE_URL>
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<SUPABASE_API_KEY>
   ```

3. Install dependencies by running `npm install`
4. Run the development server by running `npm run dev`
5. Your application should now be running at [http://localhost:3000](http://localhost:3000)
6. Register your first user by navigating to [http://localhost:3000/register](http://localhost:3000/register) or by clicking on the 'Register' button at the bottom of the Login page
7. Confirm your registration by clicking on the `Confirm your mail` button in the Email sent by Supabase

## Project Roadmap

- Add test specifications for the remaining components
- Various performance optimisations
- Add search function
- Add remaining CRUD operations; add, update, and delete
- Add own API with dedicated database
- Implement Github Action or other CI/CD tool to integrate with Vercel
- Optimize for iOS Safari (and possibly other mobile browsers); Safari treats the loading MP4 file as video and sometimes goes into Picture in Picture mode
- Optimize loading animation and asset
