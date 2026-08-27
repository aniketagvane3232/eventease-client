import { Card, CardContent, Typography } from "@mui/material";

function FeatureCard({ icon, title, description }) {
    return (
        <Card
            elevation={3}
            sx={{
                height: "100%",
                textAlign: "center",
                p: 3,
                transition: "0.3s",
                "&:hover": {
                    transform: "translateY(-8px)"
                }
            }}
        >
            <Typography variant="h2">
                {icon}
            </Typography>

            <CardContent>

                <Typography
                    variant="h6"
                    fontWeight="bold"
                    gutterBottom
                >
                    {title}
                </Typography>

                <Typography color="text.secondary">
                    {description}
                </Typography>

            </CardContent>
        </Card>
    );
}

export default FeatureCard;