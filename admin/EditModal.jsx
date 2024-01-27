import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import AutoFixNormalIcon from "@mui/icons-material/AutoFixNormal";
import SaveIcon from "@mui/icons-material/Save";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import IconButton from "@mui/material/IconButton";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function EditModalComponent(props) {
  const { item, setItem, handleSubmit } = props;

  const handleChange = (e) => {
    const { id, value } = e.target;
    setItem((prevItem) => ({
      ...prevItem,
      [id]: value,
    }));
  };

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box id="boxCards" className="inputCards" sx={style}>
        <Typography
          id="liners"
          style={{ width: "auto", textAlign: "center", height: "27px" }}
          variant="h6"
          component="h2">
          <b>Edit Client : </b>
          <AutoFixNormalIcon />
        </Typography>
        <TextField
          type="text"
          id="firstName"
          name="firstName"
          label="firstName"
          variant="outlined"
          value={item?.firstName}
          onChange={handleChange}
        />
        <TextField
          type="text"
          id="lastName"
          name="lastName"
          label="lastName"
          variant="outlined"
          value={item.lastName}
          onChange={handleChange}
        />
        <TextField
          type="number"
          id="phone"
          name="phone"
          label="phone"
          variant="outlined"
          value={item.phone}
          onChange={handleChange}
        />
        <TextField
          type="email"
          id="email"
          name="email"
          label="email"
          variant="outlined"
          value={item.email}
          onChange={handleChange}
        />

        <TextField
          id="imgUrl"
          name="imgUrl"
          label="imgUrl"
          variant="outlined"
          value={item.imgUrl}
          onChange={handleChange}
        />
        <TextField
          id="imgAlt"
          name="imgAlt"
          label="imgAlt"
          variant="outlined"
          value={item.imgAlt}
          onChange={handleChange}
        />
        <TextField
          id="state"
          name="state"
          label="state"
          variant="outlined"
          value={item.state}
          onChange={handleChange}
        />
        <TextField
          id="country"
          name="country"
          label="country"
          variant="outlined"
          value={item.country}
          onChange={handleChange}
        />
        <TextField
          id="city"
          name="city"
          label="city"
          variant="outlined"
          value={item.city}
          onChange={handleChange}
        />
        <TextField
          id="street"
          name="street"
          label="street"
          variant="outlined"
          value={item.street}
          onChange={handleChange}
        />
        <TextField
          type="number"
          id="houseNumber"
          name="houseNumber"
          label="houseNumber"
          variant="outlined"
          value={item.houseNumber}
          onChange={handleChange}
        />
        <TextField
          id="zip"
          name="zip"
          label="zip"
          variant="outlined"
          value={item.zip}
          onChange={handleChange}
        />
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id="demo-simple-select-autowidth-label">
            Business
          </InputLabel>
          <Select
            id="business"
            name="business"
            value={item.business}
            onChange={(event) =>
              setItem({ ...item, business: event.target.value })
            }
            autoWidth
            label="business">
            <MenuItem value={true}>Business</MenuItem>
            <MenuItem value={false}>Not Business</MenuItem>
          </Select>
        </FormControl>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <IconButton
            id="btnCreateAndPress"
            style={{ width: "auto" }}
            onClick={handleSubmit}>
            <SaveIcon />
          </IconButton>
        </Typography>
      </Box>
    </Modal>
  );
}
