import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import BackendWakingScreen from "../components/common/BackendWakingScreen";

import { api } from "../api/api.js";

export default function Protected({ children }) {
  const [isAuth, setIsAuth] = useState(null); // null = loading

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(api + "/auth/me/", {
          credentials: "include",
        });

        if (response.ok) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      } catch (err) {
        setIsAuth(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuth === null) {
    return <BackendWakingScreen />;
  }

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return children;
}
