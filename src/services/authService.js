import api from "./api";

export const login = async (loginData) => {
    const response = await api.post("/Auth/login", loginData);

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data));

    return response.data;
};

export const register = async (registerData) => {
    const response = await api.post("/Auth/register", registerData);

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data));

    return response.data;
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};

export const isLoggedIn = () => {
    return localStorage.getItem("token") != null;
};

export const getToken = () => {
    return localStorage.getItem("token");
};

export const getCurrentUser = () => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
};