# Штофъ — сайт ресторана

Vite + React + TypeScript + Tailwind CSS v4 + shadcn-структура (`components.json`, `@/components/ui`, `@/lib/utils`) + framer-motion.

## Запуск

```bash
npm install
npm run dev
```

Сборка для хостинга — `npm run build`, готовые файлы появятся в папке `dist/`.

## Где что лежит

- `src/data/site.ts` — телефон, адрес, часы работы, фирменные блюда, отзывы (данные с Яндекс Карт).
- `src/data/menu.ts` — всё меню текстом: кухня, бар, настойки, бизнес-ланч (переписано с фото карт меню). Цены и позиции правятся здесь.
- `src/components/ui/hero-section-2.tsx` — главный экран с анимацией появления текста.
- `src/components/sections/` — остальные секции сайта.
- `public/images/` — логотип, фото заведения, карты меню (`menu/`).
