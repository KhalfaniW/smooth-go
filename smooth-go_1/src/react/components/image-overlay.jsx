import React, {useState} from "react";
import Button from "@material-ui/core/Button";

export default function ImageOverlay({newUrl, children}) {
  return (
    <>
      <details>
        <summary>
          {/* <img src={newUrl} alt="random image overlay" /> */}
          Stuff
        </summary>
        {children}
      </details>
    </>
  );
}
