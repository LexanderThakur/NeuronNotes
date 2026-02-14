import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Auth from "./Auth";
import { useState } from "react";
function App() {
  const [login, setLogin] = useState(false);

  return <Auth setLogin={setLogin} />;
}

export default App;
