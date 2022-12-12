import React from "react";

function WelcomePage({ user, onLogout }) {
  return (
    <div>
      <h1>Welcome, {user.username}!</h1>
    </div>
  );
}

export default WelcomePage;
