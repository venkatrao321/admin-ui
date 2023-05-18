import React from "react";
import Pagination from "@mui/material/Pagination";

const AppPagination = ({ setPage, userLength, itemsPerPage }) => {
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const totalPages = Math.ceil(userLength / itemsPerPage);

  return (
    <Pagination
      className="paginationUi"
      count={totalPages}
      size="medium"
      color="primary"
      variant="outlined"
      showFirstButton
      showLastButton
      onChange={handleChangePage}
    />
  );
};

export default AppPagination;
