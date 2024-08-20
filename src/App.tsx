import { useEffect } from "react";

import { Route, Routes } from "react-router-dom";

import { useAuth } from "@frontegg/react";

import Home from "./components/homepage";
import Meeting from "./components/meeting";

function App() {
    const selfUrl = import.meta.env.VITE_SELF_URL;
    const fronteggUrl = import.meta.env.VITE_FRONTEGG_URL;
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
        const url = `${fronteggUrl}/oauth/account/sign-in?redirectUrl=${selfUrl}`;
        console.log(url);
        window.location.href = url;
    }
  }, [isAuthenticated]);

  return (
    <Routes>
      <Route path="/" index element={<Home />} />
      <Route path="/meeting/:id" element={<Meeting />} />
    </Routes>
  );
}

export default App;
