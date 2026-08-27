import api from "./api";

export const getPackagesByEvent = async (eventId) => {
    const response = await api.get(`/Packages/event/${eventId}`);
    return response.data;
};

export const getPackageById = async (id) => {
    const response = await api.get(`/Packages/${id}`);
    return response.data;
};

export const getTrendingPackages = async () => {
    const response = await api.get(`/Packages/trending`);
    return response.data;
};

export const getAllPackages = async () => {
    const response = await api.get(`/Packages`);
    return response.data;
};

export const createPackage = async (packageData) => {
    const response = await api.post(`/Packages`, packageData);
    return response.data;
};

export const updatePackage = async (id, packageData) => {
    const response = await api.put(`/Packages/${id}`, packageData);
    return response.data;
};

export const deletePackage = async (id) => {
    const response = await api.delete(`/Packages/${id}`);
    return response.data;
};