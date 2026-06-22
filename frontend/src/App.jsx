import Dashboard from "./Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Manage from "./Manage";
import { useState } from "react";
import Protected from "./Protected";
import Auth from "./Auth";

import { SnackbarProvider } from "./SnackBarContext";
function App() {
  const [login, setLogin] = useState(false);
  const [userEmail, setUserEmail] = useState("user@email.com");

  function open_project(project_id, access = "Manage") {
    setActiveProject(project_id);
    setProjectAccess(access);
    setMode("project");
  }
  return (
    <SnackbarProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Protected>
                <Dashboard />
              </Protected>
            }
          ></Route>
          <Route
            path="/manage/:project_id"
            element={
              <Protected>
                <Manage />
              </Protected>
            }
          ></Route>
          <Route
            path="/manage/:project_id/note/:note_id"
            element={
              <Protected>
                <Manage />
              </Protected>
            }
          ></Route>
          <Route
            path="/view/:project_id"
            element={
              <Protected>
                <Manage view_only={true}></Manage>
              </Protected>
            }
          ></Route>
          <Route
            path="/view/:project_id/note/:note_id"
            element={
              <Protected>
                <Manage view_only={true} />
              </Protected>
            }
          ></Route>
          <Route path="/login" element={<Auth />}></Route>
        </Routes>
      </BrowserRouter>
    </SnackbarProvider>
  );
}

export default App;
