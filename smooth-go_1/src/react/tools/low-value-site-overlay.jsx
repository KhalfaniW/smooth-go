import {Button, IconButton} from "@material-ui/core";
import {CancelableCountdown} from "react/tools/timer";

import {redirectTo, openInNewTab, openSettings} from "react/tools/effects";
import {useTimer} from "react-timer-hook";
import CalmPlaylist from "react/components/calm-playlist";
import Countdown from "react-countdown";
import DelayOverlay from "react/components/delay-overlay";
import MeditationTimer from "react/components/meditation-timer";
import OverlayedButton from "react/components/overlay-button";
import React, {useEffect, useState, useRef} from "react";
import SettingsIcon from "@material-ui/icons/Settings";
import flattenChildren from "react-flatten-children";

import {v4 as uuid} from "uuid";

const maxZIndex = 9999;
export default function LowValueSiteOverlay({
  showPlaylistByDefault,
  showMeditationTimerByDefault,
  isVisible = true,
  defaultButtonIndex = 1,
}) {
  const [defaultButton, setDefaultButton] = useState(1);

  const [isRedirectedEnabled, setIsRedirectedEnabled] = useState(false);
  const [redirectDelaySeconds1, setRedirectDelaySeconds] = useState(0);
  const [delayedAction, setDelayedAction] = useState({runAction: () => {}});

  const isAnythingVisible = isVisible;

  return <></>;
}

///

//TODO replace sizing with an enum

export function RedirectStatus({remainingSeconds, nextURL = "CHANGE ME"}) {
  const getOutputFromSeconds = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `Going to ${nextURL} in ${minutes}:${remainingSeconds}`;
  };

  return <div>{getOutputFromSeconds(remainingSeconds)}</div>;
}
