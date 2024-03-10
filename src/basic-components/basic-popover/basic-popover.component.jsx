import "./basic-popover.component.jsx";

import * as React from "react";
import Popover from "@mui/material/Popover";

export default function BasicPopover({ button, content }) {
  const [anchorElement, setAnchorElement] = React.useState(null);

  const handleClick = (event) => {
    setAnchorElement(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElement(null);
  };

  const open = Boolean(anchorElement);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <div aria-describedby={id} onClick={handleClick}>
        {button}
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorElement}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        {content}
      </Popover>
    </div>
  );
}
