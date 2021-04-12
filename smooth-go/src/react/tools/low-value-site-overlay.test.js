import LowValueSiteOverlay from "react/tools/low-value-site-overlay";
import React from "react";

import renderer from "react-test-renderer";
import {act, fireEvent, render} from "@testing-library/react";

import * as effects from "./effects.js";

const redirectButtonText = "Open Music";

function mockDependencies() {
  jest.useFakeTimers();

  jest.mock("uuid", () => {
    return {
      v4: jest.fn(() => "uuid-mock"),
    };
  });
}
mockDependencies();
function setTextFieldText(textField, newText) {
  fireEvent.change(textField, {target: {value: newText}});
}
// expect(queryByText(sampleButtonText)).toBeNull();
test("LowValueSiteOverlay renders ", () => {
  render(<LowValueSiteOverlay showPlaylistByDefault={false} />);
});

test("redirect instantly", () => {
  let url = "startsite.com";
  //TODO mock better
  effects.redirectTo = (newUrl) => {
    url = newUrl;
  };
  effects.openInNewTab = (newUrl) => {};

  let {getByText} = render(
    <LowValueSiteOverlay showPlaylistByDefault={true} />,
  );

  fireEvent.click(getByText(redirectButtonText));

  expect(url).not.toBe("startsite.com");
});

//disabled redirect delay
test.skip("redirect on delay timeout", () => {
  let url = "startsite.com";
  const originalUrl = url;

  //TODO mock better
  effects.redirectTo = (newUrl) => {
    url = newUrl;
  };
  effects.openInNewTab = (newUrl) => {};

  const {getByText, getByLabelText, getByRole} = render(
    <LowValueSiteOverlay showPlaylistByDefault={true} />,
  );
  const input = getByLabelText("Delay Minutes");
  const newTime = 3;
  expect(input).toBeInTheDocument();

  setTextFieldText(input, newTime.toString());

  expect(input.value).toBe(newTime.toString());
  fireEvent.click(getByText(redirectButtonText));

  expect(url).toBe(originalUrl);

  act(() => {
    jest.advanceTimersByTime((newTime - 1) * 60 * 1000);
  });

  expect(url).toBe(originalUrl);

  act(() => {
    jest.advanceTimersByTime(newTime * 60 * 1000);
    jest.advanceTimersByTime(1000);
  });

  expect(url).not.toBe(originalUrl);
});

