# 🎉 EventEase AI – Frontend

> AI-powered event discovery and booking platform built by **Aniket Dada Agvane**.

EventEase AI is a modern event booking platform designed to make event discovery, package exploration, and booking easier for users.

The platform provides an intuitive and responsive interface where users can explore different event categories, discover event packages, register and log in, and interact with AI-powered assistance.

---

## 🌐 Live Demo

🚀 **Live Application**

### 👉 https://eventease-client.vercel.app/

[Open EventEase AI Live](https://eventease-client.vercel.app/)

---

## 🔗 Project Repositories

### 🎨 Frontend

https://github.com/aniketagvane3232/eventease-client

### ⚙️ Backend

https://github.com/aniketagvane3232/eventease-server

---

# ✨ Features

- 🏠 Modern and responsive home page
- 🎉 Explore different event categories
- 💍 Wedding event packages
- 🎂 Birthday event packages
- 🏢 Corporate event packages
- 💖 Anniversary event packages
- 💍 Engagement event packages
- 📦 Explore event packages
- 🔎 Search and discover events
- 📅 Event booking functionality
- 📋 Booking management
- 🔐 User registration
- 🔑 User login
- 👤 User profile
- 🤖 AI-powered EventEase Assistant
- 📱 Responsive design
- ⚡ Fast Vite development environment
- 🎨 Modern Material UI interface

---

# 🤖 AI Assistant

EventEase AI includes an AI-powered assistant designed to help users with event-related information.

The assistant can help users understand:

- Event categories
- Event packages
- Package information
- Event planning
- Booking-related questions
- General event-related queries

The goal is to make event discovery and planning more interactive and convenient.

---

# 🏗️ System Architecture

```text
                         ┌──────────────────────┐
                         │        USER          │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │   React Frontend     │
                         │      Vite + UI       │
                         │   Material UI        │
                         └──────────┬───────────┘
                                    │
                               Axios / REST
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │  ASP.NET Core API    │
                         │       Backend        │
                         └──────────┬───────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    │               │               │
                    ▼               ▼               ▼
             ┌────────────┐  ┌────────────┐  ┌────────────┐
             │   Users    │  │   Events   │  │  Bookings  │
             └────────────┘  └────────────┘  └────────────┘
                                    │
                                    ▼
                              ┌────────────┐
                              │  Database  │
                              └────────────┘
