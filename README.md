🎉 EventEase AI

AI-powered event discovery, planning and booking platform built by Aniket Agvane.

EventEase AI is a modern event management and booking platform that helps users discover events, explore event packages, search for suitable options, register and log in, manage their profile, and interact with an integrated AI Assistant.

The project is split into a React/Vite frontend and an ASP.NET Core Web API backend.

🔗 Project Links

Frontend: https://github.com/aniketagvane3232/eventease-client

Backend: https://github.com/aniketagvane3232/eventease-server

Live Frontend: https://eventease-client.vercel.app/

✨ Features

🎉 Event Discovery — browse available events and event categories.

📦 Event Packages — explore event packages and services.

🔎 Event Search — find relevant events and packages.

🤖 AI Assistant — get assistance with event-related questions and planning.

👤 Authentication — Sign Up and Login flows.

📅 Event Booking — select and book events.

📋 Booking Management — manage event bookings.

👤 Profile Management — manage user profile information.

📱 Responsive UI — designed for desktop, tablet and mobile screens.

🔄 Frontend / Backend Integration — React frontend communicates with the ASP.NET Core API.

🛠️ Tech Stack

Frontend

React

Vite

JavaScript

Material UI

React Router

Axios

CSS

Backend

ASP.NET Core Web API

C#

.NET

Entity Framework Core

REST APIs

Database

JWT Authentication

The backend repository contains the API controllers, models, data access, authentication and application services used by EventEase.

🏗️ Architecture

The overall request flow is:

User → React Frontend → ASP.NET Core API → Database / AI Services

                         ┌──────────────────────┐
                         │        USER          │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │   React + Vite       │
                         │      Frontend        │
                         │     Material UI      │
                         └──────────┬───────────┘
                                    │
                              Axios / REST
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │   ASP.NET Core API   │
                         │       Backend        │
                         └──────────┬───────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    │               │               │
                    ▼               ▼               ▼
              ┌──────────┐   ┌──────────┐   ┌──────────────┐
              │  Users   │   │  Events  │   │   Bookings   │
              └──────────┘   └──────────┘   └──────────────┘
                                    │
                                    ▼
                              ┌───────────┐
                              │ Database  │
                              └───────────┘

Main Components

Component

Responsibility

React + Vite

User interface and client-side application

Material UI

Interface components and styling

Axios

HTTP communication with the backend

ASP.NET Core API

Authentication, business logic and REST endpoints

Entity Framework Core

Database access

Database

Persistent application data

JWT

Authentication and authorization

AI Assistant

Event-related AI assistance

📸 Screenshots

🏠 Home Page

<p align="center">
  <img src="assets/home.png" alt="EventEase Home Page" width="850"/>
</p>

🎉 Event Discovery

<p align="center">
  <img src="assets/home_1.png" alt="EventEase Event Discovery" width="850"/>
</p>

📅 Events

<p align="center">
  <img src="assets/event.png" alt="EventEase Events" width="850"/>
</p>

📝 Registration

<p align="center">
  <img src="assets/register.png" alt="EventEase Registration" width="850"/>
</p>

🚀 Getting Started

Prerequisites

Make sure you have:

Node.js and npm

.NET SDK

Database Server

Git

1. Clone the Frontend

git clone https://github.com/aniketagvane3232/eventease-client.git
cd eventease-client

2. Install Frontend Dependencies

npm install

3. Configure the Frontend

Create/update your environment file according to the backend API configuration.

Example:

VITE_API_URL=http://localhost:5000

4. Start the Frontend

npm run dev

Then open the local Vite URL shown in your terminal, usually:

http://localhost:5173

⚙️ Backend Setup

The backend is maintained separately.

Backend Repository

👉 https://github.com/aniketagvane3232/eventease-server

Clone it with:

git clone https://github.com/aniketagvane3232/eventease-server.git
cd eventease-server

Restore dependencies:

dotnet restore

Run the ASP.NET Core API:

dotnet run

Configure the required database and application settings according to the backend project configuration.

Important: Never commit real database passwords, JWT secrets or API keys to GitHub.

For complete backend configuration and API implementation, see the backend repository.

🔌 API / Application Flow

A typical application request works like this:

┌────────────────┐
│      User      │
└───────┬────────┘
        │
        ▼
┌────────────────────┐
│ React + Vite UI    │
│ Material UI        │
└────────┬───────────┘
         │ Axios / REST
         ▼
┌────────────────────┐
│ ASP.NET Core API   │
│ Backend            │
└────────┬───────────┘
         │
    ┌────┴───────────┐
    ▼                ▼
┌───────────┐   ┌───────────────┐
│ Database  │   │ AI Assistant  │
│           │   │ Services      │
└───────────┘   └───────────────┘

📁 Frontend Structure

eventease-client/
├── assets/
│   ├── event.png
│   ├── home.png
│   ├── home_1.png
│   └── register.png
├── public/
├── src/
├── package.json
├── vite.config.js
└── README.md

The exact folder structure may evolve as the project grows.

📁 Backend Structure

eventease-server/
├── server/
│   ├── Controllers/
│   ├── DTOs/
│   ├── Data/
│   ├── Migrations/
│   ├── Models/
│   ├── Properties/
│   ├── Program.cs
│   └── appsettings.json
├── server.slnx
└── README.md

The exact backend structure may evolve as the project grows.

🌐 Deployment

The frontend is deployed on Vercel.

Live Frontend: https://eventease-client.vercel.app/

The backend is maintained in the separate repository and can be deployed independently.

Backend: https://github.com/aniketagvane3232/eventease-server

🎯 Project Goals

EventEase AI was created to simplify event discovery and planning by combining:

Event discovery

Event packages

Event search

AI-powered assistance

User authentication

Event booking

Booking management

Responsive user experience

Instead of searching across multiple platforms, the goal is to provide users with a single platform where they can discover, plan and book events more conveniently.

👨‍💻 Author

Aniket Agvane

Built and maintained by Aniket Agvane.

GitHub: https://github.com/aniketagvane3232

Frontend: https://github.com/aniketagvane3232/eventease-client

Backend: https://github.com/aniketagvane3232/eventease-server

🤝 Contributing

Contributions and suggestions are welcome.

# Fork the repository
# Create a feature branch
git checkout -b feature/my-feature

# Make your changes
git add .
git commit -m "Add my feature"

# Push your branch
git push origin feature/my-feature

Then open a Pull Request on GitHub.

⭐ Support

If you like EventEase AI, consider giving the repository a ⭐ on GitHub.

Thanks for checking out my project! 🚀

🚀 Built with passion by Aniket Agvane

EventEase AI — Discover. Plan. Book. Celebrate.
