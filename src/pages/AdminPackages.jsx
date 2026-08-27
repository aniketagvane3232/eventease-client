import { useEffect, useState } from "react";
import {
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Button,
    TextField,
    Checkbox,
    FormControlLabel,
    MenuItem,
    Box,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Alert,
    Snackbar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import {
    getAllPackages,
    createPackage,
    updatePackage,
    deletePackage,
} from "../services/packageService";
import { getEventTypes } from "../services/eventService";

const emptyForm = {
    eventTypeId: "",
    packageName: "",
    price: "",
    description: "",
    isTrending: false,
    imageUrls: [""],
};

function AdminPackages() {
    const [packages, setPackages] = useState([]);
    const [eventTypes, setEventTypes] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState(emptyForm);
    const [snackbar, setSnackbar] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [pkgData, eventData] = await Promise.all([
                getAllPackages(),
                getEventTypes(),
            ]);
            setPackages(pkgData);
            setEventTypes(eventData);
        } catch (err) {
            setError("Failed to load packages.");
        }
    };

    const openCreateDialog = () => {
        setEditingId(null);
        setForm(emptyForm);
        setDialogOpen(true);
    };

    const openEditDialog = (pkg) => {
        setEditingId(pkg.id);
        setForm({
            eventTypeId: pkg.eventTypeId,
            packageName: pkg.packageName,
            price: pkg.price,
            description: pkg.description || "",
            isTrending: pkg.isTrending,
            imageUrls: pkg.images?.length ? pkg.images.map((img) => img.imageUrl) : [""],
        });
        setDialogOpen(true);
    };

    const handleImageUrlChange = (index, value) => {
        const updated = [...form.imageUrls];
        updated[index] = value;
        setForm({ ...form, imageUrls: updated });
    };

    const addImageUrlField = () => {
        setForm({ ...form, imageUrls: [...form.imageUrls, ""] });
    };

    const removeImageUrlField = (index) => {
        const updated = form.imageUrls.filter((_, i) => i !== index);
        setForm({ ...form, imageUrls: updated.length ? updated : [""] });
    };

    const handleSubmit = async () => {
        setError("");

        if (!form.eventTypeId || !form.packageName || !form.price) {
            setError("Event type, package name, and price are required.");
            return;
        }

        const payload = {
            eventTypeId: Number(form.eventTypeId),
            packageName: form.packageName,
            price: Number(form.price),
            description: form.description,
            isTrending: form.isTrending,
            imageUrls: form.imageUrls.filter((url) => url.trim() !== ""),
        };

        try {
            if (editingId) {
                await updatePackage(editingId, payload);
                setSnackbar("Package updated successfully.");
            } else {
                await createPackage(payload);
                setSnackbar("Package created successfully.");
            }
            setDialogOpen(false);
            loadData();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to save package.");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this package? This cannot be undone.")) return;

        try {
            await deletePackage(id);
            setSnackbar("Package deleted.");
            loadData();
        } catch (err) {
            setSnackbar("Failed to delete package.");
        }
    };

    return (
        <Container sx={{ mt: 6, mb: 6 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Typography variant="h4" fontWeight="bold">
                    Manage Packages
                </Typography>
                <Button variant="contained" startIcon={<AddIcon />} onClick={openCreateDialog}>
                    Add Package
                </Button>
            </Box>

            <Grid container spacing={3}>
                {packages.map((pkg) => (
                    <Grid item xs={12} sm={6} md={4} key={pkg.id}>
                        <Card elevation={3}>
                            <CardMedia
                                component="img"
                                height="160"
                                image={pkg.images?.[0]?.imageUrl || "https://images.unsplash.com/photo-1519741497674-611481863552?w=800"}
                                alt={pkg.packageName}
                            />
                            <CardContent>
                                <Typography variant="h6" fontWeight="bold">
                                    {pkg.packageName} {pkg.isTrending && "🔥"}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {pkg.eventType?.name}
                                </Typography>
                                <Typography color="primary" fontWeight="bold" sx={{ mt: 1 }}>
                                    ₹ {pkg.price}
                                </Typography>

                                <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        startIcon={<EditIcon />}
                                        onClick={() => openEditDialog(pkg)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        color="error"
                                        startIcon={<DeleteIcon />}
                                        onClick={() => handleDelete(pkg.id)}
                                    >
                                        Delete
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>{editingId ? "Edit Package" : "Add New Package"}</DialogTitle>
                <DialogContent>
                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                    <TextField
                        select
                        label="Event Type"
                        fullWidth
                        margin="normal"
                        value={form.eventTypeId}
                        onChange={(e) => setForm({ ...form, eventTypeId: e.target.value })}
                    >
                        {eventTypes.map((et) => (
                            <MenuItem key={et.id} value={et.id}>
                                {et.name}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        label="Package Name"
                        fullWidth
                        margin="normal"
                        value={form.packageName}
                        onChange={(e) => setForm({ ...form, packageName: e.target.value })}
                    />

                    <TextField
                        label="Price"
                        type="number"
                        fullWidth
                        margin="normal"
                        value={form.price}
                        onChange={(e) => setForm({ ...form, price: e.target.value })}
                    />

                    <TextField
                        label="Description"
                        fullWidth
                        multiline
                        rows={3}
                        margin="normal"
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={form.isTrending}
                                onChange={(e) => setForm({ ...form, isTrending: e.target.checked })}
                            />
                        }
                        label="Mark as Trending (shows on Home page)"
                    />

                    <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
                        Image URLs
                    </Typography>

                    {form.imageUrls.map((url, index) => (
                        <Box key={index} sx={{ display: "flex", gap: 1, mb: 1 }}>
                            <TextField
                                fullWidth
                                size="small"
                                placeholder="https://example.com/image.jpg"
                                value={url}
                                onChange={(e) => handleImageUrlChange(index, e.target.value)}
                            />
                            <IconButton
                                color="error"
                                onClick={() => removeImageUrlField(index)}
                                disabled={form.imageUrls.length === 1}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    ))}

                    <Button size="small" startIcon={<AddIcon />} onClick={addImageUrlField}>
                        Add another image
                    </Button>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleSubmit}>
                        {editingId ? "Save Changes" : "Create Package"}
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={!!snackbar}
                autoHideDuration={3000}
                onClose={() => setSnackbar("")}
                message={snackbar}
            />
        </Container>
    );
}

export default AdminPackages;