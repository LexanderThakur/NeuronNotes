import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Auth from "./Auth";
import { useState } from "react";
import Dashboard from "./DashBoard";
import CreateProject from "./CreateProject";
import FollowCard from "./FollowCard";
import FollowCardC from "./FollowCardC";
import ProjectManager from "./ProjectManager";
function App() {
  const [login, setLogin] = useState(false);
  const [userEmail, setUserEmail] = useState("user@email.com");
  const [activeProject, setActiveProject] = useState(null);
  const [mode, setMode] = useState("dashboard");
  const [projectAccess, setProjectAccess] = useState("Manage");

  function open_project(project_id, access = "Manage") {
    setActiveProject(project_id);
    setProjectAccess(access);
    setMode("project");
  }
  return (
    <>
      {/* <FollowCardC /> */}

      {!login && <Auth setLogin={setLogin} setUserEmail={setUserEmail} />}

      {login && mode === "dashboard" && (
        <Dashboard userEmail={userEmail} open_project={open_project} />
      )}
      {login && mode === "project" && (
        <ProjectManager
          projectId={activeProject}
          goBack={() => {
            setMode("dashboard");
            setActiveProject(null);
          }}
          access={projectAccess}
        />
      )}
    </>
  );
}

export default App;
