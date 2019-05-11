import React from "react";
import { connect } from "react-redux";
import { Card, Container, Row, Col } from "react-bootstrap";

function LeaderBoard(props) {
  const { scores } = props;
  return (
    <Container>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          {scores.map(user => {
            const totalAnswers = Object.keys(user.answers).length;
            const totalQuestions = Object.keys(user.questions).length;
            const score = totalAnswers + totalQuestions;
            return (
              <Card key={user.id} className="mt-3">
                <Card.Body>
                  <Row>
                    <Col
                      md={{ span: 4 }}
                      style={{
                        textAlign: "center",
                        marginTop: "auto",
                        marginBottom: "auto"
                      }}
                    >
                      <img
                        src={user.avatarURL}
                        style={{ borderRadius: "200px", width: "55%" }}
                        alt="avatar"
                      />
                    </Col>
                    <Col>
                      <Row className="mt-3">
                        <Col md={{ span: 8 }}>
                          <h1>{user.name}</h1>
                          <h6 className="mt-4">
                            Answered questions: {totalAnswers}{" "}
                          </h6>
                          <h6>Created questions: {totalQuestions} </h6>
                        </Col>
                        <Col md={{ span: 4 }}>
                          <div
                            style={{
                              border: "1px solid #dfdfdf",
                              textAlign: "center"
                            }}
                          >
                            <h3
                              style={{
                                backgroundColor: "#f6f6f6",
                                padding: "20px"
                              }}
                            >
                              Score
                            </h3>
                            <div
                              style={{
                                fontSize: 26,
                                fontWeight: "bold",
                                padding: 10
                              }}
                            >
                              {score}
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            );
          })}
        </Col>
      </Row>
    </Container>
  );
}

function mapStateToProps({ users }) {
  return {
    scores: !users
      ? []
      : Object.values(users).sort((a, b) => {
          return (
            Object.keys(b.answers).length +
            Object.keys(b.questions).length -
            (Object.keys(a.answers).length + Object.keys(a.questions).length)
          );
        })
  };
}

export default connect(mapStateToProps)(LeaderBoard);
