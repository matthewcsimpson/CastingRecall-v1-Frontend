export const MAX_GUESSES = 10;
export const MOVIES_PER_PUZZLE = 6;
export const DEFAULT_PAGE_SIZE = 20;

export const ROUTES = Object.freeze({
  home: "/",
  fallback: "*",
  puzzleList: "/puzzle/list",
  puzzleId: "/puzzle/:puzzleId",
});

export const API_ENDPOINTS = Object.freeze({
  puzzleList: "/puzzle/list",
  puzzleId: "/puzzle/:puzzleId",
});
