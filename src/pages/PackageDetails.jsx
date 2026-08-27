import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Container,
    Typography,
    Grid,
    Card,
    CardMedia,
    Button,
    Box,
    Chip,
    CircularProgress,
} from "@mui/material";
import { getPackageById } from "../services/packageService";
import { isLoggedIn } from "../services/authService";

function PackageDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [pkg, setPkg] = useState(null);
    const [mainImage, setMainImage] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadPackage();
    }, [id]);

    const loadPackage = async () => {
        setLoading(true);
        try {
            const data = await getPackageById(id);
            setPkg(data);
            setMainImage(data.images?.[0]?.imageUrl || null);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleBookNow = () => {
        if (isLoggedIn()) {
            navigate("/booking", { state: { package: pkg } });
        } else {
            alert("Please Login First");
            navigate("/login");
        }
    };

    if (loading) {
        return (
            <Container sx={{ mt: 8, textAlign: "center" }}>
                <CircularProgress />
            </Container>
        );
    }

    if (!pkg) {
        return (
            <Container sx={{ mt: 8, textAlign: "center" }}>
                <Typography variant="h5">Package not found.</Typography>
            </Container>
        );
    }

    return (
        <Container sx={{ mt: 6, mb: 6 }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={7}>
                    <Card elevation={3}>
                        <CardMedia
                            component="img"
                            height="420"
                            image={mainImage || "https://images.unsplash.com/photo-1519741497674-611481863552?w=800"}
                            alt={pkg.packageName}
                        />
                    </Card>

                    <Box sx={{ display: "flex", gap: 1, mt: 2, flexWrap: "wrap" }}>
                        {pkg.images?.map((img) => (
                            <Box
                                key={img.id}
                                component="img"
                                src={img.imageUrl}
                                alt="thumbnail"
                                onClick={() => setMainImage(img.imageUrl)}
                                sx={{
                                    width: 90,
                                    height: 90,
                                    objectFit: "cover",
                                    borderRadius: 1,
                                    cursor: "pointer",
                                    border: mainImage === img.imageUrl ? "3px solid" : "3px solid transparent",
                                    borderColor: mainImage === img.imageUrl ? "primary.main" : "transparent",
                                }}
                            />
                        ))}
                    </Box>
                </Grid>

                <Grid item xs={12} md={5}>
                    {pkg.isTrending && (
                        <Chip label="🔥 Trending" color="warning" sx={{ mb: 2 }} />
                    )}

                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        {pkg.packageName}
                    </Typography>

                    <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                        {pkg.eventType?.name}
                    </Typography>

                    <Typography variant="h5" color="primary" fontWeight="bold" sx={{ mt: 2, mb: 2 }}>
                        ₹ {pkg.price}
                    </Typography>

                    <Typography variant="body1" sx={{ mb: 4 }}>
                        {pkg.description}
                    </Typography>

                    <Button variant="contained" size="large" fullWidth onClick={handleBookNow}>
                        Book Now
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}

export default PackageDetails;