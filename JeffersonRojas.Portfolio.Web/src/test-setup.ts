/**
 * Global test setup.
 *
 * jsdom does not implement `matchMedia`, which the theme service and the header
 * both rely on. A neutral stub is installed here so components under test never
 * crash; specs that care about a specific media state replace it themselves.
 */
function createMediaQueryListStub(query: string): MediaQueryList {
  return {
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    addListener: () => undefined,
    removeListener: () => undefined,
    dispatchEvent: () => false,
    // The stub only needs the surface the application actually touches; the
    // cast documents that it is intentionally partial.
  } as unknown as MediaQueryList;
}

if (typeof window !== 'undefined' && typeof window.matchMedia !== 'function') {
  window.matchMedia = createMediaQueryListStub;
}
