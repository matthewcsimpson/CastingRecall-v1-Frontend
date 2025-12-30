// Styles
import "./GenreTags.scss";

// Utilties
import { formatGenre } from "../../utilities/utilities";

/**
 * Component to display genre tags for a movie.
 * @param {{genreIds?: Array<number>, genres?: Array<{id: number, name: string}>}} props
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
