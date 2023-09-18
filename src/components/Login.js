import React, { useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(["token"]);
  const [loginError, setLoginError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/v1/login", {
        username,
        password,
      });

      const { token, user_id } = response.data;
      setCookie("token", token, { path: "/" });
      setCookie("user_id", user_id, { path: "/" });

      window.location.href = "/";
    } catch (error) {
      if (error.response && error.response.data.message) {
        setLoginError(error.response.data.message);
      } else {
        setLoginError("Login failed. Please try again.");
      }
    }
  }

  return (
    <div>
      <h2>Login</h2>
      {loginError && <p style={{ color: "red" }}>{loginError}</p>}{" "}
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Login;
