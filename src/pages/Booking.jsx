import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    Container,
    TextField,
    Typography,
    Button,
    Paper,
    Card,
    CardContent,
    Alert
} from "@mui/material";

import { createBooking } from "../services/bookingService";

function Booking() {
    const location = useLocation();
    const navigate = useNavigate();

    const selectedPackage = location.state?.package || null;

    const [booking, setBooking] = useState({
        eventTypeId: selectedPackage?.eventTypeId || selectedPackage?.eventType?.id || "",
        packageId: selectedPackage?.id || "",
        eventDate: "",
        guests: "",
        venue: "",
        specialRequest: "",
        totalAmount: selectedPackage?.price || 0
    });

    const handleChange = (e) => {
        setBooking({
            ...booking,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = await createBooking({
                ...booking,
                eventTypeId: Number(booking.eventTypeId),
                packageId: Number(booking.packageId),
                guests: Number(booking.guests),
                totalAmount: Number(booking.totalAmount)
            });

            alert(result.message);

            navigate("/my-bookings");
        }
        catch (error) {
            console.error(error);
            alert("Booking Failed");
        }
    };

    if (!selectedPackage) {
        return (
            <Container maxWidth="sm" sx={{ mt: 5 }}>
                <Alert severity="warning">
                    No package selected. Please choose a package first.
                </Alert>
                <Button
                    variant="contained"
                    sx={{ mt: 3 }}
                    onClick={() => navigate("/events")}
                >
                    Browse Events
                </Button>
            </Container>
        );
    }

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>

            <Paper sx={{ p: 4 }}>

                <Typography
                    variant="h4"
                    align="center"
                    gutterBottom
                >
                    Book Event
                </Typography>

                <Card variant="outlined" sx={{ mb: 3, bgcolor: "grey.50" }}>
                    <CardContent>
                        <Typography variant="h6" fontWeight="bold">
                            {selectedPackage.packageName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {selectedPackage.eventType?.name}
                        </Typography>
                        <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                            ₹ {selectedPackage.price}
                        </Typography>
                    </CardContent>
                </Card>

                <form onSubmit={handleSubmit}>

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Event Date"
                        name="eventDate"
                        type="datetime-local"
                        value={booking.eventDate}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        required
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Guests"
                        name="guests"
                        type="number"
                        value={booking.guests}
                        onChange={handleChange}
                        required
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Venue"
                        name="venue"
                        value={booking.venue}
                        onChange={handleChange}
                        required
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Special Request"
                        name="specialRequest"
                        multiline
                        rows={3}
                        value={booking.specialRequest}
                        onChange={handleChange}
                    />

                    <Typography
                        sx={{ mt: 2 }}
                        variant="h6"
                    >
                        Estimated Cost: ₹{booking.totalAmount}
                    </Typography>

                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3 }}
                        type="submit"
                    >
                        Confirm Booking
                    </Button>

                </form>

            </Paper>

        </Container>
    );
}

export default Booking;