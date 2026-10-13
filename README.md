# Stories Hut Admin

Admin console for the Stories Hut publishing platform. Design reference:
[Stories Hut Admin on Figma](https://www.figma.com/design/hhHKrLZaaNODzktloOkOH0/Stories-hut-Admin?node-id=0-1).

## Screens

| Route          | Screen            | What it does |
| -------------- | ----------------- | ------------ |
| `/`            | Dashboard         | KPI tiles, reader growth chart, revenue by tier, genre popularity, pending submissions, urgent reports, audit ledger and weekly milestone. |
| `/submissions` | Submissions Queue | Editorial queue with SLA tiers, filters (genre, SLA, reviewer, language), sorting, multi-select and bulk actions. |
| `/stories`     | Stories           | Catalogue with stats, search (`/` to focus), genre chips, language/status/premium filters, table and grid views, sorting. |

## Navigation

- Sidebar links open Dashboard, Stories and Submissions.
- From the dashboard, **+ Review Batch** and the **Pending Submissions** tile open the Submissions Queue; the **Indexed Stories** tile opens Stories.
- The top-bar search jumps to Stories pre-filtered by the query.
- Approving an item in the pending queue removes it and updates the waiting counters.
- Remaining sidebar sections are placeholders and show a "coming soon" notice.

## Tech stack

- React 19 + TypeScript, bundled with Vite
- React Router 7
- Plain CSS with design tokens in `src/styles.css`
- Fonts: Playfair Display (headings) and Nunito (body)
- Inline SVG icons and a hand-drawn SVG line chart

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build into dist/
npm run preview  # serve the production build
```

## Project layout

```
public/logo.png          Brand logo
src/
  main.tsx               Entry: router + toast provider
  App.tsx                Route table
  styles.css             Design tokens, layout, components
  components/
    Layout.tsx           Sidebar + top bar shell
    Toast.tsx            Lightweight toast context
    Cover.tsx            Gradient book covers
    Avatar.tsx           Initials avatars
    icons.tsx            SVG icon set
  data/                  Sample data for each screen
  pages/
    Dashboard.tsx
    Submissions.tsx
    Stories.tsx
```
