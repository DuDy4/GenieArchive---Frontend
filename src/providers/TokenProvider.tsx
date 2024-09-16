import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

// Create the context with a default value of null for token and false for admin
interface TokenContextProps {
  token: string | null;
  isAdmin: boolean;
  updateFakeTenantId: (tenantId: string) => void;
  fakeTenantId: string | null;
}

const TokenContext = createContext<TokenContextProps | undefined>(undefined);

// TokenProvider component
export const TokenProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const { user, getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
  const email_verification = import.meta.env.VITE_EMAIL_VERIFICATION;
  const [fakeTenantId, setFakeTenantId] = useState<string | null>(null);

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
    if (!user) {
      return;
    }
    const email_verified = user?.user_email;
    console.log("email_verified:", email_verified);
    console.log("email_verification:", email_verification);
    if (email_verified && email_verified.includes(email_verification)) {

      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [getAccessTokenSilently, getAccessTokenWithPopup, user, email_verification]);

  const updateFakeTenantId = (tenantId: string) => {
    setFakeTenantId(tenantId);
  }

  return (
    <TokenContext.Provider value={{ token, isAdmin, updateFakeTenantId, fakeTenantId }}>
      {children}
    </TokenContext.Provider>
  );
};

// Hook to use the TokenContext
export const useToken = () => {
  const context = useContext(TokenContext);
  if (context === undefined) {
    throw new Error('useToken must be used within a TokenProvider');
  }
  return context;
};
