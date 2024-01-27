import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import { GeneralContext } from "../App";
import { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import { useMemo } from "react";
import Joi from "joi";
import { ModalCreateEdit } from "./ModalCreateEdit";
import Box from "@mui/material/Box";

export default function ModalCardsEdit({ editProp, theIDcard }) {
  const { snackbar, setIsLoader } = useContext(GeneralContext);
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

  const initialValues = useMemo(
    () => ({
      title: theIDcard.title || "",
      description: theIDcard.description || "",
      subtitle: theIDcard.subtitle || "",
      phone: theIDcard.phone || "",
      email: theIDcard.email || "",
      web: theIDcard.web || "",
      imgUrl: theIDcard.imgUrl || "",
      imgAlt: theIDcard.imgAlt || "",
      state: theIDcard.state || "",
      country: theIDcard.country || "",
      city: theIDcard.city || "",
      street: theIDcard.street || "",
      houseNumber: theIDcard.houseNumber || "",
      zip: theIDcard.zip || "",
    }),
    [theIDcard]
  );

  const [item, setItem] = useState(initialValues);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { id } = useParams();

  useEffect(() => {
    if (id === "new") {
      setItem(initialValues);
    } else if (id !== undefined) {
      setIsLoader(true);
      fetch(
        `https://api.shipap.co.il/business/cards/${id}?token=88d63d7d-5fb8-11ee-aae9-14dda9d4a5f0`,
        {
          credentials: "include",
          method: "GET",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setItem(data);
          setIsLoader(false);
        });
    }
  }, [id, setIsLoader, initialValues]);

  const handleInput = (e) => {
    const { id, value } = e.target;
    const obj = { ...item, [id]: value };
    setItem(obj);

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

  const save = (e) => {
    e.preventDefault();
    const { error } = schema.validate(item);
    if (error) {
      snackbar(error.details[0].message);
      return;
    }
    fetch(
      `https://api.shipap.co.il/business/cards/${editProp}?token=88d63d7d-5fb8-11ee-aae9-14dda9d4a5f0`,
      {
        credentials: "include",
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(item),
      }
    ).then(() => {
      handleClose();
      snackbar("the card is updated success !");
    });
  };

  return (
    <Box>
      <IconButton
        id="btnCreateAndPress"
        style={{ width: "auto" }}
        onClick={handleOpen}
      >
        <EditIcon />
      </IconButton>
      <ModalCreateEdit
        open={open}
        handleClose={handleClose}
        item={item}
        errors={errors}
        handleInput={handleInput}
        save={save}
      />
    </Box>
  );
}
