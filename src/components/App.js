import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { useCookies } from "react-cookie";
import Login from "./Login";
import TripList from "./TripList";
import Register from "./Register";

function App() {
  const [cookies] = useCookies(["token"]);

  const isAuthenticated = cookies.token !== undefined;

  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          {isAuthenticated ? <Redirect to="/trips" /> : <Login />}
        </Route>
        <Route exact path="/">
          {isAuthenticated ? <TripList /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/register">
          {isAuthenticated ? <Redirect to="/trips" /> : <Register />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
