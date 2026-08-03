const TOKEN_KEY = "token";
const USER_KEY = "user";

export const setAuth = (token, user = null) => {
    localStorage.setItem(TOKEN_KEY, token);

    if (user) {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
};

export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};

export const getUser = () => {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
};

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
};

export const isAuthenticated = () => {
    return !!getToken();
};