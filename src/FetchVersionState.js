import React, { useState } from "react";
import { options } from "./options";

const renderLoading = () => {
  return <span> Loading...</span>;
};

export function FormPostState() {
  const [name, setName] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const query = await fetch("https://reqres.in/api/users", {
        ...options,
        body: JSON.stringify({
          name: name,
          job: "dev",
        }),
      });
      if (query) {
        const data = await query.json();
        setResponse(JSON.stringify(data));
      }
    } catch (error) {
      console.error("fetch error ", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1>Form "POST" with useState</h1>
      <form onSubmit={(e) => handleSubmit(e, name)}>
        <input type="text" onChange={(e) => setName(e.target.value)} />
        <button>Enter</button>
      </form>
      <p>{isLoading ? renderLoading() : response}</p>
    </>
  );
}

export function FormGetState() {
  const [response, setResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const query = await fetch("https://reqres.in/api/users?page=1");
      if (query) {
        const data = await query.json();
        setResponse(data.data);
      }
    } catch (error) {
      console.error("fetch error ", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1>Form "GET" with useState</h1>
      <button onClick={handleSubmit}>Fetch users</button>
      {isLoading && response
        ? renderLoading()
        : response.map((user) => <p key={user.id}>{user.first_name}</p>)}
    </>
  );
}
