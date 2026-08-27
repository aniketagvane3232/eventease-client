import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { isLoggedIn } from "../services/authService";
import {
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Button
} from "@mui/material";

import { getPackagesByEvent } from "../services/packageService";

function Packages() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [packages, setPackages] = useState([]);

    useEffect(() => {
        loadPackages();
    }, []);

    const loadPackages = async () => {
        try {
            const data = await getPackagesByEvent(id);
            setPackages(data);
        }
        catch (error) {
            console.error(error);
        }
    };

    return (
        <Container sx={{ mt: 5 }}>

            <Typography
                variant="h3"
                align="center"
                gutterBottom
            >
                Packages
            </Typography>

            <Grid container spacing={3}>

                {packages.map((pkg) => (

                    <Grid item xs={12} md={4} key={pkg.id}>

                        <Card elevation={4}>

                            <CardMedia
                                component="img"
                                height="200"
                                image={pkg.images?.[0]?.imageUrl || "https://images.unsplash.com/photo-1519741497674-611481863552?w=800"}
                                alt={pkg.packageName}
                                sx={{ cursor: "pointer" }}
                                onClick={() => navigate(`/package/${pkg.id}`)}
                            />

                            <CardContent>

                                <Typography variant="h5" fontWeight="bold">
                                    {pkg.packageName}
                                </Typography>

                                <Typography sx={{ mt: 2 }}>
                                    {pkg.description}
                                </Typography>

                                <Typography
                                    color="primary"
                                    fontWeight="bold"
                                    sx={{ mt: 2 }}
                                >
                                    ₹ {pkg.price}
                                </Typography>

                                <Button
                                    variant="outlined"
                                    fullWidth
                                    sx={{ mt: 2 }}
                                    onClick={() => navigate(`/package/${pkg.id}`)}
                                >
                                    View Details
                                </Button>

                                <Button
                                    variant="contained"
                                    fullWidth
                                    sx={{ mt: 1 }}
                                    onClick={() => {
                                        if (isLoggedIn()) {
                                            navigate("/booking");
                                        }
                                        else {
                                            alert("Please Login First");
                                            navigate("/login");
                                        }
                                    }}
                                >
                                    Book Now
                                </Button>

                            </CardContent>

                        </Card>

                    </Grid>

                ))}

            </Grid>

        </Container>
    );
}

export default Packages;