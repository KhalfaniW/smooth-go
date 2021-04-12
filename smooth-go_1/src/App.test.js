import {Provider} from "react-redux";
import {createStore} from "redux";
import React from "react";

import {render} from "@testing-library/react";

import { setRedirectReducer } from './redux/reducers';
import App from "./App";

const redirectDestination = "http://m.khal.me:12345";

const store = createStore(setRedirectReducer);

//TODO make hoc

test("App renders ", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
});
