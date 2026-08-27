import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Grid, Typography, Card, CardMedia, CardContent, Button, Chip } from "@mui/material";

import Hero from "../components/common/Hero";
import EventCard from "../components/cards/EventCard";
import FeatureCard from "../components/cards/FeatureCard";
import { getEventTypes } from "../services/eventService";
import { getTrendingPackages } from "../services/packageService";

function Home() {
    const navigate = useNavigate();

    const [events, setEvents] = useState([]);
    const [trending, setTrending] = useState([]);

    const features = [
        {
            icon: "🤖",
            title: "AI Booking Assistant",
            description: "Ask questions, check dates, estimate costs, and get package recommendations instantly."
        },
        {
            icon: "💰",
            title: "Affordable Packages",
            description: "Choose from Silver, Gold, and Platinum packages to fit every budget."
        },
        {
            icon: "🎉",
            title: "Professional Team",
            description: "Experienced planners for weddings, birthdays, corporate events, and more."
        },
        {
            icon: "🕒",
            title: "24/7 Support",
            description: "We're here to help you before, during, and after your event."
        }
    ];

    useEffect(() => {
        loadEvents();
        loadTrending();
    }, []);

    const loadEvents = async () => {
        try {
            const data = await getEventTypes();
            setEvents(data);
        } catch (error) {
            console.error("Error loading event types:", error);
        }
    };

    const loadTrending = async () => {
        try {
            const data = await getTrendingPackages();
            setTrending(data);
        } catch (error) {
            console.error("Error loading trending packages:", error);
        }
    };

    return (
        <>
            <Hero />

            <Container sx={{ mt: 8 }}>
                <Typography
                    variant="h4"
                    align="center"
                    gutterBottom
                    fontWeight="bold"
                >
                    Popular Event Categories
                </Typography>

                <Grid container spacing={3} sx={{ mt: 2 }}>
                    {events.map((event) => (
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            key={event.id}
                        >
                            <EventCard title={event.name} />
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {trending.length > 0 && (
                <Container sx={{ mt: 10 }}>
                    <Typography
                        variant="h4"
                        align="center"
                        fontWeight="bold"
                        gutterBottom
                    >
                        🔥 Trending Packages
                    </Typography>

                    <Grid container spacing={3} sx={{ mt: 2 }}>
                        {trending.map((pkg) => (
                            <Grid item xs={12} sm={6} md={4} key={pkg.id}>
                                <Card
                                    elevation={4}
                                    sx={{ cursor: "pointer", height: "100%" }}
                                    onClick={() => navigate(`/package/${pkg.id}`)}
                                >
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={pkg.images?.[0]?.imageUrl || "https://images.unsplash.com/photo-1519741497674-611481863552?w=800"}
                                        alt={pkg.packageName}
                                    />
                                    <CardContent>
                                        <Chip label="Trending" color="warning" size="small" sx={{ mb: 1 }} />
                                        <Typography variant="h6" fontWeight="bold">
                                            {pkg.packageName}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" gutterBottom>
                                            {pkg.eventType?.name}
                                        </Typography>
                                        <Typography color="primary" fontWeight="bold" sx={{ mt: 1 }}>
                                            ₹ {pkg.price}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            )}

            <Container sx={{ mt: 10 }}>
                <Typography
                    variant="h4"
                    align="center"
                    fontWeight="bold"
                    gutterBottom
                >
                    Why Choose EventEase AI?
                </Typography>

                <Grid container spacing={3} sx={{ mt: 2 }}>
                    {features.map((feature) => (
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={3}
                            key={feature.title}
                        >
                            <FeatureCard
                                icon={feature.icon}
                                title={feature.title}
                                description={feature.description}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    );
}

export default Home;