import React, { useEffect } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import HomePage from "./screens/HomePage";
import Chat from "./screens/Chat/Chat";
import { useDispatch, useSelector } from "react-redux";
import paths from "./constants/pathConstants";
import { exchangeKeys } from "./store/auth";
import "semantic-ui-css/semantic.min.css";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(exchangeKeys());
  }, []);
  return (
    <Router>
      <Switch>
        <Route
          key="HomePage"
          exact
          path={paths.HOME_PAGE}
          component={HomePage}
        />
        <Route key="Chat" exact path={paths.CHAT} component={Chat} />
      </Switch>
    </Router>
  );
}

export default App;
