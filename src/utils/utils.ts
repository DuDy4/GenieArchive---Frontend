
export const logout = () => {
    const auth0Domain = import.meta.env.VITE_AUTH0_DOMAIN;
    window.location.href = `${auth0Domain}/logout?post_logout_redirect_uri=${window.location.origin}`;
};

