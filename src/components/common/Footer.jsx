import { Box, Typography } from "@mui/material";

function Footer() {
    return (
        <Box
            sx={{
                bgcolor: "#1976d2",
                color: "white",
                textAlign: "center",
                py: 3,
                mt: 5
            }}
        >
            <Typography>
                © 2026 EventEase AI. All Rights Reserved.
            </Typography>
        </Box>
    );
}

export default Footer;