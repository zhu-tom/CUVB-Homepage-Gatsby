export const isBrowser = () => typeof window !== "undefined";

const setUser = (user) => isBrowser() ? window.localStorage.setItem("currentUser", JSON.stringify(user)) : null;

export const handleLogin = (res) => {
    if (!res.error) {
        setUser(res);
    }
}

export const getUser = () => {
    return isBrowser() && window.localStorage.getItem("currentUser") ? JSON.parse(window.localStorage.getItem("currentUser")) : {};
}

export const isLoggedIn = () => {
    const user = getUser();
    return !!user._id;
};

export const isAdmin = () => {
    const user = getUser();
    return user._id === process.env.GATSBY_ADMIN_ID;
}

export const logout = (callback) => {
    setUser({});
    callback();
}