import api from "./api";

// Decode the JWT stored in localStorage to get the logged-in user's ID.
// This avoids needing a separate library just to read one claim.
const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");

    if (!token) {
        return null;
    }

    try {
        const payloadBase64 = token.split(".")[1];
        const payloadJson = atob(payloadBase64.replace(/-/g, "+").replace(/_/g, "/"));
        const payload = JSON.parse(payloadJson);

        return payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
    } catch (error) {
        console.error("Failed to decode token:", error);
        return null;
    }
};

export const createBooking = async (booking) => {
    const response = await api.post("/Bookings", booking);
    return response.data;
};

export const getMyBookings = async () => {
    const userId = getUserIdFromToken();

    if (!userId) {
        throw new Error("Not logged in");
    }

    const response = await api.get(`/Bookings/user/${userId}`);
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