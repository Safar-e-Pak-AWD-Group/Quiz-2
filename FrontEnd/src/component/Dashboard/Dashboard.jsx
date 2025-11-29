import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import img1 from "../../assets/images/dashboard.jpg";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (!token || !savedUser) {
      navigate("/login");
      return;
    }

    const parsedUser = JSON.parse(savedUser);
    setUser(parsedUser);

    if (parsedUser._id || parsedUser.id) {
      fetchBookings(parsedUser._id || parsedUser.id);
    }
  }, [navigate]);

  // ✅ Fetch user bookings using fetch
  const fetchBookings = async (userId) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/bookings?userId=${userId}`
      );
      const data = await res.json();

      if (res.ok) {
        setBookings(data);
        console.log("✅ Bookings fetched:", data);
      } else {
        console.error("❌ Failed to fetch bookings:", data.message);
      }
    } catch (error) {
      console.error("❌ Error fetching bookings:", error);
    }
  };

  // 🗑 Delete booking handler (using fetch)
  const handleDelete = async (bookingId) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/bookings/${bookingId}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        setBookings(bookings.filter((b) => b._id !== bookingId));
        alert("Booking deleted successfully ✅");
      } else {
        const data = await res.json();
        alert(data.message || "Failed to delete booking. Try again!");
      }
    } catch (error) {
      console.error("❌ Error deleting booking:", error);
      alert("Network error. Try again!");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  if (!user) {
    return (
      <div className="loading-screen">
        <h2>Loading your dashboard...</h2>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* ===== Navbar ===== */}
      <nav className="dashboard-nav">
        <h2 className="logo">Safar-e-Pak Dashboard</h2>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </nav>

      {/* ===== Profile Section ===== */}
      <div className="profile-section">
        <img
          src={user.profileImage || img1}
          alt="Profile"
          className="profile-img"
        />
        <div className="profile-info">
          <h3>{user.fullName || user.name}</h3>
          <p>{user.email}</p>
        </div>
      </div>

      {/* ===== Bookings Section ===== */}
      <div className="booking-section">
        <h2>Your Bookings</h2>
        {bookings.length > 0 ? (
          <div className="booking-list">
            {bookings.map((booking) => (
              <div key={booking._id} className="booking-card">
                <h3>{booking.tripName || booking.destination}</h3>
                <p>
                  <strong>Travel Date:</strong> {booking.date}
                </p>
                <p>
                  <strong>Price:</strong> Rs {booking.price}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className={`status ${booking.status}`}>
                    {booking.status}
                  </span>
                </p>

                {/* 🗑 Delete Button */}
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(booking._id)}
                >
                  Delete Booking
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-bookings">No bookings found.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
