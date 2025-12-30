/**
 * Resolve a genre name from a TMDB genre collection and identifier.
 * @param {number} id TMDB genre identifier.
 * @param {Array<{id: number, name: string}>} genres Lookup collection returned by TMDB.
 * @returns {string} Matching genre name or "Unknown" when missing.
 */
export const formatGenre = (id, genres) => {
  if (!Array.isArray(genres)) {
    return "Unknown";
  }

  const genreName = genres.find((genre) => genre.id === id);
  return genreName?.name || "Unknown";
};
