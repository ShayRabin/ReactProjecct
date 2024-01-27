import React from "react";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import "../styles/CreateCards.css";
import { useContext } from "react";
import { GeneralContext } from "../App";
import IconButton from "@mui/material/IconButton";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "../styles/CreateCards.css";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import Joi from "joi";
import CreateModalCardForm from "./CreateMadeCardForm";

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

export default function CreateCards() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [errors, setErrors] = useState({});
  const [, setIsFormValid] = useState(false);

  const schema = Joi.object({
    title: Joi.string().min(4).required().messages({
      "string.empty": "Title is Required",
      "string.min": "Title must be at least 4 length long",
    }),
    description: Joi.string().min(5).required().messages({
      "string.empty": "description Required",
      "string.min": "description must be at least 5 length long",
    }),
    subtitle: Joi.string().min(5).required().messages({
      "string.empty": "subtitle Required",
      "string.min": "subtitle must be at least 5 length long",
    }),
    phone: Joi.string()
      .max(10)
      .regex(/^[0-9]{10}$/)
      .messages({
        "string.empty": "Phone Number is Required",
        "string.pattern.base":
          "Phone number must have 10 digits,its need to be only numbers",
        "string.max": "Phone number must not exceed 10 digits",
      }),
    email: Joi.string().email({ tlds: false }).required().messages({
      "string.empty": "Email Address is required",
      "string.email": "Email must be a valid email address",
    }),
    web: Joi.string().min(8).max(32).required().messages({
      "string.empty": " web is required ",
      "string.min": "web must be at least 8 characters long",
      "string.max": "web must not exceed 32 characters",
      "string.pattern.base":
        "web must contain at least ''www'' in the start of the link ",
    }),
    imgUrl: Joi.string().required().messages({
      "string.empty": "Image Link is Required",
    }),
    imgAlt: Joi.string().required().messages({
      "string.empty": "Image Description is Required",
    }),
    state: Joi.string().required().messages({
      "string.empty": "State is Required",
    }),
    country: Joi.string().required().messages({
      "string.empty": "County is Required",
    }),
    street: Joi.string().required().messages({
      "string.empty": "Street is Required",
    }),
    city: Joi.string().required().messages({
      "string.empty": "City is Required",
    }),
    houseNumber: Joi.string().required().messages({
      "string.empty": "House Number is Required",
    }),
    zip: Joi.string().required().messages({
      "string.empty": "Zip is Required",
    }),
  });

  const { snackbar } = useContext(GeneralContext);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subtitle: "",
    phone: "",
    email: "",
    web: "",
    imgUrl: "",
    imgAlt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  });

  const handleInput = (e) => {
    const { id, value } = e.target;
    const obj = { ...formData, [id]: value };
    setFormData(obj);

    const validate = schema.validate(obj, { abortEarly: false });
    const tempErrors = { ...errors };
    delete tempErrors[id];

    if (validate.error) {
      const item = validate.error.details.find((e) => e.context.key === id);

      if (item) {
        tempErrors[id] = item.message;
      }
    }
    setIsFormValid(!validate.error);
    setErrors(tempErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    debugger
    const { error } = schema.validate(formData);
    if (error) {
      snackbar(error.details[0].message);
      return;
    }
    fetch(
      `https://api.shipap.co.il/business/cards?token=88d63d7d-5fb8-11ee-aae9-14dda9d4a5f0`,
      {
        credentials: "include",
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(formData),
      }
    ).then((data) => {
      setFormData(data);
      handleClose();
      snackbar("the card was created successfully !");
    });
  };

  return (
    <Box>
      <IconButton
        id="btnCreateAndPress"
        onClick={handleOpen}
        style={{ width: "auto" }}
      >
        <LibraryAddIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box id="boxCards" className="inputCards" sx={style}>
          <Typography
            id="liners"
            style={{ width: "auto", textAlign: "center", height: "27px" }}
            variant="h6"
            component="h2"
          >
            <b>Create Card </b>
            <NoteAddIcon />
          </Typography>
          <CreateModalCardForm
            formData={formData}
            handleInput={handleInput}
            errors={errors}
            handleSubmit={handleSubmit}
          />
        </Box>
      </Modal>
    </Box>
  );
}
