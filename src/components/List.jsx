import { Link, useLocation } from "react-router-dom";
import "../style/list.css";
import { useEffect, useState } from "react";

export default function List() {
  const [taskdata, setTaskData] = useState([]);
  const location = useLocation();

  const getListdata = async () => {
    try {
      const res = await fetch("https://backend-gstc.onrender.com/tasks");
      const data = await res.json();

      console.log("API RESPONSE:", data);

      if (Array.isArray(data.result)) {
        setTaskData(data.result);
      } else {
        setTaskData([]);
      }
    } catch (error) {
      console.error(error);
      setTaskData([]);
    }
  };
  useEffect(() => {
    getListdata();
  }, [location.state]);

  const deleteTask = async (id) => {
    try {
      const res = await fetch(`https://backend-gstc.onrender.com/tasks/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok) {
        setTaskData((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div>
      <h2 className="heading">Todo List</h2>

      <table className="task-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Title</th>
            <th>Description</th>
            <th>Delete</th>
            <th>Update</th>
          </tr>
        </thead>

        <tbody>
          {taskdata.map((item, index) => (
            <tr key={item._id || index}>
              <td>{index + 1}</td>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>
                <button
                  onClick={() => deleteTask(item._id)}
                  className="btn-delete"
                >
                  Delete
                </button>
              </td>

              <td>
                <Link to={"update/" + item._id} className="btn-update">
                  Update
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
