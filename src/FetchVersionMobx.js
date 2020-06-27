import React from "react";
import { observable, action } from "mobx";
import { observer } from "mobx-react";
import "mobx-react-lite/batchingForReactDom";

const myform = observable({
  name: "",
  isLoading: false,
  result: "",
  handleSubmit: action(async function (e) {
    e.preventDefault();
    myform.isLoading = true;
    try {
      const query = await fetch("https://reqres.in/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: myform.name,
          job: "dev",
        }),
      });
      if (query) {
        const res = await query.json();
        myform.result = JSON.stringify(res);
      }
    } catch (error) {
      console.error("Error ", error);
      throw error;
    } finally {
      myform.isLoading = false;
    }
  }),
  handleChange: function (e) {
    myform.name = e.target.value;
  },
  renderLoading: function () {
    return <span>Loading ...</span>;
  },
});

//const displayName = observer(({children})=> <p>myform.name</p>))

export const FormMobx = observer(() => {
  return (
    <>
      <h1>Form version Mobx</h1>
      <form onSubmit={myform.handleSubmit}>
        <input type="text" value={myform.name} onChange={myform.handleChange} />
        <input type="submit" value="Enter" />
      </form>
      <p>{myform.name}</p>
      {myform.isLoading ? myform.renderLoading() : myform.result}
    </>
  );
});

/*
const Appv2 = ()=>{
  return(
    <p>{isLoading ? renderLoading() : JSON.stringify(response)}</p>
  )
}
*/
