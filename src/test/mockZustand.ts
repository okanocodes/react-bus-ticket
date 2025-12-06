// mockZustand.ts (FIXED)

import { act } from "@testing-library/react";
import { beforeEach, vi } from "vitest";
import type { StateCreator } from "zustand";

/**
 * Reset Zustand store between tests
 */
export function mockZustand() {
  const initializers = new Set<() => void>();

  // Patch store creation so we capture initial state
  // Use a generic with importOriginal or assert the type of zustand.
  vi.mock("zustand", async (orig) => {
    // Assert the type of the imported module to resolve 'unknown' and spread errors.
    const zustand = (await orig()) as Record<string, any>;

    return {
      ...zustand,
      create: (createState: StateCreator<any>) => {
        // Ensure zustand.create is called correctly (it may also need a type check if the spread is incomplete)
        const createFn = zustand.create as typeof import("zustand").create;

        const store = createFn(createState);

        const initialState = store.getState();

        initializers.add(() => {
          act(() => {
            store.setState(initialState, true);
          });
        });

        return store;
      },
    };
  });

  beforeEach(() => {
    initializers.forEach((reset) => reset());
  });
}
