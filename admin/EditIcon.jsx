import React from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

export default function EditIconComponent(props) {
  return (
    <IconButton
      id="btnCreateAndPress"
      onClick={props.handleOpen}
      style={{ width: "auto" }}>
      <EditIcon />
    </IconButton>
  );
}
