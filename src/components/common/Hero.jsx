import { Box, Button, Typography, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useChat } from "../../context/ChatContext";

function Hero() {
    const navigate = useNavigate();
    const { openChat } = useChat();

    return (
        <Box
            sx={{
                minHeight: "85vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                background: "linear-gradient(135deg,#1565C0,#42A5F5)",
                color: "white",
                px: 3
            }}
        >
            <Box>
                <Typography variant="h2" fontWeight="bold" gutterBottom>
                    Plan Your Dream Event
                </Typography>

                <Typography variant="h5" sx={{ mb: 4 }}>
                    Weddings • Birthdays • Corporate Events • AI Powered Booking
                </Typography>

                <Stack direction="row" spacing={2} justifyContent="center">
                    <Button
                        variant="contained"
                        color="warning"
                        size="large"
                        onClick={() => navigate("/booking")}
                    >
                        Book Event
                    </Button>

                    <Button
                        variant="outlined"
                        size="large"
                        sx={{ color: "white", borderColor: "white" }}
                        onClick={openChat}
                    >
                        Ask AI Assistant
                    </Button>
                </Stack>
            </Box>
        </Box>
    );
}

export default Hero;