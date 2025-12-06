# Otobüs bileti satış uygulaması

Kullanıcıların kalkış, varış noktası ve tarih seçerek otobüs seferi arayabildiği, ardından araç içi koltuk planı üzerinden koltuk seçimi yapabildiği modern bir React uygulamasıdır.

Uygulama React, Material UI, React Query, React Hook Form, Zod, i18next gibi kütüphaneler ile geliştirilmiştir.

## Proje Yapısı

    react-bus-ticket/
    ├── .gitignore
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── public/
    │   └── mockServiceWorker.js
    ├── README.md
    ├── src/
    │   ├── app/
    │   │   ├── dayjs-i18n.ts
    │   │   ├── i18n.ts
    │   │   └── routes.ts
    │   ├── assets/
    │   │   └── react.svg
    │   ├── components/
    │   │   ├── Header.tsx
    │   │   ├── LanguageSwitcher.tsx
    │   │   ├── PassengerForm.tsx
    │   │   ├── PriceSummary.tsx
    │   │   ├── ScheduleList.tsx
    │   │   ├── SearchForm.tsx
    │   │   ├── SeatMap.tsx
    │   │   └── ThemeSwitcher.tsx
    │   ├── hooks/
    │   │   ├── useDayjsTranslation.ts
    │   │   ├── usePassengerSchema.ts
    │   │   ├── useSchedules.ts
    │   │   └── useSeatSchema.ts
    │   ├── index.css
    │   ├── layouts/
    │   │   └── RootLayout.tsx
    │   ├── main.tsx
    │   ├── mocks/
    │   │   ├── browser.ts
    │   │   ├── generateSchedules.ts
    │   │   ├── handlers.ts
    │   │   └── node.ts
    │   ├── pages/
    │   │   ├── SearchPage.tsx
    │   │   ├── SeatSelectionPage.tsx
    │   │   ├── SuccessPage.tsx
    │   │   └── SummaryPage.tsx
    │   ├── services/
    │   │   └── apiClient.ts
    │   ├── store/
    │   │   └── useTripStore.ts
    │   ├── test/
    │   │   ├── PriceSummary.test.tsx
    │   │   ├── SearchForm.test.tsx
    │   │   └── SeatMap.test.tsx
    │   ├── test-utils/
    │   │   ├── mockZustand.ts
    │   │   └── testwrapper.tsx
    │   └── types/
    │       ├── schedules.ts
    │       └── seats.ts
    ├── tsconfig.app.json
    ├── tsconfig.json
    ├── tsconfig.node.json
    ├── vite.config.ts
    └── vitest-setup.ts

## Ekran Görüntüleri

![Uygulama Ekran Görüntüsü](https://i.ibb.co/XZz1C7Z4/localhost-5173-summary-Samsung-Galaxy-S20-Ultra-1.png)

## Lokalde Çalıştırın

Projeyi klonlayın

```bash
  git clone https://github.com/okanocodes/react-bus-ticket.git
```

Proje dizinine gidin

```bash
  cd react-bus-ticket
```

Gerekli paketleri yükleyin

```bash
  npm install
```

Sunucuyu çalıştırın

```bash
  npm run dev
```

Test edin

```bash
  npm run test
```
