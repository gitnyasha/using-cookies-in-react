import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

function TripList() {
  const [trips, setTrips] = useState([]);
  const [cookies] = useCookies(["token"]);
  const [bookingMessage, setBookingMessage] = useState("");

  useEffect(() => {
    const token = cookies.token;

    if (!token) {
      console.error("Token is missing");
      return;
    }

    axios
      .get("http://localhost:5000/v1/trips", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setTrips(response.data.trips);
      })
      .catch((error) => {
        console.error("Error fetching trips:", error);
      });
  }, [cookies.token]);

  const handleBookTrip = (tripId) => {
    const token = cookies.token;
    const userId = cookies.user_id;

    if (!token || !userId) {
      console.error("Token or user ID is missing");
      return;
    }

    axios
      .post(
        "http://localhost:5000/v1/bookings",
        { trip_id: tripId, user_id: userId },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((response) => {
        if (response.status === 201) {
          console.log(response.data.payment_response);
          if (
            response.data.payment_response &&
            response.data.payment_response.redirect_url
          ) {
            const redirectUrl = response.data.payment_response.redirect_url;
            window.location.href = redirectUrl;
          } else {
            setBookingMessage("Redirect URL not provided in the response!");
          }
        } else {
          setBookingMessage("Booking failed");
        }
      })
      .catch((error) => {
        setBookingMessage("Error booking a trip");
        console.log("Error booking trip:", error);
      });
  };

  return (
    <div>
      <h2>Trip List</h2>
      <ul>
        {trips.map((trip) => (
          <li key={trip.id}>
            {trip.name} - ${trip.price} - {""}
            <button onClick={() => handleBookTrip(trip.id)}>Book</button>
          </li>
        ))}
      </ul>
      {bookingMessage && <p>{bookingMessage}</p>}{" "}
      {/* Display booking success message */}
    </div>
  );
}

export default TripList;
