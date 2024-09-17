import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react'; // Import Auth0 hook

const StorylanePopup = () => {
  const { isAuthenticated, isLoading, user } = useAuth0(); // Get Auth0 state directly
  const [isLaunched, setIsLaunched] = useState(false);
  const [isStorylaneLoaded, setIsStorylaneLoaded] = useState(false); // Track Storylane script load

  useEffect(() => {
    // Load the Storylane script asynchronously
    const script = document.createElement('script');
    script.src = "https://js.storylane.io/js/v2/storylane.js";
    script.async = true;
    script.onload = () => {
      setIsStorylaneLoaded(true); // Script loaded
      console.log("Storylane script loaded successfully.");
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (isLoading) {
      console.log("Auth0 is still loading...");
    } else if (isAuthenticated && isStorylaneLoaded) {
      console.log("User is authenticated:", user?.name);

      // Check if the popup has already been shown for this user
      const launched = localStorage.getItem(`storylanePopupLaunched_${user?.sub}`);
      
      if (!launched && !isLaunched) {
        handlePopup();
      }
    } else if (!isAuthenticated) {
      console.log("User is NOT authenticated");
    }
  }, [isAuthenticated, isLoading, user, isStorylaneLoaded]);

  const handlePopup = () => {
    if (window.Storylane) {
      window.Storylane.Play({
        type: 'popup',
        demo_type: 'image',
        width: 1905,
        height: 828,
        scale: '0.95',
        demo_url: 'https://app.storylane.io/demo/yybsjhhtujbz?embed=popup',
        padding_bottom: 'calc(43.46% + 25px)'
      });

      // Set state and save in localStorage
      setIsLaunched(true);
      localStorage.setItem(`storylanePopupLaunched_${user?.sub}`, 'true');
    } else {
      console.log("Storylane is not available on window.");
    }
  };

  return null; // No need to display anything, just triggering the popup
};

export default StorylanePopup;
