import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import React, { useContext, useState } from "react";
import { GeneralContext } from "../App";
import { useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditClients from "./EditClients";
import IconButton from "@mui/material/IconButton";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function UserManagement() {
  const { snackbar } = useContext(GeneralContext);
  useEffect(() => {
    fetch(
      `https://api.shipap.co.il/admin/clients?token=88d63d7d-5fb8-11ee-aae9-14dda9d4a5f0`,
      {
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setClients(data);
      });
  }, []);

  const [clients, setClients] = useState([]);

  const removeClient = (clientId) => {
    const confirmQuestion = window.confirm(
      "Are you sure you want to delete this client?"
    );
    if (!confirmQuestion) return;
    fetch(
      `https://api.shipap.co.il/admin/clients/${clientId}?token=88d63d7d-5fb8-11ee-aae9-14dda9d4a5f0`,
      {
        credentials: "include",
        method: "DELETE",
        headers: { "Content-type": "application/json" },
      }
    )
      .then(() => {
        setClients(clients.filter((clients) => clients.id !== clientId));
      })
      .finally(() => {
        snackbar("the client has been deleted successfully !");
        setTimeout(() => (window.location.href = "/"), 1000);
      });
  };

  return (
    <>
      {
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>first name</StyledTableCell>
                <StyledTableCell align="right">lest name</StyledTableCell>
                <StyledTableCell align="right">email</StyledTableCell>
                <StyledTableCell align="right">middleName</StyledTableCell>
                <StyledTableCell align="right">phone</StyledTableCell>
                <StyledTableCell align="right">state</StyledTableCell>
                <StyledTableCell align="right">country</StyledTableCell>
                <StyledTableCell align="right">city</StyledTableCell>
                <StyledTableCell align="right">houseNumber</StyledTableCell>
                <StyledTableCell align="right">zip</StyledTableCell>
                <StyledTableCell align="right">business</StyledTableCell>
                <StyledTableCell align="right">Picture</StyledTableCell>
                <StyledTableCell align="right">
                  <EditIcon />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <DeleteForeverIcon />
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients.map((clients) => (
                <StyledTableRow key={clients.id}>
                  <StyledTableCell component="th" scope="row">
                    {clients.firstName}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {clients.lastName}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {clients.middleName}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {clients.phone}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {clients.state}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {clients.country}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {clients.city}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {clients.street}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {clients.houseNumber}
                  </StyledTableCell>
                  <StyledTableCell align="right">{clients.zip}</StyledTableCell>
                  <StyledTableCell align="right">
                    {clients.business ? "Business" : "Not Business"}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {" "}
                    <img
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "10px",
                        objectFit: "cover",
                        boxShadow: "0px 0px 10px 0px #000000",
                      }}
                      className="imgAdmin"
                      src={clients.imgUrl}
                      alt={clients.imgAlt}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {" "}
                    <EditClients
                      editPropCard={clients.id}
                      theIDclient={clients}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <IconButton
                      id="btnCreateAndPress"
                      onClick={() => removeClient(clients.id)}
                    >
                      <DeleteForeverIcon />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      }
    </>
  );
}
