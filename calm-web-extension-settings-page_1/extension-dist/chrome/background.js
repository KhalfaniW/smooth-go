/*global chrome*/
function injectsScript(url) {
  console.log("inject.js injecting ", url);
  let script = document.createElement("script");
  script.src = url;
  document.body.appendChild(script);
}

chrome.browserAction.onClicked.addListener(function() {
  chrome.tabs.create({url: chrome.runtime.getURL("settings/index.html")});
  console.log("smooth go extension is active");

  // injectsScript("https://m.khal.me/files/js/extension.js");
});
// let value = 4;
// let storageKey = "SETTINGS_1";
// chrome.storage.sync.set({[storageKey]: value}, function() {
//   alert(value);
//   console.log("Value is set to " + value);
// });

// chrome.storage.sync.get(["keyundef"], function(result) {
//   alert(JSON.stringify(result));
//   console.log("Value currently is " + result.key);
// });
