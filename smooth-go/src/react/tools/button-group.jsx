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
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {redirectDelaySeconds} from "configuration.js";
const maxZIndex = 9999;
const InfoPill = styled.div`
  background-color: white;
  pointer-events: auto;
  z-index: 1;
  border-radius: "10px";
`;
export default function ButtonGroup({
  isAutoRedirectEnabled,
  closeExtension,
  linkButtonConfigGroup,
}) {
  const [isRedirectQueryEnabled, setIsRedirectQueryEnabled] = useState(
    isAutoRedirectEnabled,
  );
  const autoRedirectLinkIndex = 0; //defaultButtonIndex
  function openURLInNewTab(URL) {
    //maybe add funcitonality later when able to change settings
    // openInNewTab(URL);
  }
  return (
    <Stack shouldFlatten={true}>
      <OverlayedButton
        onClick={() => {
          openSettings();
        }}
      >
        {"Settings"}
      </OverlayedButton>

      {linkButtonConfigGroup.map((linkButtonConfig, index) => {
        const redirectButton = (
          <OverlayedButton
            key={uuid()}
            style={{
              marginLeft: "auto",
            }}
            onClick={() => {
              const lastLink = linkButtonConfig.links.slice(-1);
              const allButLastLink = linkButtonConfig.links.slice(0, -1);
              allButLastLink.forEach((currentItem) => {
                openURLInNewTab(currentItem);
              });
              redirectTo(lastLink);
            }}
          >
            {linkButtonConfig.name}
          </OverlayedButton>
        );
        if (index === autoRedirectLinkIndex && isRedirectQueryEnabled) {
          return (
            <>
              <div
                key={uuid()}
                style={{
                  position: "relative",
                  textAlign: "right",
                  marginLeft: "auto",

                  zIndex: maxZIndex,
                }}
              >
                <CancelableCountdown
                  seconds={redirectDelaySeconds}
                  renderView={(seconds, cancel) => (
                    <>
                      <div>
                        {redirectButton}

                        <Card
                          style={{
                            pointerEvents: "auto",
                            width: "fit-content",
                            marginLeft: "auto",
                          }}
                        >
                          <CardContent>
                            <p style={{fontSize: "small", textAlign: "left"}}>
                              {`Selecting "${linkButtonConfig.name}" in ${seconds} seconds\n`}
                            </p>
                          </CardContent>
                        </Card>
                        <Button
                          style={{
                            fontSize: "small",
                            pointerEvents: "auto",
                            marginLeft: "auto",
                          }}
                          onClick={() => {
                            cancel();
                            setIsRedirectQueryEnabled(false);
                          }}
                          variant="contained"
                          color="secondary"
                        >
                          {"Cancel"}
                        </Button>
                      </div>
                    </>
                  )}
                  onCancel={() => {}}
                  onComplete={() => {
                    redirectTo(
                      linkButtonConfigGroup[autoRedirectLinkIndex].links[0],
                    );
                  }}
                />
              </div>
            </>
          );
        }
        return redirectButton;
      })}
      <OverlayedButton
        onClick={() => {
          closeExtension();
        }}
      >
        {"Close"}
      </OverlayedButton>
    </Stack>
  );
}
function Stack({shouldFlatten = false, style, children}) {
  const childrenToPosition = shouldFlatten
    ? flattenChildren(children)
    : children;

  return (
    <>
      <>
        <div
          style={{
            //button contianer:
            //needs to be seperated from bottom button
            display: "flex",
            flexDirection: "column",
            height: "90%",
            width: "100%",

            // space evenly
            justifyContent: "space-between",
          }}
        >
          {childrenToPosition.map((child) => {
            return (
              <div
                style={{
                  textAlign: "right",
                  display: "inline", //do not expand div (Takes up only as much width as it needs)

                  // flexBasis: `${100 / children.length - 1}%`,
                }}
                key={uuid()}
              >
                {child}
              </div>
            );
          })}
        </div>
      </>
    </>
  );
}
