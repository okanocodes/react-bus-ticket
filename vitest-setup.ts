import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { beforeAll, afterEach, afterAll, vi } from "vitest";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

// Mocking the agencies API call ---
const handlers = [
  http.get("/api/reference/agencies", () => {
    return HttpResponse.json([
      { id: "ist-alibeykoy", name: "İstanbul – Alibeyköy" },
      { id: "ist-bayrampasa", name: "İstanbul – Bayrampaşa" },
      { id: "ank-astim", name: "Ankara – AŞTİ" },
      { id: "bursa-otogar", name: "Bursa – Otogar" },
    ]);
  }),
];
export const server = setupServer(...handlers);

// Start/Stop/Reset MSW Server
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterAll(() => server.close());
afterEach(() => {
  server.resetHandlers();
  cleanup();
});

// --- Mocking react-i18next ---
vi.mock("react-i18next", async (importOriginal) => {
  // 1. Get the actual module to extract necessary exports (like initReactI18next)
  const actual = await importOriginal<typeof import("react-i18next")>();

  return {
    // 2. Return the actual initReactI18next export (REQUIRED by i18n.use())
    initReactI18next: actual.initReactI18next,

    // 3. Keep the mocked hook for component testing/assertions
    useTranslation: () => ({
      // Returns the key itself, e.g., t('total') === 'total'
      t: (key: string) => key,
      i18n: {
        changeLanguage: vi.fn(),
      },
    }),

    // 4. Mocks the provider component
    I18nextProvider: ({ children }: { children: React.ReactNode }) => children,
  };
});

// --- Day.js ---

type DayjsModule = { default: typeof import("dayjs") } | typeof import("dayjs");

const mockDate = "2025-12-10";

vi.mock("dayjs", async (importOriginal) => {
  const dayjsModule = await importOriginal<DayjsModule>();

  const dayjsCore = (dayjsModule as any).default || dayjsModule;

  const utc = await import("dayjs/plugin/utc");
  const localeData = await import("dayjs/plugin/localeData");

  const pluginUtc = (utc as any).default || utc;
  const pluginLocaleData = (localeData as any).default || localeData;

  (dayjsCore as any).extend(pluginUtc);
  (dayjsCore as any).extend(pluginLocaleData);

  return {
    ...dayjsModule,
    default: (date?: string) => {
      // Mock the date function to use our fixed instance and mock date
      if (date) return (dayjsCore as any)(date);
      return (dayjsCore as any)(mockDate);
    },
  };
});
