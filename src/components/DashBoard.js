import React, { Component } from "react";
import { connect } from "react-redux";
import { Tabs, Tab, Row, Container, Col } from "react-bootstrap";
import QuestionsList from "./QuestionsList";
import AnsweredQuestions from "./AnsweredQuestions";

class DashBoard extends Component {
  render() {
    const { questions, users, authedUser } = this.props;
    return (
      <Container>
        <Row className="mt-4">
          <Col md={{ span: 8, offset: 2 }}>
            <Tabs defaultActiveKey="unanswered">
              <Tab eventKey="unanswered" title="Unanswered Questions">
                <QuestionsList questions={questions} users={users} />
              </Tab>
              <Tab eventKey="answered" title="Answered Questions">
                <AnsweredQuestions
                  questions={questions}
                  users={users}
                  authedUser={authedUser}
                />
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    );
  }
}

function mapStateToProps({ questions, users, authedUser }) {
  return {
    questions,
    users,
    authedUser
  };
}

export default connect(mapStateToProps)(DashBoard);
