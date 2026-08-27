import api from "./api";

export const getDashboard = async () => {
    const response = await api.get("/Admin/dashboard");
    return response.data;
};