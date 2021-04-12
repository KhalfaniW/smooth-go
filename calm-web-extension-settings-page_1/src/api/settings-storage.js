import * as mockStorage from "./mock-storage.js";
import * as chromeStorage from "./chrome-storage.js";

import {ENVIRONMENT} from "../configuration.js";
let environmentSaveSettings;
let environmentFetchSettings;

switch (ENVIRONMENT) {
  case "MOCK":
    environmentSaveSettings = mockStorage.saveSettings;
    environmentFetchSettings = mockStorage.fetchSettings;

    break;

  case "CHROME":
    environmentSaveSettings = chromeStorage.saveSettings;
    environmentFetchSettings = chromeStorage.fetchSettings;

    break;
  default:
}
export const saveSettings = environmentSaveSettings;
export const fetchSettings = environmentFetchSettings;
