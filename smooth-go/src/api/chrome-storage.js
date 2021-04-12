/*global chrome*/
import {SETTINGS_SAVE_KEY, defaultSettings} from "../configuration.js";

export async function saveSettings(value) {
  console.log("saveSettings", value);
  await saveStoragePromise(SETTINGS_SAVE_KEY, value);
}
export async function fetchSettings() {
  console.log("fecthSettings");
  if (await fetchIsItemValueNotSet(SETTINGS_SAVE_KEY)) {
    console.log("they don't exist");
    await saveSettings(defaultSettings);
    return defaultSettings;
  }
  let settings = await fetchItem(SETTINGS_SAVE_KEY);
  console.log("they do exist", settings);

  return settings;
}

function fetchItem(key) {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get([key], function(result) {
      resolve(result[key]);
    });
  });
}
function saveStoragePromise(key, value) {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.set({[key]: value}, function() {
      resolve();
    });
  });
}

async function fetchIsItemValueNotSet(key) {
  let maybeValue = await fetchItem(key);

  return typeof maybeValue === "undefined";
}
