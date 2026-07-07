import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    get length() {
      return Object.keys(store).length;
    },
    key: (index: number) => Object.keys(store)[index] || null,
  };
})();

Object.defineProperty(global, "localStorage", { value: localStorageMock, writable: true });
if (typeof window !== "undefined") {
  Object.defineProperty(window, "localStorage", { value: localStorageMock, writable: true });
}

// Mock HTMLElement.prototype.scrollIntoView since jsdom doesn't implement it
if (typeof HTMLElement !== "undefined") {
  HTMLElement.prototype.scrollIntoView = vi.fn();
}

// Mock window.scrollTo
if (typeof window !== "undefined") {
  window.scrollTo = vi.fn();
}

// Mock navigator.clipboard
if (typeof navigator !== "undefined") {
  Object.defineProperty(navigator, "clipboard", {
    value: {
      writeText: vi.fn().mockImplementation(() => Promise.resolve()),
    },
    writable: true,
  });
}

// Mock global fetch
global.fetch = vi.fn();
