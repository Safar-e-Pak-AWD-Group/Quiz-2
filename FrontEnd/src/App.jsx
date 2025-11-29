import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./component/Home/Home";
import Login from "./component/Login/Login";
import Signup from "./component/Signup/Signup";
import Nav from "./component/Nav/Nav";
import About from "./component/About/About";
import Contact from "./component/Contact/Contact";
import Booknow from "./component/BookNow/BookNow1";
import Services from "./component/Services/Services";
import Gallery from "./component/Gallery/Gallery";
import Destinations from "./component/Destinations/Destinations";
import Footer from "./component/Footer/Footer1";
import Dashboard from "./component/Dashboard/Dashboard";
import AdminPanel from "./component/AdminPanel/AdminPanel";
import "./style.css";

function App() {
  const userToken = localStorage.getItem("token");
  const adminToken = localStorage.getItem("adminToken");

  const isUserLoggedIn = !!userToken;
  const isAdminLoggedIn = !!adminToken;

  return (
    <Router>
      {/* Navbar visible only for users */}
      {isUserLoggedIn && <Nav />}

      <Routes>
        {/* Default route */}
        <Route
          path="/"
          element={
            isUserLoggedIn ? (
              <Navigate to="/home" />
            ) : isAdminLoggedIn ? (
              <Navigate to="/adminpanel" />
            ) : (
              <Login />
            )
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* User protected routes */}
        {isUserLoggedIn && (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/booknow" element={<Booknow />} />
            <Route path="/services" element={<Services />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/dash" element={<Dashboard />} />
          </>
        )}

        {/* Admin protected route */}
        {isAdminLoggedIn && <Route path="/adminpanel" element={<AdminPanel />} />}

        {/* Catch-all route */}
        <Route
          path="*"
          element={
            isUserLoggedIn ? (
              <Navigate to="/home" />
            ) : isAdminLoggedIn ? (
              <Navigate to="/adminpanel" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>

      {/* Footer only visible for users */}
      {isUserLoggedIn && <Footer />}
    </Router>
  );
}

export default App;
