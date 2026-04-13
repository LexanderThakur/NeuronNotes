import Dashboard from "./Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Manage from "./Manage";
import { useState } from "react";
function App() {
  const [login, setLogin] = useState(false);
  const [userEmail, setUserEmail] = useState("user@email.com");

  function open_project(project_id, access = "Manage") {
    setActiveProject(project_id);
    setProjectAccess(access);
    setMode("project");
  }
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/manage/:id" element={<Manage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
