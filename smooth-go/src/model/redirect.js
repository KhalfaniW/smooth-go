export function redirectToAfterWaiting({url, seconds}) {
  return setTimeout(() => {
    window.location.href = url;
  }, seconds * 1000);
}

//showRedirctSuccess
