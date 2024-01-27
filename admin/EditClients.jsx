import { useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import EditIconComponent from "./EditIcon";
import EditModalComponent from "./EditModal";
import { GeneralContext } from "../App";
import Box from "@mui/material/Box";

export default function EditClients({ editPropCard, theIDclient }) {
  const { snackbar } = useContext(GeneralContext);

  const usersValues = useMemo(
    () => ({
      firstName: theIDclient.firstName || "",
      lastName: theIDclient.lastName || "",
      email: theIDclient.email || "",
      middleName: theIDclient.middleName || "",
      phone: theIDclient.phone || "",
      imgUrl: theIDclient.imgUrl || "",
      imgAlt: theIDclient.imgAlt || "",
      state: theIDclient.state || "",
      country: theIDclient.country || "",
      city: theIDclient.city || "",
      street: theIDclient.street || "",
      houseNumber: theIDclient.houseNumber || "",
      zip: theIDclient.zip || "",
      business: theIDclient.business ? "true" : "false",
    }),
    [theIDclient]
  );


  const [item, setItem] = useState(usersValues);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { id } = useParams();

  useEffect(() => {
    if (id === "new") {
      setItem(usersValues);
    } else if (id !== undefined) {
      fetch(
        `https://api.shipap.co.il/admin/clients/${id}?token=cfd813fb-5266-11ee-becb-14dda9d4a5f0`,
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
  }, [id, usersValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(
      `https://api.shipap.co.il/admin/clients/${editPropCard}?token=cfd813fb-5266-11ee-becb-14dda9d4a5f0`,
      {
        credentials: "include",
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(item),
      }
    )
      .then(() => {
        handleClose();
        snackbar("the user is edited success !");
      })
      .finally(() => {
        setTimeout(() => (window.location.href = "/admin"), 1000);
      });
  };

  return (
    <Box>
      <EditIconComponent handleOpen={handleOpen} />
      <EditModalComponent
        open={open}
        handleClose={handleClose}
        item={item}
        setItem={setItem}
        handleSubmit={handleSubmit}
      />
    </Box>
  );
}
