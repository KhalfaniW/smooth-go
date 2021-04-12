/*global chrome*/
//seperate so i can mock it for a test
export function redirectTo(URL) {
  window.location.href = URL;
}
export function openInNewTab(URL) {
  window.open(URL);
}

export function openSettings() {
  chrome.runtime.sendMessage({action: "OPEN_SETTINGS", payload: {}}, function(
    response,
  ) {});
}
