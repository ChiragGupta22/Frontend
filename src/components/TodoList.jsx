import { useState } from "react";
import "../style/todolist.css";
import { useNavigate } from "react-router-dom";
import List from "./List";
export default function TodoList() {
  const [taskdata, settaskdata] = useState({ title: "", description: "" });
  const navi = useNavigate();
  const addtask = async (e) => {
    e.preventDefault();

    const res = await fetch("https://backend-gstc.onrender.com/add-task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskdata),
    });

    const result = await res.json();
    console.log(result);

    if (res.ok) {
      alert("Task Added");
      navi("/", List);
    }
  };

  return (
    <>
      <div className="container">
        <h1>Add new task</h1>

        <label htmlFor="">Title</label>
        <input
          onChange={(event) =>
            settaskdata({ ...taskdata, title: event.target.value })
          }
          type="text"
          name="title"
          placeholder="Enter Your Title"
        />
        <label>description</label>
        <textarea
          onChange={(event) =>
            settaskdata({ ...taskdata, description: event.target.value })
          }
          name="description"
          placeholder="Enter Your Task description"
        ></textarea>
        <button onClick={addtask} className="submit">
          Add new task
        </button>
      </div>
    </>
  );
}
