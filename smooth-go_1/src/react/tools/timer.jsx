import {Button} from "@material-ui/core";
import Countdown from "react-countdown";
import React, {useState, useRef} from "react";

export function CancelableCountdown({
  seconds,
  renderView = (seconds, cancel) => {
    return seconds;
  },
  onCancel = () => {},
  onComplete,
}) {
  const autoRedirectCountDownRef = useRef(null);
  const [isCanceled, setIsCanceled] = useState(false);
  function getSecondsInFuture(seconds) {
    return Date.now() + seconds * 1000;
  }
  function cancel() {
    autoRedirectCountDownRef.current.getApi().pause();
    setIsCanceled(true);
    return;
  }

  return (
    <div>
      {isCanceled ? (
        <></>
      ) : (
        <>
          <Countdown
            date={getSecondsInFuture(seconds)}
            precision={2}
            intervalDelay={400}
            renderer={(props) => {
              const totalTimeLeftSeconds = Math.round(props.total / 1000);

              return <>{renderView(totalTimeLeftSeconds, cancel)}</>;
            }}
            ref={autoRedirectCountDownRef}
            onComplete={onComplete}
          />
        </>
      )}
    </div>
  );
}
