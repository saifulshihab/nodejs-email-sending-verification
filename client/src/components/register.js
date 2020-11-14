import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { registerUser } from '../actions/userAction';
import Loader from './loader';

const Register = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, success, message } = userRegister;

  useEffect(() => {}, [success]);

  const registerHandler = () => {
    dispatch(registerUser(email, password));
  };

  return (
    <Container>
      <Row className="mt-5 justify-content-center">
        <Col md={4} className="m-3 p-3" style={{border: '1px solid #ddd'}}>
          <Form>
            <h2>Register</h2>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Choose password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button onClick={registerHandler} className="btn-block btn-warning">
              Register
            </Button>
          </Form>
          <LinkContainer className="mt-3" to="/login">
            <Button
              type="button"
              className="btn-block"
              variant="outline-secondary"
            >
              Login
            </Button>
          </LinkContainer>
          <Row className="mt-3">
            <Col>
              {loading && <Loader />}
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{message}</Alert>}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
