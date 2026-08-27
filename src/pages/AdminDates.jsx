import { useEffect, useState } from "react";
import {
    Container,
    Typography,
    Box,
    TextField,
    Button,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    TableContainer,
    Chip,
    IconButton,
    Alert,
    Snackbar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
    getAllDatesForAdmin,
    setDateAvailability,
    deleteDateEntry,
} from "../services/availableDateService";

function AdminDates() {
    const [dates, setDates] = useState([]);
    const [newDate, setNewDate] = useState("");
    const [error, setError] = useState("");
    const [snackbar, setSnackbar] = useState("");

    useEffect(() => {
        loadDates();
    }, []);

    const loadDates = async () => {
        try {
            const data = await getAllDatesForAdmin();
            setDates(data);
        } catch (err) {
            setError("Failed to load dates.");
        }
    };

    const handleBlock = async () => {
        if (!newDate) return;
        try {
            await setDateAvailability(newDate, false);
            setSnackbar(`${newDate} marked as unavailable.`);
            setNewDate("");
            loadDates();
        } catch (err) {
            setSnackbar("Failed to block date.");
        }
    };

    const handleUnblock = async (date) => {
        try {
            await setDateAvailability(date, true);
            setSnackbar(`${date} marked as available.`);
            loadDates();
        } catch (err) {
            setSnackbar("Failed to update date.");
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteDateEntry(id);
            setSnackbar("Entry removed.");
            loadDates();
        } catch (err) {
            setSnackbar("Failed to delete entry.");
        }
    };

    return (
        <Container sx={{ mt: 6, mb: 6 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Manage Available Dates
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                By default, all future dates are available for booking. Use this page to block specific dates
                (fully booked, holidays, etc.) or re-open a previously blocked date.
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <Box sx={{ display: "flex", gap: 2, mb: 4, alignItems: "center" }}>
                <TextField
                    type="date"
                    label="Block a date"
                    InputLabelProps={{ shrink: true }}
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                />
                <Button variant="contained" color="error" onClick={handleBlock}>
                    Block Date
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Date</strong></TableCell>
                            <TableCell><strong>Status</strong></TableCell>
                            <TableCell><strong>Actions</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dates.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={3} align="center">
                                    No custom date entries yet. All dates are available by default.
                                </TableCell>
                            </TableRow>
                        ) : (
                            dates.map((d) => (
                                <TableRow key={d.id}>
                                    <TableCell>{new Date(d.date).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={d.isAvailable ? "Available" : "Blocked"}
                                            color={d.isAvailable ? "success" : "error"}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {d.isAvailable ? (
                                            <Button
                                                size="small"
                                                color="error"
                                                onClick={() => handleUnblock(d.date.split("T")[0])}
                                            >
                                                Block
                                            </Button>
                                        ) : (
                                            <Button
                                                size="small"
                                                color="success"
                                                onClick={() => handleUnblock(d.date.split("T")[0])}
                                            >
                                                Unblock
                                            </Button>
                                        )}
                                        <IconButton size="small" onClick={() => handleDelete(d.id)}>
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Snackbar
                open={!!snackbar}
                autoHideDuration={3000}
                onClose={() => setSnackbar("")}
                message={snackbar}
            />
        </Container>
    );
}

export default AdminDates;