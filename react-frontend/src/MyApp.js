import axios from "axios";
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  async function fetchAll() {
    try {
      const response = await axios.get("http://localhost:8000/users");
      return response.data.users_list;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  useEffect(() => {
    fetchAll().then((result) => {
      if (result) {
        setCharacters(result);
        console.log(result);
      }
    });
  }, []);

  async function makePostCall(person) {
    try {
      const response = await axios.post("http://localhost:8000/users", person);
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  function updateList(person) {
    makePostCall(person).then(result => {
      if (result && result.status === 200)
        setCharacters([...characters, person]);
    })
  }

  function removeOneCharacter(index) {
    const updated = characters.filter((character, i) => {
      return i !== index;
    });
    setCharacters(updated);
  }

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}
export default MyApp;
