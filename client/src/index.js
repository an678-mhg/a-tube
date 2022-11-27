import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { SWRConfig } from "swr";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <SWRConfig value={{ revalidateOnFocus: false }}>
          <App />
        </SWRConfig>
      </Provider>

      <ToastContainer />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
