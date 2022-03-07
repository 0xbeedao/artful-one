This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

## Deploying to Akash

```
yarn build
docker build -t artful-one .
```

Possibly test with
```
docker run -p 3000:3000 artful-one
```

Open Akashalytics app
