import api from "./api";

export const getEventTypes = async () => {
    const response = await api.get("/EventTypes");
    return response.data;
};

export const getEventTypeById = async (id) => {
    const response = await api.get(`/EventTypes/${id}`);
    return response.data;
};