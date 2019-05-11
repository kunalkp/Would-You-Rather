import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { setAuthedUser } from "../actions/authedUser";

class Login extends Component {
  handleSubmit = e => {
    e.preventDefault();

    let userId = e.target.account.value;
    let { dispatch } = this.props;

    dispatch(setAuthedUser(userId));

    let { from } = this.props.location.state ? this.props.location.state : "/";
    this.props.history.push(from);
  };

  render() {
    const { users } = this.props;
    return (
      <div className="container-fluid">
        <div className="row mt-4">
          <div className="col-6 offset-3 text-center">
            <h1>Login</h1>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="formAccountSelect" role="form">
                <Form.Label>Select an account: </Form.Label>
                <Form.Control
                  name="account"
                  as="select"
                  onChange={this.handleChange}
                >
                  {Object.values(users).map(user => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Button type="submit" variant="dark" size="lg" block>
                Login
              </Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users
  };
}

export default connect(mapStateToProps)(Login);
