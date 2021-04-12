/*global chrome*/

chrome.browserAction.onClicked.addListener(function() {
  chrome.tabs.create({url: chrome.runtime.getURL("settings/index.html")});
});
