import React, { useState } from "react";
import { action, runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { options } from "./options";
// <- Lodash is included in CRA
import { isEqual } from "lodash";

const Loading = () => <span>Loading ...</span>;

const url1 = "https://reqres.in/api/users";
const url2 = "https://jsonplaceholder.typicode.com/users";

const url3 = "https://dummyapi.io/data/api/";
const APP_ID = process.env.REACT_APP_APP_ID; //"5fe0c731916c890f078f2e85";

const url4 = "https://app.fakejson.com/q"; //<- ok for FormData
const token = process.env.REACT_APP_TOKEN; // "fpd6gFBTdJkRMsH1cZCJRQ"; // <- with FD.append("token",token)

export const FormPostMobx = observer(({ store }) => {
  const [isLoading, setIsLoading] = useState(false);
  const formRef = React.useRef(); // <- created once for all
  const prevFormRef = React.useRef();
  const compareRef = React.useRef();

  React.useEffect(() => {
    action(() => (prevFormRef.current = store.name))(); //<- autorun
    compareRef.current = action(() => isEqual(store.name, formRef.current))();
    // <- deep comparison with Lodash
  });

  const handleSubmit = action(async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const query = await fetch(url2, {
        ...options,
        // headers: { "app-id": APP_ID }, //url3 <- we remove "Content-Type" here
        body: JSON.stringify({
          firstName: store.name,
          lastName: "dev",
        }),
      });
      if (query) {
        const res = await query.json();
        runInAction(() => {
          store.result = JSON.stringify(res);
        });
      }
    } catch (error) {
      console.error("Error ", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  });

  const handleChange = action((e) => {
    return (store.name = e.target.value);
  });

  console.log("CTRL");
  return (
    <>
      <h1>Form Post with Mobx</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={store.name}
          onChange={handleChange}
        />

        <button>Enter</button>
      </form>
      <p>Controlled : {store.name}</p>
      <p>
        <b>formRef</b> value: {formRef.current}
      </p>
      <p>
        <b>prevFormRef</b> value: {prevFormRef.current}
      </p>
      <p>
        <b>compare</b> value: {compareRef?.current?.toString()}
      </p>

      <p>{store.getResult(isLoading)}</p>
    </>
  );
});

// Uncontrolled with FormData
export const FormPostMobxFD = observer(({ store }) => {
  const [isLoading, setIsLoading] = useState(false);

  const formRef = React.useRef(); // <- not needed if e.currentTarget

  const handleSubmit = action(async (e) => {
    const formData = new FormData(e.currentTarget);
    formData.append("token", token); ///<- token needed for url4
    for (const [k, v] of formData) {
      console.log(k, v);
    }

    e.preventDefault();
    setIsLoading(true);
    try {
      const query = await fetch(url4, {
        method: "POST",
        mode: "cors",
        body: formData,
      });
      if (query) {
        const res = await query.json();
        console.log(res);
        action(() => {
          store.resultFD = JSON.stringify(res);
        })();
      }
    } catch (error) {
      console.error("Error ", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  });

  console.log("FD");
  return (
    <>
      <h1>Form Post FD uncontrolled with Mobx</h1>
      <form onSubmit={handleSubmit} ref={formRef}>
        <input type="text" name="data[name]" defaultValue={store.nameFD} />
        <input type="text" name="data[job]" defaultValue={store.jobFD} />
        <button>Enter</button>
      </form>
      <p>UnControlled : {store.nameFD}</p>
      <p>{store.getResultFD(isLoading)}</p>
    </>
  );
});

export const FormGetMobx = observer(({ store }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = action(async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // const query = await fetch(url1 + "?page=1");
      const query = await fetch(url2);
      if (query) {
        const data = await query.json();
        action(() => (store.results = data))(); //<- url1 data.data
      }
    } catch (error) {
      console.error("fetch error ", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <>
      <h1>Form "POST" with Mobx</h1>
      <button onClick={handleSubmit}>Fetch users</button>
      {isLoading && store.results
        ? Loading()
        : store.results.map(action((user) => <p key={user.id}>{user.name}</p>))}
    </>
  );
});

// export const A = observer(({store}) => {
//   return <p>{store.results.length}</p>;
// });
