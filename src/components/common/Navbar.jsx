import { AppBar, Toolbar, Typography, Button, Box, Avatar, Menu, MenuItem } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { isLoggedIn, getCurrentUser, logout } from "../../services/authService";

function Navbar() {
    const navigate = useNavigate();
    const loggedIn = isLoggedIn();
    const user = getCurrentUser();

    const [anchorEl, setAnchorEl] = useState(null);
    const menuOpen = Boolean(anchorEl);

    const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const handleLogout = () => {
        logout();
        handleMenuClose();
        navigate("/");
        window.location.reload();
    };

    return (
        <AppBar position="sticky">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
                    EventEase AI
                </Typography>

                <Box>
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    <Button color="inherit" component={Link} to="/events">Events</Button>
                    <Button color="inherit" component={Link} to="/about">About</Button>
                    <Button color="inherit" component={Link} to="/contact">Contact</Button>

                    {loggedIn && (
                        <Button color="inherit" component={Link} to="/my-bookings">
                            My Bookings
                        </Button>
                    )}

                    {loggedIn && user?.role === "Admin" && (
                        <Button color="inherit" component={Link} to="/admin">
                            Admin
                        </Button>
                    )}

                    {loggedIn ? (
                        <>
                            <Button
                                color="inherit"
                                onClick={handleMenuOpen}
                                startIcon={
                                    <Avatar sx={{ width: 28, height: 28, bgcolor: "warning.main" }}>
                                        {user?.name?.charAt(0)?.toUpperCase() || "U"}
                                    </Avatar>
                                }
                            >
                                {user?.name || "Account"}
                            </Button>
                            <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleMenuClose}>
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </>
                    ) : (
                        <>
                            <Button color="inherit" component={Link} to="/login">Login</Button>
                            <Button color="inherit" component={Link} to="/register">Register</Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;