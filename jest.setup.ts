import "@testing-library/jest-dom";

import fetchMock from "jest-fetch-mock";
fetchMock.enableMocks();

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
});

import { TextEncoder as UtilTextEncoder, TextDecoder as UtilTextDecoder } from "util";

(global as any).TextEncoder = UtilTextEncoder;
(global as any).TextDecoder = UtilTextDecoder;
