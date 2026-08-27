import { useEffect, useState } from "react";
import {
    Container,
    Grid,
    Typography,
    Card,
    CardContent,
    CardActions,
    Button
} from "@mui/material";
import { Link } from "react-router-dom";
import { getEventTypes } from "../services/eventService";

function Events() {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        loadEvents();
    }, []);

    const loadEvents = async () => {
        try {
            const data = await getEventTypes();
            setEvents(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container sx={{ mt: 5 }}>
            <Typography
                variant="h3"
                align="center"
                gutterBottom
                fontWeight="bold"
            >
                Our Events
            </Typography>

            <Grid container spacing={3} sx={{ mt: 3 }}>
                {events.map((event) => (
                    <Grid item xs={12} sm={6} md={4} key={event.id}>
                        <Card elevation={4}>
                            <CardContent>
                                <Typography variant="h5" fontWeight="bold">
                                    {event.name}
                                </Typography>

                                <Typography sx={{ mt: 2 }}>
                                    {event.description}
                                </Typography>

                                <Typography
                                    color="primary"
                                    fontWeight="bold"
                                    sx={{ mt: 2 }}
                                >
                                    Starting From ₹{event.basePrice}
                                </Typography>
                            </CardContent>

                            <CardActions>
                                <Button
                                    component={Link}
                                    to={`/events/${event.id}`}
                                    variant="contained"
                                    fullWidth
                                >
                                    View Details
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default Events;