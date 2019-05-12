import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Button, Container, Row, Col, Form } from "react-bootstrap";
import { handleAddQuestion } from "../actions/shared";
import { Redirect } from "react-router-dom";

class NewQuestion extends Component {
  state = {
    redirect: false
  };

  handleSubmit = e => {
    e.preventDefault();

    const optionOneText = e.target.optionOneText.value;
    const optionTwoText = e.target.optionTwoText.value;
    const { addQuestion } = this.props;

    if (!optionOneText || !optionTwoText) {
      alert("There was an error. Try again.");
      return;
    }

    addQuestion(optionOneText, optionTwoText);
    this.setState({ redirect: true });
  };

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to={"/"} />;
    }

    return (
      <Container>
        <Row className="mt-4">
          <Col md={{ span: 8, offset: 2 }}>
            <Card>
              <Card.Header style={{ textAlign: "center" }}>
                <h3>Create New Question</h3>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col>
                    <div style={{ fontSize: "1rem" }}>
                      Complete the question:
                    </div>
                    <Card.Title className="mt-4">
                      Would you rather...
                    </Card.Title>
                    <Form onSubmit={this.handleSubmit}>
                      <Form.Control
                        name="optionOneText"
                        type="text"
                        placeholder="Enter Option One Text Here"
                      />
                      <div
                        style={{
                          textAlign: "center",
                          fontWeight: "bold",
                          padding: "10px 0px"
                        }}
                      >
                        <span>OR</span>
                      </div>
                      <Form.Control
                        name="optionTwoText"
                        type="text"
                        placeholder="Enter Option Two Text Here"
                      />
                      <Button
                        type="submit"
                        variant="secondary"
                        size="lg"
                        block
                        className="mt-4"
                      >
                        Submit
                      </Button>
                    </Form>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

function mapStateToProps({ questions }) {
  return {
    questions
  };
}

const mapDispatchToProps = dispatch => ({
  addQuestion: (optionOneText, optionTwoText) =>
    dispatch(handleAddQuestion(optionOneText, optionTwoText))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewQuestion);
