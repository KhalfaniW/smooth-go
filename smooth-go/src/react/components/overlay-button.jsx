import Button from "@material-ui/core/Button";
import React from "react";

import PositionContainer from "react/components/position-container";

const maxZIndex = 999;
export default function OverlayedButton({onClick, style = {}, children}) {
  return (
    <Button
      style={{
        fontSize: "small",
        width: "fit-content",
        pointerEvents: "auto",
        position: "relative",
        zIndex: maxZIndex,
        ...style,
      }}
      onClick={onClick}
      variant="contained"
      color="primary"
    >
      {children}
    </Button>
  );
}
