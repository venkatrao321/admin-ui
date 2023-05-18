
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Stack,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import CloseIcon from "@mui/icons-material/Close";
import Search from "./Search";
import AppPagination from "./Pagination";

const TableData = () => {
  const [userData, setUserData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [editId, setEditId] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      const data = await response.json();
      setUserData(data);
      setTableData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    if (name === "allselect") {
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const currentPageData = userData.slice(startIndex, endIndex);
      const newData = userData.map((user) =>
        currentPageData.includes(user) ? { ...user, isChecked: checked } : user
      );
      setUserData(newData);
    } else {
      const updatedData = userData.map((user) =>
        user.id === name ? { ...user, isChecked: checked } : user
      );
      setUserData(updatedData);
    }
  };

  const deleteUserData = (selectedUserId) => {
    const userLeft = userData.filter((user) => user.id !== selectedUserId);
    setUserData(userLeft);
    setTableData(userLeft);
  };

  const deleteUserSelected = () => {
    const updatedData = userData.filter((user) => !user.isChecked);
    setUserData(updatedData);
  };

  const performSearch = (searchQuery) => {
    const filteredResults = userData.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setUserData(filteredResults);
    setPage(1);
    if (searchQuery === "") {
      setUserData(tableData);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setEditId("");
  };

  const handleInput = (e, current) => {
    const { name, value } = e.target;
    const updatedData = userData.map((user) =>
      user.id === current.id ? { ...user, [name]: value } : user
    );
    setUserData(updatedData);
  };

  const renderEditableRow = (current) => (
    <TableRow key={current.id} sx={{ width: "90%", margin: "auto" }}>
      <TableCell align="right">
        <TextField
          type="text"
          name="name"
          value={current.name}
          label="Name"
          variant="outlined"
          onChange={(e) => handleInput(e, current)}
        />
      </TableCell>
      <TableCell align="right">
        <TextField
          type="text"
          name="email"
          value={current.email}
          label="Email"
          variant="outlined"
          onChange={(e) => handleInput(e, current)}
        />
      </TableCell>
      <TableCell align="right">
        <TextField
          type="text"
          name="role"
          value={current.role}
          label="Role"
          variant="outlined"
          onChange={(e) => handleInput(e, current)}
        />
      </TableCell>
      <TableCell align="right">
        <IconButton aria-label="edit" type="submit" size="small">
          <SaveAsIcon size="small" />
        </IconButton>
        <IconButton aria-label="edit" type="submit" size="small">
          <CloseIcon color="primary" size="small" />
        </IconButton>
      </TableCell>
    </TableRow>
  );

  const setPageChange = (newPage) => {
    setPage(newPage);
  };

  const getPaginatedData = () => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return userData.slice(startIndex, endIndex);
  };

  return (
    <>
      <Search searchfun={performSearch} />
      <form onSubmit={handleUpdate}>
        <TableContainer>
          <Table sx={{ width: "90%", margin: "auto" }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow className="header">
                <TableCell align="left" sx={{ textDecorationThickness: 5 }}>
                  <Checkbox
                    name="allselect"
                    checked={userData.some((user) => user.isChecked)}
                    onChange={handleCheckboxChange}
                  />
                </TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Role</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getPaginatedData().map((user) =>
                user.id === editId ? (
                  renderEditableRow(user)
                ) : (
                  <TableRow key={user.id} className={user?.isChecked?"backgroundcolor":""}>
                    <TableCell align="left" component="th" scope="row">
                      <Checkbox
                        onChange={handleCheckboxChange}
                        checked={user?.isChecked || false}
                        name={user.id}
                      />
                    </TableCell>
                    <TableCell align="left">{user.name}</TableCell>
                    <TableCell align="left">{user.email}</TableCell>
                    <TableCell align="left">{user.role}</TableCell>
                    <TableCell align="left">
                      <IconButton
                        aria-label="edit"
                        onClick={() => setEditId(user.id)}
                        size="small"
                      >
                        <EditIcon size="small" />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={() => deleteUserData(user.id)}
                        size="small"
                      >
                        <DeleteIcon color="primary" size="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </form>
      <Stack direction="row" justifyContent="space-evenly" sx={{ marginTop: '10px' }}>
        <Button variant="contained" onClick={deleteUserSelected}>
          Delete Selected
        </Button>
        <AppPagination
          setPage={setPageChange}
          itemsPerPage={itemsPerPage}
          userLength={userData.length}
          userData={userData}
        />
      </Stack>
    </>
  );
};

export default TableData;
