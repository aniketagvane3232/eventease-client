import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Container,
    Typography,
    Card,
    CardContent,
    Button
} from "@mui/material";

import { getEventTypeById } from "../services/eventService";

function EventDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [event, setEvent] = useState(null);

    useEffect(() => {
        loadEvent();
    }, []);

    const loadEvent = async () => {
        try {
            const data = await getEventTypeById(id);
            setEvent(data);
        } catch (error) {
            console.error(error);
        }
    };

    if (!event)
        return (
            <Container sx={{ mt: 5 }}>
                <Typography>Loading...</Typography>
            </Container>
        );

    return (
        <Container sx={{ mt: 5 }}>
            <Card elevation={4}>
                <CardContent>

                    <Typography variant="h3">
                        {event.name}
                    </Typography>

                    <Typography sx={{ mt: 2 }}>
                        {event.description}
                    </Typography>

                    <Typography
                        color="primary"
                        variant="h5"
                        sx={{ mt: 2 }}
                    >
                        Starting From ₹{event.basePrice}
                    </Typography>

                    <Button
                        variant="contained"
                        sx={{ mt: 3 }}
                        onClick={() => navigate(`/packages/${event.id}`)}
                    >
                        View Packages
                    </Button>

                </CardContent>
            </Card>
        </Container>
    );
}

export default EventDetails;