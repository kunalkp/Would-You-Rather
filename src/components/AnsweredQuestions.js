import React from "react";
import { Card, Button, ListGroup, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function AnsweredQuestions(props) {
  const { questions, users, authedUser } = props;
  const { answers } = users[authedUser];
  return (
    <div style={{ padding: 10, border: "1px solid #d8d8d8" }}>
      {Object.values(questions)
        .filter(ques => Object.keys(answers).includes(ques.id))
        .sort((a, b) => b.timestamp - a.timestamp)
        .map(ques => (
          <Card key={ques.id} className="mt-3">
            <Card.Header>
              {users[questions[ques.id].author].name} asks:
            </Card.Header>
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
                    src={users[questions[ques.id].author].avatarURL}
                    style={{ borderRadius: "200px", width: "85%" }}
                    alt="avatar"
                  />
                </Col>
                <Col>
                  <Card.Title>Would you rather...</Card.Title>

                  <ListGroup.Item>
                    ...{questions[ques.id][answers[ques.id]].text} ...
                  </ListGroup.Item>

                  <Link to={"questions/" + ques.id}>
                    <Button className="mt-2" variant="secondary">
                      View Poll
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))}
    </div>
  );
}

export default AnsweredQuestions;
