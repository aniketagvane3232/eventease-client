import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChatProvider } from "../context/ChatContext";

import MainLayout from "../layouts/MainLayout";
import Booking from "../pages/Booking";
import Home from "../pages/Home";
import About from "../pages/About";
import Events from "../pages/Events";
import EventDetails from "../pages/EventDetails";
import Packages from "../pages/Packages";
import PackageDetails from "../pages/PackageDetails";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MyBookings from "../pages/MyBookings";
import AdminDashboard from "../pages/AdminDashboard";
import AdminPackages from "../pages/AdminPackages";
import AdminDates from "../pages/AdminDates";

function AppRoutes() {
    return (
        <BrowserRouter>
            <ChatProvider>
                <MainLayout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/events" element={<Events />} />
                        <Route path="/events/:id" element={<EventDetails />} />
                        <Route path="/packages/:id" element={<Packages />} />
                        <Route path="/package/:id" element={<PackageDetails />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/booking" element={<Booking />} />
                        <Route path="/my-bookings" element={<MyBookings />} />
                        <Route path="/admin" element={<AdminDashboard />} />
                        <Route path="/admin/packages" element={<AdminPackages />} />
                        <Route path="/admin/dates" element={<AdminDates />} />
                    </Routes>
                </MainLayout>
            </ChatProvider>
        </BrowserRouter>
    );
}

export default AppRoutes;