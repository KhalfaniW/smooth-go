import {fireEvent, render} from "@testing-library/react";
import React from "react";

import SettingsPage, {ItemForm} from "./settings-page";

test("SettingsPage renders ", () => {
  const {getByTestId} = render(<SettingsPage />);
});

test.skip("add objectList", () => {
  let originalObjects = [
    {key: 0, value: {x: "nothing"}},
    {key: 1, value: {x: "nothing1"}},
    {key: 2, value: {x: "nothing2"}},
  ];
  function replaceObjectWithKey({objectList, newKeyAndValue}) {
    return objectList
      .filter((object) => {
        return object.key !== newKeyAndValue.key;
      })
      .concat(newKeyAndValue);
  }
  const newObjects = replaceObjectWithKey({
    objectList: originalObjects,
    newKeyAndValue: {key: 1, value: {x: "something1"}},
  });
  expect(newObjects).toEqual([
    {key: 0, value: {x: "nothing"}},
    {key: 2, value: {x: "nothing2"}},
    {key: 1, value: {x: "something1"}},
  ]);
});

function setTextFieldText(textField, newText) {
  fireEvent.change(textField, {target: {value: newText}});
}

//implementation detail
test("submit item ", () => {
  const mockHandleSubmit = jest.fn();
  const labelAndDefaultValue1 = {
    label: "current label",
    defaultValue: "originalValue",
  };

  const tools = render(
    <ItemForm
      onNewValueSubmitted={mockHandleSubmit}
      labelAndDefaultValueGroup={[labelAndDefaultValue1]}
      submitButtonText={"Submit"}
    />,
  );

  setTextFieldText(tools.getByLabelText("current label"), "newValue1");

  fireEvent.click(tools.getByText("Submit"));

  expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
  expect(mockHandleSubmit).toHaveBeenCalledWith("newValue1");
});

test.only("test save item ", () => {
  const buttonLabelName = "Button 1 Name";
  const submitButtonName = "Save";

  const mocktLinkButtonConfigGroup = [
    {
      name: "Button_1_name",
      links: ["https://radiopublic.com/99pi"],
    },
    {
      name: "Button_2_name",
      links: ["https://read.amazon.com", "https://hoopladigital.com"],
    },
  ];

  const mockHandleSave = jest.fn();
  const labelAndDefaultValue1 = {
    label: "current label",
    defaultValue: "originalValue",
  };

  const tools = render(
    <SettingsPage
      getKeyFromIndex={(index) => index}
      onSave={mockHandleSave}
      linkButtonConfigGroup={mocktLinkButtonConfigGroup}
      submitButtonText={"Submit"}
    />,
  );

  setTextFieldText(
    tools.getByLabelText(buttonLabelName),
    "Button_1_name_that_has_changed",
  );

  fireEvent.click(tools.getByText(submitButtonName));

  expect(mockHandleSave).toHaveBeenCalledTimes(1);
  expect(mockHandleSave).toHaveBeenCalledWith([
    {
      name: "Button_1_name_that_has_changed",
      links: ["https://radiopublic.com/99pi"],
    },
    {
      name: "Button_2_name",
      links: ["https://read.amazon.com", "https://hoopladigital.com"],
    },
  ]);
});
