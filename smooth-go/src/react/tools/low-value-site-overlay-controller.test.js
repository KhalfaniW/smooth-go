import React from "react";
import {render, act} from "@testing-library/react";
import LowValueSiteOverlayController from "./low-value-site-overlay-controller";
import {shallow, mount} from "enzyme";

import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import * as scrollChecker from "model/scroll-checker";

configure({adapter: new Adapter()});

const sampleButtonText = "Open Music";
function expectOtherSettingsToBeDisabled(queryByText) {
  expect(queryByText(sampleButtonText)).toBeNull();
}
function expectOtherSettingsToBeEnabled(getByText) {
  expect(getByText(sampleButtonText)).toBeInTheDocument();
}

test("LowValueSiteOverlayController shows button to toggle everything ", () => {
  const {getByText} = render(
    <LowValueSiteOverlayController handleScroll={() => {}} />,
  );
  expect(getByText("Show All")).toBeInTheDocument();
});
test("shows button when scrolled to far ", () => {
  function setupScrollListener(setState, originalWindowHeight) {
    window.simulateScrollDownTooFar = () => {
      setState(true);
    };
  }
  const {getByText, queryByText} = render(
    <LowValueSiteOverlayController setupScrollListener={setupScrollListener} />,
  );
  expectOtherSettingsToBeDisabled(queryByText);
  act(() => {
    window.simulateScrollDownTooFar();
  });
  expectOtherSettingsToBeEnabled(getByText);
});

test("keep button on screen after scrolled too far and back up ", () => {
  function setupScrollListener(setState, originalWindowHeight) {
    window.simulateScrollDownTooFar = () => {
      setState(true);
    };
    window.simulateScrollBackup = () => {
      setState(false);
    };
  }
  const {getByText, queryByText} = render(
    <LowValueSiteOverlayController setupScrollListener={setupScrollListener} />,
  );
  expectOtherSettingsToBeDisabled(queryByText);
  act(() => {
    window.simulateScrollDownTooFar();
  });

  act(() => {
    window.simulateScrollBackup();
  });
  expectOtherSettingsToBeEnabled(getByText);
});
