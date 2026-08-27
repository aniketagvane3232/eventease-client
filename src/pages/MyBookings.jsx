import { useEffect, useState } from "react";

import {
    Container,
    Typography,
    Card,
    CardContent,
    Grid,
    Chip,
    CircularProgress,
    Alert,
    Box
} from "@mui/material";

import { getMyBookings } from "../services/bookingService";

function MyBookings() {

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadBookings();
    }, []);

    const loadBookings = async () => {

        try {
            setLoading(true);
            setError("");

            const data = await getMyBookings();

            setBookings(data || []);

        } catch (error) {

            console.error("My bookings error:", error);

            if (error.response?.status === 401) {
                setError("Your session has expired. Please login again.");
            } else {
                setError("Unable to load your bookings.");
            }

        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case "approved":
                return "success";
            case "rejected":
                return "error";
            case "pending":
                return "warning";
            default:
                return "primary";
        }
    };

    return (

        <Container sx={{ mt: 5 }}>

            <Typography
                variant="h4"
                gutterBottom
            >
                My Bookings
            </Typography>

            {loading && (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        mt: 5
                    }}
                >
                    <CircularProgress />
                </Box>
            )}

            {!loading && error && (
                <Alert severity="error" sx={{ mt: 3 }}>
                    {error}
                </Alert>
            )}

            {!loading && !error && bookings.length === 0 && (
                <Alert severity="info" sx={{ mt: 3 }}>
                    You don't have any bookings yet.
                </Alert>
            )}

            {!loading && !error && bookings.length > 0 && (

                <Grid container spacing={3} sx={{ mt: 1 }}>

                    {bookings.map((booking) => (

                        <Grid item xs={12} key={booking.id}>

                            <Card>

                                <CardContent>

                                    <Typography variant="h5">
                                        {booking.eventType?.name}
                                    </Typography>

                                    <Typography>
                                        Package : {booking.package?.packageName}
                                    </Typography>

                                    <Typography>
                                        Guests : {booking.guests}
                                    </Typography>

                                    <Typography>
                                        Venue : {booking.venue}
                                    </Typography>

                                    <Typography>
                                        ₹ {booking.totalAmount}
                                    </Typography>

                                    <Chip
                                        label={booking.status}
                                        color={getStatusColor(booking.status)}
                                        sx={{ mt: 2 }}
                                    />

                                </CardContent>

                            </Card>

                        </Grid>

                    ))}

                </Grid>

            )}

        </Container>

    );
}

export default MyBookings;