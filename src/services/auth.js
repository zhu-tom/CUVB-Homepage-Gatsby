const isBrowser = () => typeof window !== "undefined";

const setUser = (user) => window.localStorage.setItem("currentUser", JSON.stringify(user));

export const handleLogin = (res) => {
    if (!res.error) {
        setUser(res);
    }
}

export const getUser = () => {
    const currUser = window.localStorage.getItem("currentUser");
    return isBrowser() && currUser ? JSON.parse(currUser) : {};
}

export const isLoggedIn = () => {
    const user = getUser();
    return !!user._id;
};

export const logout = (callback) => {
    setUser({});
    callback();
}