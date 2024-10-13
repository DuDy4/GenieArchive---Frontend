import { useEffect } from "react";

import { Route, Routes } from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";

import Home from "./components/homepage";
import Meeting from "./components/meeting";
import LoadingGenie from "./components/ui/loading-genie";

import { TokenProvider } from "./providers/TokenProvider";
import { MeetingsProvider } from "./providers/MeetingsProvider";

function App() {
    const { loginWithRedirect, getAccessTokenSilently, user, isAuthenticated, isLoading, error } = useAuth0();
    // const selfUrl = import.meta.env.VITE_SELF_URL;


    useEffect(() => {
        if (isLoading) {
            console.log("Auth0 is still loading...");
        } else if (isAuthenticated) {
            console.log("User is authenticated:", user?.name);
            console.log("User is authenticated:", user);
        } else {
            console.log("User is NOT authenticated");
            // Uncomment the next line if you want to redirect to login automatically
//             loginWithRedirect();
        }
    }, [isAuthenticated, isLoading, user]);

    if (error) {
      console.log("error", error);
      return <div>Oops... {error.message}</div>;
    }

    return (
        <>
            {!isLoading ? (
                <>
                    <TokenProvider >
                        <MeetingsProvider>
                            <Routes>
                                <Route path="/" index element={<Home />} />
                                <Route path="/meeting/:id" element={<Meeting />} />
                            </Routes>
                        </MeetingsProvider>
                    </TokenProvider>
                </>
            ) : (
                <LoadingGenie withLoadingCircle={true}/>
            )}
        </>
    );

}

export default App;
