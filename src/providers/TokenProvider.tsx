import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

// Create the context with a default value of null
const TokenContext = createContext<string | null>(null);

// TokenProvider component
export const TokenProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        setToken(accessToken);
      } catch (e: any) { // Added 'any' to handle error types
        if (e.error === 'login_required') {
          const popupToken = await getAccessTokenWithPopup();
          setToken(popupToken);
        } else {
          console.error(e);
        }
      }
    };

    fetchToken();
  }, [getAccessTokenSilently, getAccessTokenWithPopup]);

  return (
    <TokenContext.Provider value={token}>
      {children}
    </TokenContext.Provider>
  );
};

// Hook to use the TokenContext
export const useToken = () => {
  return useContext(TokenContext);
};
