# Hono Portfolio

A responsive, dark developer portfolio built with Hono, TypeScript, and plain CSS.

## Requirements

- Node.js 20 or newer
- npm

## Run locally

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

For a production-style local run:

```bash
npm run typecheck
npm start
```

Set a different port with `PORT=4000 npm run dev`.

## Pages

- `/` — Home
- `/projects` — Project showcase
- `/blog` — Blog index
- `/cv` — CV / résumé
- `/about` — About
- `/contact` — Contact details and email link

## Personalise it

Edit the page content in `src/index.ts`. Replace the sample project cards, blog entries, skills, and CV details with your own information. Update the contact email and social links before publishing.

The stylesheet is served from `/style.css` by the Hono static-file middleware. Run the server from the project root so the `public` directory can be resolved correctly.

The contact form is intentionally not included in this starter: a real form needs a backend delivery method or a form provider. The contact page currently uses a mailto link.
