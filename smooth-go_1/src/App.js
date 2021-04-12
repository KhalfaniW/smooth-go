import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import {useWindowSize} from "react-use";
import LowValueSiteOverlayController from "react/tools/low-value-site-overlay-controller";
import React from "react";
import increaseSpecificity from "jss-increase-specificity";
import preset from "jss-preset-default";
import styled from "styled-components";

import {renderElementIf} from "model/react-tools";
import jss from "jss";

import {ENVIRONMENT} from "./configuration";

const maxZIndex = 9999;
function isTesting() {
  console.log("isTesting", {ENVIRONMENT});
  return false;
}

//depend on width but don't use it
const OverlayContainer = styled.div`
  ${isTesting() ? "background-color: lightblue" : ""};
  pointer-events: none;
  position: fixed;
  z-index: ${maxZIndex};
  width: ${(props) => document.body.clientWidth}px;
  height: 100vh;
  top: 0;
  left: 0;
`;
const MockOverlay = styled.div`
  background-color: gray;
  pointer-events: auto;
  width: 100vw;
  height: 300vh;
  z-index: 1;
`;

const generateClassName = createGenerateClassName({
  seed: "Smooth_Go_seed",
});
///I need to increase specificity to avoid conflicts with webpage styles

export default function App() {
  const {width, height} = useWindowSize();

  return (
    <>
      <StylesProvider jss={jss.setup(preset()).use(increaseSpecificity())}>
        {isTesting() && <MockOverlay>Website content</MockOverlay>}

        <OverlayContainer
          generateClassName={generateClassName}
          width={width}
          id="smoothGo"
        >
          <LowValueSiteOverlayController />
        </OverlayContainer>
      </StylesProvider>
    </>
  );
}
