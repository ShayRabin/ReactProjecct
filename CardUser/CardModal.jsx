import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import CardMedia from "@mui/material/CardMedia";
import PreviewIcon from "@mui/icons-material/Preview";
import "../styles/CreateCards.css";

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

export default function CardModal({ item, open, handleClose }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box id="boxCards" className="inputCards" sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          <Box className="gridCard">
            <Typography
              id="liners"
              style={{ width: "auto", textAlign: "center", height: "27px" }}
              variant="h6"
              component="h2">
              <b>The Card </b>
              <PreviewIcon />
            </Typography>
            <CardMedia
              component="img"
              height="194"
              width="194"
              image={item.imgUrl}
              alt="Paella dish"
            />
          </Box>
        </Typography>
        <TextField
          id="title"
          label="title"
          variant="outlined"
          value={item?.title}
          disabled
        />
        <TextField
          id="description"
          label="description"
          variant="outlined"
          value={item?.description}
          disabled
        />
        <TextField
          id="subtitle"
          label="subtitle"
          variant="outlined"
          value={item?.subtitle}
          disabled
        />
        <TextField
          id="phone"
          label="phone"
          variant="outlined"
          value={item?.phone}
          disabled
        />
        <TextField
          id="email"
          label="email"
          variant="outlined"
          value={item?.email}
          disabled
        />
        <TextField
          id="web"
          label="web"
          variant="outlined"
          value={item?.web}
          disabled
        />
        <TextField
          id="imgUrl"
          label="imgUrl"
          variant="outlined"
          value={item?.imgUrl}
          disabled
        />
        <TextField
          id="imgAlt"
          label="imgAlt"
          variant="outlined"
          value={item?.imgAlt}
          disabled
        />
        <TextField
          id="state"
          label="state"
          variant="outlined"
          value={item?.state}
          disabled
        />
        <TextField
          id="country"
          label="country"
          variant="outlined"
          value={item?.country}
          disabled
        />
        <TextField
          id="city"
          label="city"
          variant="outlined"
          value={item?.city}
          disabled
        />
        <TextField
          id="street"
          label="street"
          variant="outlined"
          value={item?.street}
          disabled
        />
        <TextField
          id="houseNumber"
          label="houseNumber"
          variant="outlined"
          value={item?.houseNumber}
          disabled
        />
        <TextField
          id="zip"
          label="zip"
          variant="outlined"
          value={item?.zip}
          disabled
        />
        <Typography id="modal-modal-description" sx={{ mt: 2 }}></Typography>
      </Box>
    </Modal>
  );
}
