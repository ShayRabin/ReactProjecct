import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import { useMemo } from "react";
import CardModal from "./CardModal";
import Box from "@mui/material/Box";

export default function ShowCard({ theIDcard }) {
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
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { id } = useParams();

  useEffect(() => {
    if (id === "new") {
      setItem(initialValues);
    } else if (id !== undefined) {
      fetch(
        `https://api.shipap.co.il/cards/${id}?token=88d63d7d-5fb8-11ee-aae9-14dda9d4a5f0`,
        {
          credentials: "include",
          method: "GET",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setItem(data);
        });
    }
  }, [id, initialValues]);

  return (
    <Box>
      <IconButton
        id="btnCreateAndPress"
        onClick={handleOpen}
        style={{ width: "auto" }}
      >
        <VisibilityIcon />
      </IconButton>
      <CardModal item={item} open={open} handleClose={handleClose} />
    </Box>
  );
}
