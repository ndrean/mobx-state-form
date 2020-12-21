import React from "react";
import { observable } from "mobx";

export const myStore = observable({
  name: "",
  job: "",
  nameFD: "",
  jobFD: "",
  result: "",
  resultFD: "",
  getResult(bool) {
    return bool ? Loading() : myStore.result;
  },
  getResultFD(bool) {
    return bool ? Loading() : myStore.resultFD;
  },
  results: [],
  // setResults: action((val) => (myStore.results = val)),
});

export const Loading = () => <span>Loading ...</span>;
