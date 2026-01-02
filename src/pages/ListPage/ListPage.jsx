import { useEffect, useState } from "react";

// Styles
import "./ListPage.scss";

// Components
import {
  LoadingScreen,
  Pagination,
  PuzzleListItem,
  SiteNav,
} from "../../components";

// Hooks
import { usePuzzleList, usePuzzleStatuses } from "../../hooks";

const ListPage = () => {
  const REACT_APP_API_REMOTE_URL = process.env.REACT_APP_API_REMOTE_URL;
  const [page, setPage] = useState(1);
  const pageSize = 20;

  const {
    data: puzzleList,
    pagination,
    isLoading: isPuzzleListLoading,
  } = usePuzzleList(REACT_APP_API_REMOTE_URL, { page, pageSize });

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [page]);

  useEffect(() => {
    if (pagination?.totalPages && page > pagination.totalPages) {
      setPage(pagination.totalPages);
    }
  }, [pagination?.totalPages, page]);

  const hasPuzzles = Array.isArray(puzzleList) && puzzleList.length > 0;
  const statusByPuzzleId = usePuzzleStatuses(puzzleList);
  const showLoading = isPuzzleListLoading && !hasPuzzles;
  const resolvedPageSize = pagination?.pageSize ?? pageSize;
  const totalItems =
    typeof pagination?.totalItems === "number"
      ? pagination.totalItems
      : typeof pagination?.total === "number"
      ? pagination.total
      : null;
  const totalPagesFromCounts =
    typeof totalItems === "number" && totalItems >= 0
      ? Math.max(1, Math.ceil(totalItems / resolvedPageSize))
      : null;
  const totalPages = pagination?.totalPages ?? totalPagesFromCounts ?? 1;
  const currentPage = pagination?.page ?? page;

  console.log("puzzleList:", puzzleList);

  return (
    <>
      {hasPuzzles ? (
        <SiteNav puzzleId={"list"} puzzleList={puzzleList} />
      ) : showLoading ? (
        <LoadingScreen />
      ) : null}
      {hasPuzzles ? (
        <div className="listpage__header">
          <p className="listpage__headerlabel">Puzzle Name</p>
          <p className="listpage__headerlabel">Progress</p>
        </div>
      ) : null}
      <div className="listpage__listcontainer">
        {hasPuzzles ? (
          puzzleList.map(({ puzzleId, keyPeople }) => (
            <PuzzleListItem
              key={puzzleId}
              puzzleId={puzzleId}
              keyPeople={keyPeople}
              status={statusByPuzzleId[puzzleId]}
            />
          ))
        ) : showLoading ? (
          <LoadingScreen />
        ) : null}
      </div>
      <div className="listpage__pagination">
        <Pagination
          page={currentPage}
          totalPages={totalPages}
          onPageChange={setPage}
          isLoading={isPuzzleListLoading}
          ariaLabel="Puzzle list pagination"
        />
      </div>
    </>
  );
};

export default ListPage;
