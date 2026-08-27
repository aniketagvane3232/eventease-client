import { useState } from "react";
import {
    Container,
    TextField,
    Typography,
    Button,
    Paper
} from "@mui/material";

import { createBooking } from "../services/bookingService";

function Booking() {

    const [booking, setBooking] = useState({
        eventTypeId: 1,
        packageId: 1,
        eventDate: "",
        guests: "",
        venue: "",
        specialRequest: "",
        totalAmount: 50000
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
            const result = await createBooking(booking);

            alert(result.message);

            setBooking({
                ...booking,
                eventDate: "",
                guests: "",
                venue: "",
                specialRequest: ""
            });
        }
        catch (error) {
            console.error(error);
            alert("Booking Failed");
        }
    };

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
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Guests"
                        name="guests"
                        type="number"
                        value={booking.guests}
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Venue"
                        name="venue"
                        value={booking.venue}
                        onChange={handleChange}
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
                        Estimated Cost: ₹50,000
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