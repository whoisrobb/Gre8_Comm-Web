# Gre8 Chat

Gre8 Chat is a team communication platform designed to enhance collaboration and productivity. This project is built with [Next.js](https://nextjs.org) and bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Installation

To install the dependencies, run:

```bash
pnpm install
# or
npm install
# or
yarn install
```

## Getting Started

Before running the development server, start the Convex server:

```bash
pnpm convex dev
# or
npm convex dev
# or
yarn convex dev
# or
bun convex dev
```

Then, run the development server:

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Features

- [x] Real-time messaging
- [ ] Threaded conversations (in development)
- [x] Reactions and emojis
- [x] User authentication
- [x] Workspace management

## Building for Production

To build the app for production, you will need to get a Convex deploy key from your Convex project. This key is required because the Convex server functions differently in production compared to development.

To build the app for production, run:

```bash
npx convex deploy --cmd 'npm run build'
```
