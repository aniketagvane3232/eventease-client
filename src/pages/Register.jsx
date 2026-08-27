import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Box, Container, TextField, Button, Typography, Alert, Paper } from "@mui/material";
import { register } from "../services/authService";

function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await register({ name, email, password, phone });
            navigate("/");
            window.location.reload();
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 8, mb: 8 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom align="center">
                    Create Account
                </Typography>

                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        label="Full Name"
                        fullWidth
                        required
                        margin="normal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        required
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Phone (optional)"
                        fullWidth
                        margin="normal"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        required
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        size="large"
                        sx={{ mt: 3 }}
                        disabled={loading}
                    >
                        {loading ? "Creating account..." : "Register"}
                    </Button>
                </Box>

                <Typography align="center" sx={{ mt: 3 }}>
                    Already have an account? <Link to="/login">Login here</Link>
                </Typography>
            </Paper>
        </Container>
    );
}

export default Register;