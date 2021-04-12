import React from "react";
export function renderElementIf(boolean, element) {
  if (boolean) {
    return element;
  } else {
    return <></>;
  }
}
