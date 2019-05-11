import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function PageNotFound(props) {
  return (
    <Container>
      <Row className="mt-4">
        <Col md={{ span: 8, offset: 2 }} style={{ textAlign: "center" }}>
          <h3>404 error - page not found!</h3>
        </Col>
      </Row>
    </Container>
  );
}

export default PageNotFound;
