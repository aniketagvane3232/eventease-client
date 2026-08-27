import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Container,
    Typography,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    TableContainer,
    Chip,
    CircularProgress,
    Alert,
    Grid,
    Card,
    CardContent,
    Button,
    Stack,
    Snackbar,
    Box,
} from "@mui/material";
import { getAllBookings, updateBookingStatus } from "../services/bookingService";
import { getDashboard } from "../services/adminService";

const statusColor = {
    Pending: "warning",
    Approved: "success",
    Rejected: "error",
};

function AdminDashboard() {
    const [bookings, setBookings] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [updatingId, setUpdatingId] = useState(null);
    const [snackbar, setSnackbar] = useState("");

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        setError("");
        try {
            const [bookingsData, statsData] = await Promise.all([
                getAllBookings(),
                getDashboard(),
            ]);
            setBookings(bookingsData);
            setStats(statsData);
        } catch (err) {
            if (err.response?.status === 403) {
                setError("You don't have permission to view this page. Admin access required.");
            } else if (err.response?.status === 401) {
                setError("You must be logged in to view this page.");
            } else {
                setError("Failed to load dashboard data.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (bookingId, newStatus) => {
        setUpdatingId(bookingId);
        try {
            await updateBookingStatus(bookingId, newStatus);
            setBookings((prev) =>
                prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
            );
            setSnackbar(`Booking #${bookingId} marked as ${newStatus}`);
        } catch (err) {
            setSnackbar("Failed to update booking status.");
        } finally {
            setUpdatingId(null);
        }
    };

    const statCards = stats
        ? [
              { label: "Total Users", value: stats.totalUsers },
              { label: "Total Bookings", value: stats.totalBookings },
              { label: "Pending Bookings", value: stats.pendingBookings },
              { label: "Total Revenue", value: `₹${stats.totalRevenue}` },
          ]
        : [];

    return (
        <Container sx={{ mt: 6, mb: 6 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Admin Dashboard
                </Typography>

                <Box sx={{ display: "flex", gap: 2 }}>
                    <Button variant="outlined" component={Link} to="/admin/packages">
                        Manage Packages
                    </Button>
                    <Button variant="outlined" component={Link} to="/admin/dates">
                        Manage Dates
                    </Button>
                </Box>
            </Box>

            {loading && <CircularProgress sx={{ mt: 4 }} />}

            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

            {!loading && !error && (
                <>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        {statCards.map((card) => (
                            <Grid item xs={12} sm={6} md={3} key={card.label}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary">
                                            {card.label}
                                        </Typography>
                                        <Typography variant="h4" fontWeight="bold">
                                            {card.value}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    <Typography variant="h5" fontWeight="bold" sx={{ mt: 5, mb: 2 }}>
                        All Bookings
                    </Typography>

                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><strong>ID</strong></TableCell>
                                    <TableCell><strong>Event Type</strong></TableCell>
                                    <TableCell><strong>Package</strong></TableCell>
                                    <TableCell><strong>Event Date</strong></TableCell>
                                    <TableCell><strong>Guests</strong></TableCell>
                                    <TableCell><strong>Venue</strong></TableCell>
                                    <TableCell><strong>Total Amount</strong></TableCell>
                                    <TableCell><strong>Status</strong></TableCell>
                                    <TableCell><strong>Actions</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {bookings.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={9} align="center">
                                            No bookings found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    bookings.map((b) => (
                                        <TableRow key={b.id}>
                                            <TableCell>{b.id}</TableCell>
                                            <TableCell>{b.eventType?.name || "-"}</TableCell>
                                            <TableCell>{b.package?.packageName || "-"}</TableCell>
                                            <TableCell>
                                                {new Date(b.eventDate).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell>{b.guests}</TableCell>
                                            <TableCell>{b.venue || "-"}</TableCell>
                                            <TableCell>₹{b.totalAmount}</TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={b.status}
                                                    color={statusColor[b.status] || "default"}
                                                    size="small"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Stack direction="row" spacing={1}>
                                                    <Button
                                                        size="small"
                                                        variant="outlined"
                                                        color="success"
                                                        disabled={b.status === "Approved" || updatingId === b.id}
                                                        onClick={() => handleStatusChange(b.id, "Approved")}
                                                    >
                                                        Approve
                                                    </Button>
                                                    <Button
                                                        size="small"
                                                        variant="outlined"
                                                        color="error"
                                                        disabled={b.status === "Rejected" || updatingId === b.id}
                                                        onClick={() => handleStatusChange(b.id, "Rejected")}
                                                    >
                                                        Reject
                                                    </Button>
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            )}

            <Snackbar
                open={!!snackbar}
                autoHideDuration={3000}
                onClose={() => setSnackbar("")}
                message={snackbar}
            />
        </Container>
    );
}

export default AdminDashboard;