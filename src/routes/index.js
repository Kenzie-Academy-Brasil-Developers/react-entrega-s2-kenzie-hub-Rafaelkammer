import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../components/Home";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";

function Routes() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <LoginPage />
          </Route>
          <Route path="/signup">
            <SignupPage />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
        </Switch>
      </Router>
    </>
  );
}
export default Routes;