test.skip("temp snapshot test", () => {
  const currentSnapshot = renderer
    .create(<LowValueSiteOverlay></LowValueSiteOverlay>)
    .toJSON();
  expect(currentSnapshot).toMatchInlineSnapshot(`
    <div
      style={
        Object {
          "fontSize": "13px",
        }
      }
    >
      <div
        style={
          Object {
            "height": "90%",
            "marginLeft": "auto",
            "pointerEvents": "none",
            "position": "fixed",
            "textAlign": "right",
            "width": "100vw",
            "zIndex": 9999,
          }
        }
      >
        <div
          style={
            Object {
              "display": "flex",
              "flexDirection": "column",
              "height": "100%",
              "justifyContent": "space-between",
              "marginLeft": "auto",
              "width": "17%",
            }
          }
        >
          WOOOP WOOOP
          <div
            style={Object {}}
          >
            <button
              className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary"
              disabled={false}
              onBlur={[Function]}
              onClick={[Function]}
              onDragLeave={[Function]}
              onFocus={[Function]}
              onKeyDown={[Function]}
              onKeyUp={[Function]}
              onMouseDown={[Function]}
              onMouseLeave={[Function]}
              onMouseUp={[Function]}
              onTouchEnd={[Function]}
              onTouchMove={[Function]}
              onTouchStart={[Function]}
              style={
                Object {
                  "fontSize": "small",
                  "pointerEvents": "auto",
                }
              }
              tabIndex={0}
              type="button"
            >
              <span
                className="MuiButton-label"
              >
                Settings
              </span>
            </button>
          </div>
          <div
            style={Object {}}
          >
            <button
              className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary"
              disabled={false}
              onBlur={[Function]}
              onClick={[Function]}
              onDragLeave={[Function]}
              onFocus={[Function]}
              onKeyDown={[Function]}
              onKeyUp={[Function]}
              onMouseDown={[Function]}
              onMouseLeave={[Function]}
              onMouseUp={[Function]}
              onTouchEnd={[Function]}
              onTouchMove={[Function]}
              onTouchStart={[Function]}
              style={
                Object {
                  "fontSize": "small",
                  "pointerEvents": "auto",
                }
              }
              tabIndex={0}
              type="button"
            >
              <span
                className="MuiButton-label"
              >
                Open Book
              </span>
            </button>
            <button
              className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary"
              disabled={false}
              onBlur={[Function]}
              onClick={[Function]}
              onDragLeave={[Function]}
              onFocus={[Function]}
              onKeyDown={[Function]}
              onKeyUp={[Function]}
              onMouseDown={[Function]}
              onMouseLeave={[Function]}
              onMouseUp={[Function]}
              onTouchEnd={[Function]}
              onTouchMove={[Function]}
              onTouchStart={[Function]}
              style={
                Object {
                  "fontSize": "small",
                  "pointerEvents": "auto",
                }
              }
              tabIndex={0}
              type="button"
            >
              <span
                className="MuiButton-label"
              >
                Open Music
              </span>
            </button>
            <button
              className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary"
              disabled={false}
              onBlur={[Function]}
              onClick={[Function]}
              onDragLeave={[Function]}
              onFocus={[Function]}
              onKeyDown={[Function]}
              onKeyUp={[Function]}
              onMouseDown={[Function]}
              onMouseLeave={[Function]}
              onMouseUp={[Function]}
              onTouchEnd={[Function]}
              onTouchMove={[Function]}
              onTouchStart={[Function]}
              style={
                Object {
                  "fontSize": "small",
                  "pointerEvents": "auto",
                }
              }
              tabIndex={0}
              type="button"
            >
              <span
                className="MuiButton-label"
              >
                Open Google
              </span>
            </button>
            <button
              className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary"
              disabled={false}
              onBlur={[Function]}
              onClick={[Function]}
              onDragLeave={[Function]}
              onFocus={[Function]}
              onKeyDown={[Function]}
              onKeyUp={[Function]}
              onMouseDown={[Function]}
              onMouseLeave={[Function]}
              onMouseUp={[Function]}
              onTouchEnd={[Function]}
              onTouchMove={[Function]}
              onTouchStart={[Function]}
              style={
                Object {
                  "fontSize": "small",
                  "pointerEvents": "auto",
                }
              }
              tabIndex={0}
              type="button"
            >
              <span
                className="MuiButton-label"
              >
                Open Podcasts
              </span>
            </button>
          </div>
          <div
            style={Object {}}
          >
            <div
              style={
                Object {
                  "float": "right",
                }
              }
            >
              <div
                style={
                  Object {
                    "background": "white",
                    "width": "70%",
                  }
                }
              >
                <div
                  className="MuiFormControl-root MuiTextField-root"
                  style={
                    Object {
                      "width": "100%",
                    }
                  }
                >
                  <label
                    className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-filled"
                    data-shrink={false}
                    htmlFor="standard-number"
                    id="standard-number-label"
                  >
                    Delay Minutes
                  </label>
                  <div
                    className="MuiInputBase-root MuiFilledInput-root MuiFilledInput-underline MuiInputBase-formControl"
                    onClick={[Function]}
                  >
                    <input
                      aria-invalid={false}
                      autoFocus={false}
                      className="MuiInputBase-input MuiFilledInput-input"
                      disabled={false}
                      id="standard-number"
                      onAnimationStart={[Function]}
                      onBlur={[Function]}
                      onChange={[Function]}
                      onFocus={[Function]}
                      required={false}
                      type="number"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            style={Object {}}
          >
            <div>
              <button
                className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary"
                disabled={false}
                onBlur={[Function]}
                onClick={[Function]}
                onDragLeave={[Function]}
                onFocus={[Function]}
                onKeyDown={[Function]}
                onKeyUp={[Function]}
                onMouseDown={[Function]}
                onMouseLeave={[Function]}
                onMouseUp={[Function]}
                onTouchEnd={[Function]}
                onTouchMove={[Function]}
                onTouchStart={[Function]}
                style={
                  Object {
                    "fontSize": "small",
                    "pointerEvents": "auto",
                  }
                }
                tabIndex={0}
                type="button"
              >
                <span
                  className="MuiButton-label"
                >
                  Show Calming Video
                </span>
              </button>
            </div>
          </div>
          <div
            style={Object {}}
          >
            <div>
               
            </div>
          </div>
        </div>
      </div>
    </div>
  `);
});
