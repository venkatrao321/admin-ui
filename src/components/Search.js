import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const Search = ({ searchfun }) => {
  const handleSearch = (e) => {
    searchfun(e.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "90%" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="search"
        onChange={handleSearch}
        type="search"
        placeholder="Search by Name, Email, and Role"
      />
    </Box>
  );
};
export default Search;
