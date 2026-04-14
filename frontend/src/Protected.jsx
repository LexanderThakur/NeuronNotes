import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const api = import.meta.env.VITE_API_URL;

export default function Protected({ children }) {
  const [isAuth, setIsAuth] = useState(null); // null = loading
  console.log(api);
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
    return <div>Loading...</div>;
  }

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return children;
}
