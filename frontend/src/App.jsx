import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Auth from "./Auth";
import { useState } from "react";
import Dashboard from "./DashBoard";
import CreateProject from "./CreateProject";
function App() {
  const [login, setLogin] = useState(false);
  const [userEmail, setUserEmail] = useState("user@email.com");

  // return <Auth setLogin={setLogin} />;
  return (
    <>
      {!login && <Auth setLogin={setLogin} setUserEmail={setUserEmail} />}

      {login && <Dashboard userEmail={userEmail} />}
    </>
  );
}

export default App;
