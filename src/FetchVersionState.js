import React, { useState } from "react";

export default function FormState() {
  const [name, setName] = useState("");
  const [response, setResponse] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const query = await fetch("https://reqres.in/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

  const renderLoading = () => {
    return <span> Loading...</span>;
  };

  return (
    <>
      <h1>Form version State</h1>
      <form onSubmit={(e) => handleSubmit(e, name)}>
        <input type="text" onChange={(e) => setName(e.target.value)} />
        <input type="submit" value="Enter" />
      </form>
      <p>{name}</p>
      <p>{isLoading ? renderLoading() : response}</p>
    </>
  );
}
