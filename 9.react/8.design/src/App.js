import "./App.css";
import { Container, Row, Col, Badge, Alert, Button } from "react-bootstrap";

export default function App() {
  return (
    <div className="App">
      <Container className="mt-5">
        <Row>
          <Col>
            <Alert variant="info" className="text-center">
              <h1>React with Bootstrap</h1>
            </Alert>
          </Col>
        </Row>
        <Row>
          <Col>
            <Badge bg="secondary">New</Badge>
            <Badge bg="success">Success</Badge>
            <Badge bg="danger">danger</Badge>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
