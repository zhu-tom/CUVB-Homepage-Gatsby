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

export const isAdmin = async () => {
    const user = getUser();
    let result = await fetch(`${process.env.GATSBY_API_URL || ""}/api/authenticate`, {
        method: "GET",
        headers: {
            "Content-Type":"application/json",
            "Authorization": user._id
        }
    });
    result = await result.json();
    return result.isAdmin;
}

export const logout = (callback) => {
    setUser({});
    callback();
}