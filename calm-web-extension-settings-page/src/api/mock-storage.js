import axios from "axios";

//dont use trailing /
const baseUrl = "https://m.khal.me/test-save";

const BUTTON_CONFIG_VAR_NAME = "BUTTON_CONFIG_VAR_NAME";
const SETTINGS_KEY = "SMOOTH_GO_SETTINGS";

export async function saveSettings(config) {
  await saveData({
    variableName: SETTINGS_KEY,
    value: JSON.stringify(config),
  });
}
export async function fetchSettings() {
  const smoothGoSettings = (
    await fetchData({
      variableName: SETTINGS_KEY,
    })
  ).data;

  return JSON.parse(smoothGoSettings);
}

export async function saveButtonConfigGroup(config) {
  await saveData({
    variableName: BUTTON_CONFIG_VAR_NAME,
    value: JSON.stringify(config),
  });
}
export async function fetchButtonConfigGroup() {
  const buttonConfigAsString = (
    await fetchData({
      variableName: BUTTON_CONFIG_VAR_NAME,
    })
  ).data;

  try {
    return JSON.parse(buttonConfigAsString);
  } catch (ex) {
    return null;
  }
}

export function getSaveLocation(variableName, value) {
  return `${baseUrl}/save?variableName=${variableName}&value=${value}`;
}

export function getGetDataLocation(variableName) {
  return `${baseUrl}/get?variableName=${variableName}`;
}

async function saveData({variableName, value}) {
  const response = await axios.get(getSaveLocation(variableName, value));

  return response;
}

async function fetchData({variableName}) {
  const response = await axios.get(getGetDataLocation(variableName));
  return response;
}
async function isStorageEmpty() {
  // if (typeof profile === "undefined") {}
}
