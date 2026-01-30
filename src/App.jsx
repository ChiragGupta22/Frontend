import "./style/app.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import TodoList from "./components/TodoList";
import List from "./components/List";
import Update from "./components/Update";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/Addtask" element={<TodoList />} />
        <Route path="/update/:id" element={<Update />} />
      </Routes>
    </>
  );
}

export default App;
