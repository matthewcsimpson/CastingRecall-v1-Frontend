import { useMemo } from "react";
import "./Pagination.scss";

const Pagination = ({
  page,
  totalPages,
  onPageChange,
  isLoading = false,
  ariaLabel = "Pagination",
}) => {
  const pages = useMemo(() => {
    if (!totalPages || totalPages <= 1) {
      return [];
    }

    const visibleRadius = 2;
    const rangeStart = Math.max(1, page - visibleRadius);
    const rangeEnd = Math.min(totalPages, page + visibleRadius);

    const range = [];

    if (rangeStart > 1) {
      range.push(1);
      if (rangeStart > 2) {
        range.push("start-ellipsis");
      }
    }

    for (let i = rangeStart; i <= rangeEnd; i += 1) {
      range.push(i);
    }

    if (rangeEnd < totalPages) {
      if (rangeEnd < totalPages - 1) {
        range.push("end-ellipsis");
      }
      range.push(totalPages);
    }

    return range;
  }, [page, totalPages]);

  if (!pages.length) {
    return null;
  }

  const handlePageChange = (nextPage) => {
    if (typeof onPageChange !== "function") {
      return;
    }

    if (nextPage < 1 || nextPage > totalPages || nextPage === page) {
      return;
    }

    onPageChange(nextPage);
  };

  return (
    <nav className="pagination" aria-label={ariaLabel}>
      <button
        type="button"
        className="pagination__control"
        onClick={() => handlePageChange(page - 1)}
        disabled={page <= 1 || isLoading}
      >
        Previous
      </button>
      <ul className="pagination__list">
        {pages.map((item) => {
          if (typeof item === "string") {
            return (
              <li
                key={item}
                className="pagination__ellipsis"
                aria-hidden="true"
              >
                ...
              </li>
            );
          }

          const isActive = item === page;

          return (
            <li key={item}>
              <button
                type="button"
                className={`pagination__page${
                  isActive ? " pagination__page--active" : ""
                }`}
                onClick={() => handlePageChange(item)}
                aria-current={isActive ? "page" : undefined}
                disabled={isActive || isLoading}
              >
                {item}
              </button>
            </li>
          );
        })}
      </ul>
      <button
        type="button"
        className="pagination__control"
        onClick={() => handlePageChange(page + 1)}
        disabled={page >= totalPages || isLoading}
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;
