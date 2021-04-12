import {Button, Snackbar} from "@material-ui/core";
import {v4 as uuid} from "uuid";
import React, {useState, useEffect, useReducer} from "react";
import TextField from "@material-ui/core/TextField";

import {fetchSettings} from "./api/chrome-storage";

import {SETTINGS_SAVE_KEY} from "./configuration";

//for mocking in test
export function getKeyFromIndex(index) {
  return uuid();
}
export default function SettingsPage({
  linkButtonConfigGroup,
  lowValueURLTags,
  saveSettings = (newLinkButtonConfigGroup) => {},
  saveStatus = null,
  //for mocking in test
  getKeyFromIndex = (index) => uuid(),
}) {
  const [currentLowValueURLTags, setLowValueURLTags] = useState(
    lowValueURLTags,
  );

  const [currentLinkButtonConfigGroup, setLinkButtonConfigGroup] = useState(
    linkButtonConfigGroup,
  );
  const allSettings = {
    linkButtonConfigGroup: currentLinkButtonConfigGroup,
    lowValueURLTags: currentLowValueURLTags,
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ListEditor
          originalList={allSettings.lowValueURLTags}
          onListChange={(newUrlTags) => {
            setLowValueURLTags(newUrlTags);
          }}
          title={"Websites where this extension is enabled"}
          labels={allSettings.lowValueURLTags.map((_, index) => {
            return `Website to enable extension on`;
          })}
        />

        <LinkButtonConfigEditor
          linkButtonConfigGroup={linkButtonConfigGroup}
          saveStatus={saveStatus}
          onListChange={(newLinkButtonConfigGroup) => {
            setLinkButtonConfigGroup(newLinkButtonConfigGroup);
          }}
          getKeyFromIndex={(index) => uuid()}
        />
        <div style={{marginTop: "4%"}}>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => {
              saveSettings(allSettings);
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </>
  );
}
function useSettingsSaver() {
  return {
    // settings,
    // saveSettings
  };
}

function LinkButtonConfigEditor({
  linkButtonConfigGroup,
  onSave = (newLinkButtonConfigGroup) => {},
  saveStatus = null,
  onListChange = () => {},
  //for mocking in test
  getKeyFromIndex = (index) => uuid(),
}) {
  const listKeys = linkButtonConfigGroup.map((_, index) => {
    return index;
  });
  const {
    removeItemByKey,
    addItemWithValue,
    updateItem,
    itemDictionary: linkButtonDictionary,
    getDictionaryValues,
  } = useDictionary(linkButtonConfigGroup);

  useEffect(() => {
    onListChange(getDictionaryValues());
  }, [linkButtonDictionary]);

  return (
    <div>
      <>
        <h1>Button Settings</h1>
        <ul
          style={{
            width: "40%",
            listStyle: "none",
            margin: "auto",
            paddingLeft: "0",
            textAlign: "center",
          }}
        >
          {linkButtonDictionary.map((itemDictionaryElement, index) => {
            return (
              <li key={itemDictionaryElement.key} style={{margin: "auto"}}>
                <div style={{marginBottom: "5%"}}>
                  <div style={{marginBottom: "1%"}}>
                    <TextInput
                      originalValue={itemDictionaryElement.value.name}
                      label={`Button ${index + 1} Name`}
                      onValueChange={(newButtonName) => {
                        updateItem({
                          key: itemDictionaryElement.key,
                          value: {
                            ...itemDictionaryElement.value,
                            name: newButtonName,
                          },
                        });
                      }}
                    />
                  </div>
                  <TextInput
                    originalValue={itemDictionaryElement.value.links[0]}
                    label={"Link to open on click"}
                    onValueChange={(newLink) => {
                      updateItem({
                        key: itemDictionaryElement.key,
                        value: {
                          ...itemDictionaryElement.value,
                          links: [newLink],
                        },
                      });
                    }}
                  />
                  <Button
                    color="secondary"
                    onClick={() => {
                      removeItemByKey(itemDictionaryElement.key);
                    }}
                  >
                    Remove
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
        <div>
          <Button
            /* style={{marginTop: "1%"}} */
            variant="contained"
            color="primary"
            onClick={() => {
              addItemWithValue({
                name: "Unamed Button",
                links: ["http://google.com"],
              });
            }}
          >
            Add Item
          </Button>
        </div>
      </>
    </div>
  );
}

function useDictionary(originalItems) {
  if (!originalItems) {
    originalItems = [];
  }
  const [itemDictionary, setItemDictionary] = useState(
    originalItems.map((item, index) => {
      return {key: getKeyFromIndex(index), value: item};
    }),
  );

  function addItemWithValue(newValue) {
    const newKey = getKeyFromIndex(itemDictionary.length);
    setItemDictionary(itemDictionary.concat({key: newKey, value: newValue}));
  }

  function removeItemByKey(keyToDelete) {
    setItemDictionary(
      itemDictionary.filter((item) => {
        return item.key !== keyToDelete;
      }),
    );
  }
  function updateItem(itemToUpdate) {
    setItemDictionary(
      itemDictionary.map((item) => {
        if (item.key === itemToUpdate.key) {
          return {key: item.key, value: itemToUpdate.value};
        }
        return item;
      }),
    );
  }
  function getDictionaryValues() {
    return itemDictionary.map((dictionaryItems) => {
      return dictionaryItems.value;
    });
  }

  return {
    addItemWithValue,
    removeItemByKey,
    updateItem,
    getDictionaryValues,
    itemDictionary,
  };
}
function ListEditor({
  originalList,
  title,
  getKeyFromIndex = (index) => uuid(),
  onListChange,
  onSave,
  labels,
  //isNotAllowingDuplicates = false,
}) {
  const {
    removeItemByKey,
    addItemWithValue,
    updateItem,
    itemDictionary,
    getDictionaryValues,
  } = useDictionary(originalList);

  // function checkBeforeEnter(dictionaryItem) {
  //   const itemsWithSameValue = itemDictionary.filter(() => {
  //     return newItem.key === _item.value;
  //   });
  //   setItemDictionary(listToAppendTo.filter(dictionaryItem.key));
  // }

  useEffect(() => {
    onListChange(getDictionaryValues());
  }, [itemDictionary]);

  return (
    <>
      <h1>{title}</h1>

      <ul
        style={{
          width: "40%",
          listStyle: "none",
          margin: "auto",
          paddingLeft: "0",
          textAlign: "center",
        }}
      >
        {itemDictionary.map((itemDictionaryElement, index) => {
          return (
            <li key={itemDictionaryElement.key} style={{margin: "auto"}}>
              <div style={{marginBottom: "1%"}}>
                <div style={{display: "flex", flexDirection: "row"}}>
                  <TextInput
                    originalValue={itemDictionaryElement.value}
                    label={labels[index]}
                    onValueChange={(newButtonName) => {
                      updateItem({
                        key: itemDictionaryElement.key,
                        value: newButtonName,
                      });
                    }}
                  />
                  <Button
                    color="secondary"
                    onClick={() => {
                      removeItemByKey(itemDictionaryElement.key);
                    }}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <div>
        <Button
          style={{marginTop: "1%"}}
          variant="contained"
          color="primary"
          onClick={() => {
            addItemWithValue("");
          }}
        >
          Add Item
        </Button>
      </div>
    </>
  );
}

export function TextInput({originalValue = "", label, onValueChange}) {
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

function dictionaryObjectPropertyReducer(state, action) {
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
