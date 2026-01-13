# Hotel Management System

A small, opinionated hotel management web application built with Next.js and TypeScript. The app demonstrates core functionality for managing hotels and bookings: user registration and login, hotel search and listing, booking creation, and basic administrative views.

## Features

- User authentication (register / login).
- Search and browse hotels.
- Create and manage bookings.
- Reusable UI components and simple layouts under pp/ and components/.
- Database layer and validation code under db/ (uses Drizzle for schema/queries).

## Tech stack

- Next.js (App Router) + TypeScript
- Drizzle (ORM) for database schema and queries
- PostCSS / CSS modules for styling

## Quick start

1. Install dependencies:

`ash
npm install
`

2. Run the development server:

`ash
npm run dev
`

3. Open http://localhost:3000 in your browser.

Configure environment variables as needed (for example a DATABASE_URL if you connect to an external database). See the db/ folder for schema and initialization code.

## Project structure (high level)

- pp/ — Next.js pages and route handlers (UI, auth actions, booking flows).
- components/ — Shared UI components (Navbar, Footer, UI primitives).
- db/ — Schema, DB helpers, and validation.
- lib/ — Utility helpers.
- public/ — Static assets.

## Next steps

- Add environment-specific configuration (database, secrets).
- Add tests and CI for critical flows.
