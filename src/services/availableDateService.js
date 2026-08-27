import api from "./api";

export const getAvailableDates = async () => {
    const response = await api.get("/AvailableDates");
    return response.data;
};

export const getAllDatesForAdmin = async () => {
    const response = await api.get("/AvailableDates/all");
    return response.data;
};

export const checkDate = async (date) => {
    const response = await api.get(`/AvailableDates/check/${date}`);
    return response.data;
};

export const setDateAvailability = async (date, isAvailable) => {
    const response = await api.post("/AvailableDates", { date, isAvailable });
    return response.data;
};

export const deleteDateEntry = async (id) => {
    const response = await api.delete(`/AvailableDates/${id}`);
    return response.data;
};