import Pagination from "@mui/material/Pagination";
const AppPagination = (props) => {
  const handleChangePage = (event, newPage) => {
    props.setPage(newPage);
  };
  return (
    <>
        <Pagination
          className="paginationUi"
          count={Math.ceil(props.userLength / props.itemsPerPage)}
          size="mediam"
          color="primary"
          variant="outlined"
          showFirstButton
          showLastButton
          onChange={handleChangePage}
        />
     
    </>
  );
};
export default AppPagination;
