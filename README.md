# Real Estate Monorepo

This is a monorepo containing both the frontend and backend for the real estate application.

## Structure

- `apps/frontend`: Next.js frontend application
- `apps/backend`: Express backend API
- `packages/ui`: Shared UI components (if needed)

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development

To run both frontend and backend in development mode:

```bash
npm run dev
```

To run only the frontend:

```bash
cd apps/frontend
npm run dev
```

To run only the backend:

```bash
cd apps/backend
npm run dev
```

### Building

```bash
npm run build
```

### Production

```bash
npm run start
```

## Technologies

- Frontend: Next.js, React, TailwindCSS
- Backend: Express
- Authentication: Firebase Auth
- Maps: Mapbox
- Database: MongoDB (planned) 