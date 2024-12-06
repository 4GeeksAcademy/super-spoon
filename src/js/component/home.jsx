import React, { useEffect, useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
  //const [inputValue, setInputValue] = useState("");
  const [userName, setUserName] = useState("");
  const [tareas, setTareas] = useState([]);
  const [input, setInput] = useState("");
  const handlechange = (e) => {
    setInput(e.target.value);
  };

  console.log("user", userName);

  const createUser = () => {
    fetch("https://playground.4geeks.com/todo/users/CarolinaTodo", {
      method: "POST",
    })
      .then((response) => {
        if (response.status === 404) {
          return fetch(
            "https://playground.4geeks.com/todo/users/CarolinaTodo",
            {
              method: "POST",
            }
          );
        }
        return response.json();
      })
      .then((response) => getUser())
      .catch((error) => console.error("Error:", error));
  };

  const getUser = () => {
    fetch("https://playground.4geeks.com/todo/users/CarolinaTodo")
      .then((response) => response.json())
      .then((response) => setTareas(response.todos));
  };

  const addTask = () => {
    const newTask = { label: input, is_done: false };
    fetch("https://playground.4geeks.com/todo/todos/CarolinaTodo", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((response) => getUser())
      .catch((error) => console.error(error));
  };

  const deleteTask = (id) => {
    fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json)
      .then((response) => getUser())
      .cath((error) => console.log(error));
  };

  useEffect(() => {
    createUser();
  }, []);
  console.log(tareas);

  return (
    <div className="Container">
      <h1>My Neobrustalistic Todo List</h1>
      <div className="submitcontainer">
      <input type="text" onChange={handlechange} value={input} />
      <button className="PostButton"
        onClick={() => {
          addTask();
          setInput("");
        }}
      >
        <b>POST</b>
      </button></div>
      <ul>
        {tareas?.map((tarea) => {
          return <li className="list-item">{tarea.label} <button className="DeleteButton" onClick={() =>
            {
              deleteTask(tarea.id);
            }} 
          > <i className="fa-solid fa-trash-can"></i> </button></li>;
        })}
      </ul>
				
    </div>
  );
};

export default Home;
