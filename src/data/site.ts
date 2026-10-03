// All facts below are taken from the Yandex Maps card of the restaurant
// (yandex.ru/maps/org/shtof/90593570444) and from the printed menus.

export const site = {
  name: "Штофъ",
  tagline: "Ресторан авторских настоек",
  phone: "+7 (927) 025-74-47",
  phoneHref: "tel:+79270257447",
  address: "Ульяновская ул., 2",
  city: "Сызрань",
  landmark: "100 м от Сызранского кремля",
  routeHref: "https://yandex.ru/maps/org/shtof/90593570444/?mode=routes&rtext=~53.147585,48.454147",
  yandexHref: "https://yandex.ru/maps/org/shtof/90593570444/",
  reviewsHref: "https://yandex.ru/maps/org/shtof/90593570444/reviews/",
  mapWidget: "https://yandex.ru/map-widget/v1/?oid=90593570444&ll=48.454147%2C53.147585&z=16&theme=dark",
  rating: "4,9",
  ratingCount: "420 оценок",
  reviewsCount: "266 отзывов",
  hours: [
    { days: "Пн — Чт", time: "12:00 — 00:00" },
    { days: "Пт — Сб", time: "12:00 — 01:00" },
    { days: "Воскресенье", time: "12:00 — 00:00" },
  ],
  lunch: "12:00 — 16:00",
  /** Google Apps Script web app that forwards booking requests to the staff Telegram chat (see backend/). */
  bookingEndpoint: (import.meta.env.VITE_BOOKING_ENDPOINT as string | undefined) ||
    "https://script.google.com/macros/s/AKfycbylqg-LGajazzWdlIiHyk6K88V1n1QF67ezd0MheTctrNxvmZX_5B9mDNvnE96IPjUL3Q/exec",
} as const;

export const nav = [
  { label: "О нас", href: "#about" },
  { label: "Меню", href: "#menu" },
  { label: "Галерея", href: "#gallery" },
  { label: "Контакты", href: "#contacts" },
] as const;

export const features = [
  "Летняя веранда",
  "Спортивные трансляции",
  "Еда навынос",
  "Кофе с собой",
  "Парковка",
  "Wi-Fi",
  "Оплата картой",
  "Сезонное меню",
] as const;

export const signatureDishes = [
  { title: "Стейк Рибай", note: "Мраморная телятина премиум-класса, хоспер", price: "1120 ₽ / 100 г", src: "images/gallery/g02.jpg" },
  { title: "Тальята с нежной телятиной", note: "Телятина, томаты черри, руккола", price: "1300 ₽", src: "images/gallery/g04.jpg" },
  { title: "Фирменные пельмени ШТОФЪ", note: "Говядина, свинина, копчёная сметана", price: "400 ₽", src: "images/gallery/g16.jpg" },
] as const;

export const nastoykiFlavors = [
  "Клюква", "Облепиха", "Хреновуха", "Кедровица", "Брусника", "Дедушкин компот", "Перцовка",
  "Графа Орлова", "Медовая", "Крамбамбуля", "Сосновые почки", "Макадамия с черносливом",
  "Клубника со сливками", "Фейхоа", "Лимончелло", "Можжевеловая", "Квасная", "Степная",
  "Барбарис", "Лимон-имбирь", "Грибная", "Для самых смелых",
] as const;

export const nastoykiSets = [
  { title: "Рюмка", detail: "25 мл / 45 мл", price: "115 / 185 ₽" },
  { title: "Сет из 5 рюмок", detail: "по 25 мл", price: "575 ₽" },
  { title: "«Пьяное дерево»", detail: "12 рюмок по 45 мл", price: "2220 ₽" },
  { title: "«Ладья»", detail: "28 рюмок по 45 мл", price: "5180 ₽" },
] as const;

// Order and spans are tuned so the bento grid has no holes at 2 and 4 columns.
type GallerySpan = "big" | "tall" | undefined;
const galleryLayout: [string, GallerySpan, string][] = [
  ["g01", "big", "Зал с кирпичной стеной и коваными люстрами"],
  ["g04", undefined, "Тальята с телятиной"],
  ["g15", undefined, "Коктейль в зале"],
  ["g11", "tall", "Стеллаж с настойками"],
  ["g10", undefined, "Десерт с фирменной подачей"],
  ["g16", undefined, "Фирменные пельмени"],
  ["g03", undefined, "Столик у вывески «Штофъ»"],
  ["g08", undefined, "Жареная рыба"],
  ["g06", undefined, "Горячая закуска"],
  ["g05", "big", "Большой зал"],
  ["g02", undefined, "Стейки на хоспере"],
  ["g12", undefined, "Закуски к пенному"],
  ["g07", "tall", "Веранда вечером"],
  ["g13", undefined, "Зал с вывеской"],
  ["g14", undefined, "Чизкейк"],
  ["g09", undefined, "Зал с фактурной стеной"],
];

export const gallery = galleryLayout.map(([file, span, alt]) => ({
  src: `images/gallery/${file}.jpg`,
  alt: `${alt} — ресторан «Штофъ»`,
  span,
}));

// Excerpts from public guest reviews on Yandex Maps.
export const reviews = [
  {
    author: "Сергей А.",
    date: "14 июня",
    text: "В Сызрани я не встретил места лучше: обслуживающий персонал — профи своего дела, меню отлично проработано. И самое главное — кухня просто идеальна, а местные настойки — пушка.",
  },
  {
    author: "Светлана С.",
    date: "3 сентября",
    text: "Отличное заведение! Обслуживание внимательное, быстрое. Очень вкусная кухня. Шашлык отличный, нарезка сала шикарная. Интерьер и внизу, и на веранде располагает.",
  },
] as const;

export const reviewAspects = [
  { label: "Атмосфера", value: 96 },
  { label: "Интерьер", value: 92 },
  { label: "Еда", value: 89 },
  { label: "Персонал", value: 87 },
] as const;
