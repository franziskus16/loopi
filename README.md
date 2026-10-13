# Loopi

A demo online shop built with React and TypeScript. It loads the full catalogue from the [DummyJSON products API](https://dummyjson.com/docs/products), with search, category filters, a detail page for every product and a working cart.

**Live demo:** https://loopi.vercel.app

## Features

- **Full catalogue** of almost 200 products, loaded in a single request with only the fields the list needs.
- **Search and category filter** that work together, with a live result count and a "Clear filters" shortcut.
- **Product page** with an image gallery, real ratings and review count, discount, stock, shipping and return details.
- **Cart** with quantities, subtotal and a demo checkout. It's saved in the browser, so it survives a reload.
- **Loading, empty, error and "not found" states**, announced to screen readers, with a retry button when the API fails.
- **Shareable links.** Every product has its own URL that works when opened directly or after a refresh.
- **Accessible.** Labelled form fields, keyboard-friendly gallery and quantity controls, a skip link and an active state in the navigation.

## Tech

- React 19 and TypeScript (strict) with Vite
- React Router 7
- Cart state with Context and `useReducer`, persisted to `localStorage`
- Tailwind CSS
- Axios, wrapped in a small typed service layer
- Vitest and React Testing Library
- GitHub Actions (lint, type check, tests and build on every push), deployed on Vercel

## Project structure

```
src/
├── cart/         # cartReducer (pure, unit-tested) and CartContext
├── components/   # Header, ProductCard, SearchBar, CategoryFilter, QuantityInput, Rating…
├── hooks/        # useProducts / useProduct: data loading with loading and error states
├── pages/        # Home, ProductDetail, Cart, About
├── services/     # API calls
├── utils/        # Price and category formatting
└── types.ts      # Product types shared across the app
```

## Tests

18 tests covering the formatting helpers, every cart action, and the main user journeys rendered as a whole app: browsing and filtering, API errors with retry, product pages, products that don't exist, and adding, changing and removing items in the cart.

## Running it

```bash
npm install
npm run dev       # http://localhost:8010
npm run test:ci   # run the tests once
npm run build     # type check and production build in dist/
```
