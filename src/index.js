import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { FormPostMobx, FormGetMobx, FormPostMobxFD } from "./FetchVersionMobx";
import { FormPostState, FormGetState } from "./FetchVersionState";
import { myStore } from "./store";

import { configure } from "mobx";
configure({
  enforceActions: "always",
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  observableRequiresReaction: true,
  disableErrorBoundaries: true,
});
ReactDOM.render(
  <React.StrictMode>
    <FormPostMobx store={myStore} />
    <FormPostMobxFD store={myStore} />
    <FormGetMobx store={myStore} />

    <FormPostState />
    <FormGetState />
  </React.StrictMode>,
  document.getElementById("root")
);
