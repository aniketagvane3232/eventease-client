import api from "./api";

export const createBooking = async (booking) => {
    const response = await api.post("/Bookings", booking);
    return response.data;
};

export const getMyBookings = async () => {
    const response = await api.get("/Bookings/my");
    return response.data;
};

export const getAllBookings = async () => {
    const response = await api.get("/Bookings");
    return response.data;
};

export const updateBookingStatus = async (bookingId, status) => {
    const response = await api.put(`/Bookings/${bookingId}/status`, { status });
    return response.data;
};