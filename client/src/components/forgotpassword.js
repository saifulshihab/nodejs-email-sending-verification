import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  return (
    <Container>
      <Row className="mt-5 justify-content-center">
        <Col md={4} className="m-3 p-3" style={{border: '1px solid #ddd'}}>
          <Form>
            <h2>Recover Password</h2>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your registered email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button
              onClick={'registerHandler'}
              className="btn-block btn-warning"
            >
              Get Reset Link
            </Button>
          </Form>
          <LinkContainer className="mt-3" to="/login">
            <Button
              type="button"
              className="btn-block"
              variant="outline-secondary"
            >
              Back to Login
            </Button>
          </LinkContainer>
          <Row className="mt-3">
            <Col></Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPassword;
