import {Button} from "@material-ui/core";
import {Timer} from "@material-ui/icons";
import React, {useState, useEffect} from "react";

export function CountDown({
  isEnabledInitially,
  initialSeconds,
  getOutputFromSeconds,
  onTimerEnd = () => {},
}) {
  const [isShown, setIsShown] = useState(false);
  const [isEnabled, setIsEnabled] = useState(isEnabledInitially);
  const [currentSeconds, setCurrentSeconds] = useState(initialSeconds);
  const handleTimerTick = () => {
    if (!isEnabled) {
      return;
    }
    setCurrentSeconds((previousSeconds) => {
      if (previousSeconds === 0) {
        setIsEnabled(false);
        onTimerEnd();
        return 0;
      }
      return previousSeconds - 1;
    });
  };
  useEffect(() => {
    let clockId = setInterval(handleTimerTick, 1000);
    return () => {
      clearInterval(clockId);
    };
  }, [handleTimerTick]);
  return (
    <>
      <Button
        onClick={() => setIsShown((isShown) => !isShown)}
        variant="contained"
        color="primary"
      >
        {getOutputFromSeconds(currentSeconds)}
      </Button>
    </>
  );
}

function errorCheckRangeValues({upperBound, middle, lowerBound, context}) {
  if (lowerBound > upperBound) {
    throw `Lower bound ${lowerBound} is greater than upper bound ${upperBound} context ${context}`;
  }
  if (lowerBound > middle || upperBound < middle) {
    throw `Middle ${middle} is not between lowerBound ${lowerBound} and upperBound ${upperBound}  context ${context}`;
  }
}

// function UpDownTimer({
//   upperBoundSeconds,
//   lowerBoundSeconds,
//   initialSeconds,
//   handleCountUpStart,
//   handleCountDownStart,
// }) {
//   //lowerBoundSeconds can't be 0 or it wil temporarily go to -1 and break
//   errorCheckRangeValues({
//     upperBound: upperBoundSeconds,
//     middle: initialSeconds,
//     lowerBound: lowerBoundSeconds,
//     context: "Up down timer",
//   });
//   const initialTime = initialSeconds * 1000;
//   const [status, setStatus] = useState("");

//   const startDirection =
//     lowerBoundSeconds == initialSeconds ? "forward" : "backward";
//   return (
//     <Timer
//       initialTime={initialTime}
//       direction={startDirection}
//       startImmediately={false}
//       //sometimes it skips numbers when  timeToUpdate>=1000
//       timeToUpdate={800}
//     >
//       {({start, resume, pause, stop, reset, setCheckpoints, setDirection}) => {
//         setCheckpoints([
//           {
//             time: lowerBoundSeconds * 1000,
//             callback: () => {
//               setDirection("forward");
//               handleCountUpStart(setStatus);

//               console.log("hi");
//             },
//           },
//           {
//             time: upperBoundSeconds * 1000,
//             callback: () => {
//               setDirection("backward");
//               handleCountDownStart(setStatus);

//               console.log("bye");
//             },
//           },
//         ]);

//         return (
//           <>
//             <button onClick={start} style={{color: "gray"}}>
//               Start
//             </button>
//             <Timer.Seconds />
//             Status: {status}
//           </>
//         );
//       }}
//     </Timer>
//   );
// }

// function Countdown({seconds}) {
//   const milliseconds = seconds * 1000;
//   return (
//     <>
//       <Timer
//         initialTime={milliseconds}
//         direction={"backward"}
//         startImmediately={false}
//         timeToUpdate={800} //sometimes it skips numbers when  timeToUpdate>=1000
//       >
//         {({start, resume, pause, stop, reset, timerState}) => (
//           <React.Fragment>
//             <div>
//               <Timer.Seconds /> seconds
//             </div>
//             <div>
//               <button onClick={start} style={{color: "blue"}}>
//                 Start
//               </button>
//             </div>
//           </React.Fragment>
//         )}
//       </Timer>
//     </>
//   );
// }
