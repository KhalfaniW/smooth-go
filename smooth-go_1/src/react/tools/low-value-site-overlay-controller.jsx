import {ItemFetcherWithAlerts} from "react/components/async-tools";
import {throttle} from "lodash";
import {useQuery, useMutation, ReactQueryCacheProvider} from "react-query";
import {useScrollYPosition} from "react-use-scroll-position";
import ButtonGroup from "react/tools/button-group";
import CalmPlaylist from "react/components/calm-playlist";
import LowValueSiteOverlay from "react/tools/low-value-site-overlay";
import MeditationTimer from "react/components/meditation-timer";
import MuiAlert from "@material-ui/lab/Alert";
import OverlayedButton from "react/components/overlay-button";
import React, {useState, useEffect} from "react";
import {Button, Snackbar, TextField} from "@material-ui/core";

import {usePrevious} from "ahooks";

import {fetchSettings} from "api/settings-storage.js";
import {
  defaultMaxScrollLength,
  getRedirectDestination,
  getLinkButtonConfigGroup,
} from "configuration";

const maxZIndex = 9999;
const minutesBeforeCheckingScroll = 5;
const timeBeforeCheckingScroll = minutesBeforeCheckingScroll * 60 * 1000;

export default function LowValueSiteOverlayController() {
  const [isClosed, setIsClosed] = useState(false);
  const isAnyElementFullScreen = useFullScreenVideoChecker();

  const [isButtonGroupVisible, setIsButtonGroupVisible] = useState(false);

  const [shouldOpenBecauseOfDelay, setShouldOpenBecauseOfDelay] = useState(
    false,
  );
  const [hasOpenedBecuaseOfScroll, setHasOpenedBecuaseOfScroll] = useState(
    false,
  );
  const [shouldAlert, setShouldAlert] = useState(false);
  const previousShouldAlert = usePrevious(shouldAlert);
  const [settings, setSettings] = useState(null);
  const [isOpenedBecauseOfClick, setIsOpenedBecauseOfClick] = useState(false);
  const [shouldCheckScroll, setShouldCheckScroll] = useState(false);
  useEffect(() => {
    setTimeout(() => setShouldCheckScroll(true), timeBeforeCheckingScroll);
  }, []);

  if (isClosed) {
    return <></>;
  }

  if (settings === null) {
    return (
      <>
        <ItemFetcherWithAlerts
          fetchItems={fetchSettings}
          onSuccess={(settingsResult) => {
            setSettings(settingsResult);
          }}
          shouldAlertSuccess={true}
        />
      </>
    );
  }
  const {linkButtonConfigGroup, lowValueURLTags} = settings;
  if (!getAreTagsInSite(lowValueURLTags, window.location.href)) {
    return <></>;
  }
  if (isAnyElementFullScreen) {
    return <></>;
  }
  let maybeAlert = <></>;

  if (shouldAlert && !previousShouldAlert && isButtonGroupVisible) {
    maybeAlert = (
      <ScrollAlert
        message={`Scroll checkpoint reached after ${minutesBeforeCheckingScroll} minutes on page: Opening buttons`}
      />
    );
  }

  return (
    <>
      {isButtonGroupVisible ? (
        <>
          <ButtonGroup
            isAutoRedirectEnabled={isOpenedBecauseOfClick}
            closeExtension={() => setIsClosed(true)}
            linkButtonConfigGroup={linkButtonConfigGroup}
          />
          {maybeAlert}
        </>
      ) : (
        <></>
      )}
      <div
        style={{
          bottom: 0,
          right: 0,
          /* position: "absolute", */
          zIndex: maxZIndex,
          position: "fixed",
        }}
      >
        <OverlayedButton
          onClick={() => {
            setIsButtonGroupVisible((isShowing) => !isShowing);
            setIsOpenedBecauseOfClick(true);
          }}
        >
          {isButtonGroupVisible ? "Hide All" : "Show All"}
        </OverlayedButton>
      </div>

      {/* {!shouldAlert && shouldCheckScroll ? ( */}
      {/*   <ScrollChecker */}
      {/*     onScrollLimitReached={() => { */}
      {/*       setIsButtonGroupVisible(true); */}
      {/*       setShouldAlert(true); */}
      {/*     }} */}
      {/*   /> */}
      {/* ) : ( */}
      {/*   <> </> */}
      {/* )} */}
    </>
  );
}
function ScrollAlert({message}) {
  const [open, setOpen] = React.useState(true);
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setOpen(false);
      }, 4100);
    }
  }, [open]);

  return (
    <>
      <Snackbar open={open}>
        <div style={{pointerEvents: "auto", fontSize: "small"}}>
          <MuiAlert
            elevation={6}
            variant="filled"
            severity="info"
            style={{fontSize: "medium"}}
            onClose={() => {
              setOpen(false);
            }}
          >
            {message}
          </MuiAlert>
        </div>
      </Snackbar>
    </>
  );
}

function ScrollChecker({
  maxScrollLength = defaultMaxScrollLength,
  onScrollLimitReached,
}) {
  const scrollYPosition = useScrollYPosition();

  const [shouldOpenBecauseOfScroll, setShouldOpenBecauseOfScroll] = useState(
    true,
  );
  useEffect(() => {
    if (shouldOpenBecauseOfScroll) {
      if (scrollYPosition > maxScrollLength) {
        onScrollLimitReached();
      }
    }
  }, [scrollYPosition]);
  return <></>;
}

function useFullScreenVideoChecker() {
  const [isAnyElementFullScreen, setIsAVideoFullScreen] = useState(false);

  function checkFullScreen() {
    if (document.fullscreenElement) {
      setIsAVideoFullScreen(true);
    } else {
      setIsAVideoFullScreen(false);
    }
  }

  useEffect(() => {
    window.addEventListener("fullscreenchange", checkFullScreen);
    return () => {
      window.removeEventListener("fullscreenchange", checkFullScreen);
    };
  }, []);
  return isAnyElementFullScreen;
}
function getAreTagsInSite(URLTags, currentSite) {
  const isSiteNameInUrlGroup = URLTags.map((partialSite) => {
    return currentSite.includes(partialSite);
  });
  return isSiteNameInUrlGroup.includes(true);
}
