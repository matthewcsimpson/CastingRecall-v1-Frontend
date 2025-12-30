// Styles
import "./GenreTags.scss";

// Utilities
import { formatGenre } from "../../utilities";

/**
 * Component to display genre tags for a movie.
 * @param {Array<number>} [genreIds=[]] Array of genre IDs from TMDB.
 * @param {Array<{id: number, name: string}>} [genres=[]] Array of genre objects from TMDB.
 *
 * @returns {JSX.Element}
 */
const GenreTags = ({ genreIds = [], genres = [] }) => {
  return (
    <p className="genrelist">
      {Array.isArray(genreIds)
        ? genreIds.map((id) => {
            return (
              <span key={id} className={`genre genre--${id}`}>
                {formatGenre(id, genres)}
              </span>
            );
          })
        : null}
    </p>
  );
};

export default GenreTags;
