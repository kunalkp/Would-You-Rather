import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { setAuthedUser } from "../actions/authedUser";

class AppNav extends Component {
  handleLogout = e => {
    this.props.dispatch(setAuthedUser(null));
  };

  render() {
    const { authedUser, users, location } = this.props;
    return (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand>WouldYouRather</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav activeKey={location.pathname}>
            <LinkContainer to="/" exact>
              <Nav.Link>DashBoard</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/add">
              <Nav.Link>New Question</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/leaderboard">
              <Nav.Link>LeaderBoard</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav className="ml-auto">
            {authedUser ? (
              <Fragment>
                <div
                  style={{
                    display: "block",
                    padding: "0.5rem 1rem 0.5rem 0",
                    color: "white"
                  }}
                >
                  Hello, {users[authedUser].name}
                </div>
                <div
                  style={{
                    display: "block",
                    padding: "0.3rem 0",
                    color: "white"
                  }}
                >
                  <img
                    style={{
                      height: 20,
                      width: 20,
                      display: "inline-block",
                      borderRadius: 50,
                      marginRight: 10
                    }}
                    src={users[authedUser].avatarURL}
                    alt="avatar"
                  />
                </div>
                <LinkContainer to="/">
                  <Nav.Link onClick={this.handleLogout}>Logout</Nav.Link>
                </LinkContainer>
              </Fragment>
            ) : null}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users
  };
}
export default withRouter(connect(mapStateToProps)(AppNav));
