import {Button, Snackbar, TextField} from "@material-ui/core";
import {useQuery, useMutation, ReactQueryCacheProvider} from "react-query";
import {v4 as uuid} from "uuid";
import MuiAlert from "@material-ui/lab/Alert";
import React, {useEffect, useState} from "react";

import {ItemFetcher} from "./async-tools";

import {
  fetchButtonConfigGroup,
  saveButtonConfigGroup,
  saveSettings,
  fetchSettings,
} from "./api/settings-storage.js";
import SettingsPage from "./settings-page";

const defaultLinkButtonConfigGroup = [
  {
    name: "Open Google",
    links: ["https://google.com"],
  },

  {
    name: "Open Book",
    links: ["https://read.amazon.com"],
  },

  {
    name: "Open Music",
    links: ["https://pandora.com", "https://spotify.com"],
  },

  {
    name: "Open Podcasts",
    links: ["https://radiopublic.com/99pi"],
  },
];

// saveButtonConfigGroup(defaultLinkButtonConfigGroup);

export default function SettingsPageStorageController({
  fetchItems = fetchSettings,
  saveItems = saveSettings,
}) {
  const settings = useQuery("smoothGo_Settings", fetchItems);
  const asyncButtonConfigGroup = settings.linkButtonNamesAndLinks;
  const [mutateSaveConfigGroup, asyncSave] = useMutation(saveItems);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  const [configToSave, setConfigToSave] = useState(null);
  const isAllSettingsLoaded = true; // musicURL !== null && imageURL !== null;

  function handleSave(allSettings) {
    setConfigToSave(allSettings);
  }

  useEffect(() => {
    if (configToSave === null) return;

    mutateSaveConfigGroup(configToSave);
  }, [configToSave]);

  return (
    <>
      <ItemFetcher
        fetchItems={fetchSettings}
        renderError={(errorMessage) => (
          <SnackAlert severity="error">
            Load Failed <br />
            {errorMessage}
          </SnackAlert>
        )}
        renderLoading={() => <p>Loading Setttings...</p>}
        renderSuccess={(settingsResult) => {
          return (
            <SettingsPage
              saveSettings={handleSave}
              linkButtonConfigGroup={settingsResult.linkButtonConfigGroup}
              lowValueURLTags={settingsResult.lowValueURLTags}
              saveStatus={saveStatus}
            />
          );
        }}
      />

      {asyncSave.isSuccess && (
        <>
          <SnackAlert severity="success">Save successful</SnackAlert>
        </>
      )}
      {asyncSave.isError && (
        <>
          <SnackAlert severity="error">
            Save failed : | <br />
            {asyncSave.error.message}
          </SnackAlert>
        </>
      )}
    </>
  );
}

function SnackAlert({severity, children, autoHideDuration = 4000}) {
  const [isOpen, setIsOpen] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsOpen(false);
    }, autoHideDuration);
  }, []);
  return (
    <Snackbar open={isOpen} autoHideDuration={autoHideDuration}>
      <MuiAlert
        severity="success"
        onClose={() => {
          setIsOpen(false);
        }}
        elevation={6}
        variant="filled"
      >
        {children}
      </MuiAlert>
    </Snackbar>
  );
}

export function TextInput({originalValue = "", label, onValueChange}) {
  // function handleLinkEdit(newLinkValue) {
  //   setLinks(newLinkValue.split(","));
  // }

  return (
    <>
      <TextField
        /*an id is required to get by label in tests*/
        id={`input-for-${label}`}
        label={label}
        fullWidth={true}
        onChange={(event) => {
          onValueChange(event.target.value);
        }}
        defaultValue={originalValue}
        variant="outlined"
      />
    </>
  );
}
function objectPropertyReducer(state, action) {
  switch (action.type) {
    case "SET_PROPERTY_WITH_KEY":
      const newState = state.map((item) => {
        if (item.key === action.key) {
          const objectToChange = item.value;
          const newObject = {
            ...objectToChange,
            [action.property]: action.newValue,
          };
          return {key: item.key, value: newObject};
        } else {
          return item;
        }
      });
      return newState;
    default:
      return state;
  }
}
