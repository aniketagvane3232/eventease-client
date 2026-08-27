import { Card, CardContent, Typography } from "@mui/material";

function EventCard({ title }) {
    return (
        <Card
            sx={{
                textAlign: "center",
                p: 3,
                cursor: "pointer",
                transition: ".3s",

                "&:hover": {
                    transform: "translateY(-8px)"
                }
            }}
        >
            <CardContent>
                <Typography
                    variant="h6"
                    fontWeight="bold"
                >
                    {title}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default EventCard;