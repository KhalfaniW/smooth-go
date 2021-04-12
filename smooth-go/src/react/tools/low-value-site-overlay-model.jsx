function wait(arg) {
  return;
}
function setRedirectDelayClock() {
  function countDown() {
    setRedirectDelaySeconds((previousTime) => previousTime--);
  }
  return setInterval(countDown, 1000);
}
function disableClock(clockIntervalId) {
  clearInterval(clockIntervalId);
}
