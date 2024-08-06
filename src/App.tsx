import { useEffect } from "react";

import { Route, Routes } from "react-router-dom";

import { useAuth } from "@frontegg/react";

import Home from "./components/homepage";
import Meeting from "./components/meeting";

function App() {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href =
        "https://genie.us.frontegg.com/oauth/account/sign-in?redirectUrl=https://smashcode-genie-ai.netlify.app";
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
