import axios from "axios";

//TODO
//  + [ ] Error
//     + [ ] Save Error
//     + [ ] Get Data Error
//  + [ ] Confirm Saved

//dont use trailing /
const baseUrl = "https://m.khal.me/test-save";

export function getSaveLocation(variableName, value) {
  return `${baseUrl}/save?variableName=${variableName}&value=${value}`;
}

export function getGetDataLocation(variableName) {
  return `${baseUrl}/get?variableName=${variableName}`;
}

export async function saveData({variableName, value}) {
  const response = await axios.get(getSaveLocation(variableName, value));

  return response;
}

export async function fetchData({variableName}) {
  const response = await axios.get(getGetDataLocation(variableName));
  return response;
}
