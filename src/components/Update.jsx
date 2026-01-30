import { useEffect, useState } from "react";
import "../style/todolist.css";
import { useNavigate, useParams } from "react-router-dom";
import List from "./List";

export default function Update() {
  const [taskdata, settaskdata] = useState({ title: "", description: "" });
  const navi = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await fetch(
          `https://backend-gstc.onrender.com/tasks/${id}`,
        );
        const data = await res.json();

        if (res.ok) {
          settaskdata(data.result);
        } else {
          alert("Task not found");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchTask();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3200/updateTask/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskdata),
      });

      const data = await res.json();
      console.log("PUT DATA:", data);

      if (data.ok) {
        alert(data.message);
        settaskdata({ title: "", description: "" });
      } else {
        alert(data.message || "Error updating task");
      }
      if (res.ok) {
        navi("/", List);
      }
    } catch (error) {
      console.error("Update Error:", error);
    }
  };

  return (
    <div className="container">
      <h1>Update Task</h1>
      <form onSubmit={handleUpdate}>
        <label>Title</label>
        <input
          type="text"
          value={taskdata.title}
          onChange={(e) => settaskdata({ ...taskdata, title: e.target.value })}
          placeholder="Enter Your Title"
        />

        <label>Description</label>
        <textarea
          value={taskdata.description || ""}
          onChange={(e) =>
            settaskdata({ ...taskdata, description: e.target.value })
          }
        />
        <button type="submit" className="submit">
          Update Task
        </button>
      </form>
    </div>
  );
}
