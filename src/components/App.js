import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import LoadingBar from "react-redux-loading";
import Login from "./Login";
import NewQuestion from "./NewQuestion";
import AppNav from "./AppNav";
import DashBoard from "./DashBoard";
import Question from "./Question";
import LeaderBoard from "./LeaderBoard";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    const { loading, authedUser } = this.props;
    return (
      <Router>
        <Fragment>
          <AppNav />
          {loading === true ? (
            <LoadingBar />
          ) : (
            <Fragment>
              <Route path="/login" exact component={Login} />
              <AuthRoute
                path="/add"
                component={NewQuestion}
                authedUser={authedUser}
              />
              <AuthRoute
                path="/"
                exact
                component={DashBoard}
                authedUser={authedUser}
              />
              <AuthRoute
                path="/questions/:id"
                component={Question}
                authedUser={authedUser}
              />
              <AuthRoute
                path="/leaderboard"
                component={LeaderBoard}
                authedUser={authedUser}
              />
            </Fragment>
          )}
        </Fragment>
      </Router>
    );
  }
}

function AuthRoute({ component: Component, ...rest }) {
  const { authedUser } = rest;
  return (
    <Route
      {...rest}
      render={props =>
        authedUser !== null ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location.pathname }
            }}
          />
        )
      }
    />
  );
}

function mapStateToProps({ authedUser, loading }) {
  return {
    authedUser,
    loading
  };
}

export default connect(mapStateToProps)(App);
