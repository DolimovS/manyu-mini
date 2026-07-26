# Zamin — QR Menu

Mobile-first digital menu for **Zamin** restaurant, built with React 18 + Vite,
Tailwind CSS, and Framer Motion. Live data comes straight from a Google Sheet
via the [OpenSheet](https://opensheet.elk.sh) API — no backend needed.

## Getting started

```bash
npm install
npm run dev      # local dev server
npm run build    # production build -> dist/
npm run preview  # preview the production build
```

## Project structure

```
src/
  components/
    Splash.jsx          splash/branding screen show while data loads
    Header.jsx           title + live search
    CategoryTabs.jsx     sticky horizontal category pill filter
    CategorySection.jsx  a category heading + its dish list
    DishCard.jsx          single menu item, handles the stop-list state
    DishImage.jsx         image with graceful gradient/initials fallback
    CardSkeleton.jsx      loading placeholder row
    EmptyState.jsx        "no results" state for search/empty categories
  hooks/
    useMenuData.js        fetches + normalizes the Google Sheet data
  utils/
    menu.js                category ordering, price formatting, stop-list
                           check, search normalization
  App.jsx
  main.jsx
  index.css
```

## Data source

Rows are read from:

```
https://opensheet.elk.sh/1RpAZ816MUyW1donE0owJTuvzFWsMNtTnCtti79csFQA/menyu
```

Expected columns: `id`, `category`, `name`, `price`, `image`, `is_available`.
Set `is_available` to `FALSE` (any case) to mark a dish as sold out — it will
render dimmed with a "Tugagan / Stop-list" badge and drop to the bottom of
its section.

## Category order

Categories are always shown in this order, with anything unlisted appended
alphabetically afterwards:

1. Issiq taomlar
2. Salatlar
3. Ichimliklar
4. Fast Food
5. Dessertlar

Edit `CATEGORY_ORDER` in `src/utils/menu.js` to change this.

## Notes

- No cart or ordering flow — this is a pure read-only menu.
- Images that are missing or fail to load fall back to a branded
  gradient tile with the dish's initials — never a broken-image icon.
- The splash screen enforces a small minimum display time so it always
  reads as intentional branding rather than a flash of loading state.
# manyu-mini
