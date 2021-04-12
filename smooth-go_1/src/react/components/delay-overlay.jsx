import {Button, Slider, TextField} from "@material-ui/core";
import {throttle} from "lodash";
import PositionContainer from "react/components/position-container";
import React, {useState} from "react";

import {getRedirectDestination} from "configuration";

const maxZIndex = 9999;

//this doesnt load if isVisible is false then reloaded as true
export default function DelayOverlay({setParentDelaySeconds, isVisible}) {
  const maxDelayMinutes = 60;
  const [delaySeconds, setDelaySeconds] = useState(0);

  const [showDelayControls, setShowDelayControls] = useState(false);
  function handleDelayInput(event) {
    const minutes = Math.round(Number(event.target.value));

    const seconds = getSecondsFromMinutes(minutes);
    setAllDelaySeconds(getSecondsFromMinutes(minutes));
  }
  function getSecondsFromMinutes(minutes) {
    if (minutes < 0) {
      return 0;
    }
    return minutes * 60;
  }

  function setAllDelaySeconds(delaySeconds) {
    setDelaySeconds(delaySeconds);
    setParentDelaySeconds(delaySeconds);
  }

  function handleSliderChange(event, newValue) {
    const sliderPercent = newValue / 100;
    const minutes = Math.round(maxDelayMinutes * sliderPercent);
    const seconds = getSecondsFromMinutes(minutes);
    setAllDelaySeconds(seconds);
  }
  const sliderMarks = [
    {
      value: 0,
      label: "0 min",
    },
    {
      value: 100,
      label: "60 ",
    },
  ];
  function normalizeSlider({min = 0, max, currentValue}) {
    const currentMinute = currentValue / 60;
    const percentToMax = currentMinute / max;
    const sliderValue = Math.round(percentToMax * 100);
    return sliderValue;
  }

  return (
    <>
      {/* <div style={{display: "block"}}> */}
      {/*   <Slider */}
      {/*     value={normalizeSlider({max: 60, currentValue: delaySeconds})} */}
      {/*     marks={sliderMarks} */}
      {/*     /\* valueLabelDisplay="on" *\/ */}
      {/*     onChange={throttle(handleSliderChange, 250)} */}
      {/*     aria-labelledby="Change Redirect Delay Slider" */}
      {/*   /> */}
      {/*   <Button */}
      {/*     style={{verticalAlign: "top"}} */}
      {/*     onClick={() => setShowDelayControls((isShowing) => !isShowing)} */}
      {/*     variant="contained" */}
      {/*     color="primary" */}
      {/*   > */}
      {/*     Show Delay Controls */}
      {/*   </Button> */}
      {/* </div> */}
      <div style={{background: "white", width: "70%"}}>
        <TextField
          id="standard-number"
          label="Delay Minutes"
          type="number"
          variant="filled"
          onChange={handleDelayInput}
          /* value={delaySeconds / 60} */
          style={{width: "100%"}}
        />
      </div>
      {showDelayControls ? (
        <>
          <div style={{display: "inline-block", background: "white"}}>
            <p>Delay Controls</p>
          </div>

          <Button
            /* style={{verticalAlign: "top"}} */
            onClick={() => setAllDelaySeconds(30 * 60)}
            variant="contained"
            color="primary"
          >
            30 min
          </Button>
          <Button
            /* style={{verticalAlign: "top"}} */
            onClick={() => setAllDelaySeconds(15 * 60)}
            variant="contained"
            color="primary"
          >
            15 min
          </Button>
          <Button
            /* style={{verticalAlign: "top"}} */
            onClick={() => setAllDelaySeconds(5 * 60)}
            variant="contained"
            color="primary"
          >
            5 min
          </Button>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

function gotoPodcasts() {
  window.open("http://pandora.com", "_blank");
}
function gotoMusic() {
  window.open("https://pandora.com", "_blank");
}

function gotoSettings() {
  window.open("http://settings.com");
}

function redirectToCalmingPlace() {
  window.location.href = getRedirectDestination();
}
function gotoPodcast() {
  window.open(getRedirectDestination(), "_blank");
}
