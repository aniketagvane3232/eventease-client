import { useRef, useEffect, useState } from "react";
import {
    Fab,
    Paper,
    Box,
    Typography,
    IconButton,
    TextField,
    Button,
    CircularProgress,
} from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import CloseIcon from "@mui/icons-material/Close";
import { useChat } from "../../context/ChatContext";

function FloatingAIButton() {
    const { isOpen, toggleChat, closeChat } = useChat();

    const [messages, setMessages] = useState([
        { sender: "bot", text: "Hi! Ask me anything about EventEase." },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isOpen]);

    const sendMessage = async () => {
        const trimmed = input.trim();
        if (!trimmed || loading) return;

        setMessages((prev) => [...prev, { sender: "user", text: trimmed }]);
        setInput("");
        setLoading(true);

        try {
            const response = await fetch(
  `${import.meta.env.VITE_API_URL}/AI/chat`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: trimmed,
    }),
  }
);

            const data = await response.json();

            if (!response.ok) {
                setMessages((prev) => [
                    ...prev,
                    { sender: "bot", text: "Sorry, something went wrong. Please try again." },
                ]);
            } else {
                setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
            }
        } catch (err) {
            setMessages((prev) => [
                ...prev,
                { sender: "bot", text: "Could not reach the server. Is the API running?" },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <Box sx={{ position: "fixed", bottom: 25, right: 25, zIndex: 1300 }}>
            {isOpen && (
                <Paper
                    elevation={6}
                    sx={{
                        width: 320,
                        height: 420,
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: 3,
                        overflow: "hidden",
                        mb: 2,
                    }}
                >
                    <Box
                        sx={{
                            bgcolor: "primary.main",
                            color: "white",
                            px: 2,
                            py: 1.5,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Typography variant="subtitle1" fontWeight="bold">
                            EventEase Assistant
                        </Typography>
                        <IconButton size="small" onClick={closeChat} sx={{ color: "white" }}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </Box>

                    <Box sx={{ flex: 1, p: 1.5, overflowY: "auto", display: "flex", flexDirection: "column", gap: 1 }}>
                        {messages.map((msg, i) => (
                            <Box
                                key={i}
                                sx={{
                                    alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                                    bgcolor: msg.sender === "user" ? "primary.main" : "grey.100",
                                    color: msg.sender === "user" ? "white" : "text.primary",
                                    px: 1.5,
                                    py: 1,
                                    borderRadius: 2,
                                    maxWidth: "80%",
                                    fontSize: 14,
                                }}
                            >
                                {msg.text}
                            </Box>
                        ))}
                        {loading && (
                            <Box sx={{ alignSelf: "flex-start", p: 1 }}>
                                <CircularProgress size={16} />
                            </Box>
                        )}
                        <div ref={messagesEndRef} />
                    </Box>

                    <Box sx={{ display: "flex", gap: 1, p: 1, borderTop: "1px solid #eee" }}>
                        <TextField
                            size="small"
                            fullWidth
                            placeholder="Type a message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            disabled={loading}
                        />
                        <Button variant="contained" onClick={sendMessage} disabled={loading}>
                            Send
                        </Button>
                    </Box>
                </Paper>
            )}

            <Fab color="primary" onClick={toggleChat}>
                {isOpen ? <CloseIcon /> : <SmartToyIcon />}
            </Fab>
        </Box>
    );
}

export default FloatingAIButton;