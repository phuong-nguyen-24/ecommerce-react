import { IconButton, Tooltip } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DeleteModal from "./DeleteModal";
import { useState } from "react";

export default function ProductAction({id}) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Tooltip title="Delete" placement="top">
        <IconButton aria-label="Delete" onClick={handleOpen}>
          <DeleteForeverIcon />
        </IconButton>
      </Tooltip>
      <DeleteModal open={open} onClose={handleClose} id={id}/>
    </div>
  );
}
