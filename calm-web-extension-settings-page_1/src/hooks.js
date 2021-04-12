import {useState} from "react";
export function useDictionary(initialObjectsWithKeys) {
  const [items, setItems] = useState(initialObjectsWithKeys);
  function addItem({key, item}) {
    setItems(items.concat({key: key, item: item}));
  }

  function removeItem({key, itemToRemove}) {
    setItems(
      items.filter((item) => {
        return items.key !== key;
      }),
    );
  }

  function updateItem({key, itemToChange}) {
    setItems(
      items
        .filter((item) => {
          return items.key !== itemToChange.key;
        })
        .concat(itemToChange),
    );
  }

  return {
    items,
    addItem,
    removeItem,
    updateItem,
  };
}

export function useDictionary(initialObjectsWithKeys) {
  const [todos, dispatch] = useReducer(objectPropertyReducer, initialTodos);
  const [items, setItems] = useState(initialObjectsWithKeys);
  function addItem({key, item}) {
    setItems(items.concat({key: key, item: item}));
  }

  function removeItem({key, itemToRemove}) {
    setItems(
      items.filter((item) => {
        return items.key !== key;
      }),
    );
  }

  function updateItem({key, itemToChange}) {
    setItems(
      items
        .filter((item) => {
          return items.key !== itemToChange.key;
        })
        .concat(itemToChange),
    );
  }

  return {
    items,
    addItem,
    removeItem,
    updateItem,
  };
}

function objectPropertyReducer(state, payload) {
  switch (payload.type) {
    case "SET_PROPERTY_WITH_KEY":
      return state.map((item) => {
        if (item.key === payload.key) {
          return {...item, [payload.property]: payload.newValue};
        } else {
          return item;
        }
      });
    default:
      return state;
  }
}
