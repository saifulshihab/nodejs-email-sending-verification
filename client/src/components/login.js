import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { loginUser } from '../actions/userAction';
import Loader from './loader';

const Login = ({ history }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, success, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push('/dash');
    }
  }, [dispatch, success, userInfo, history]);

  const loginHandler = () => {
    dispatch(loginUser(email, password));
  };
  return (
    <Container>
      <Row className="mt-5">
        <Col md={4} className="m-3 p-3">
          <Form>
            <h2>Login</h2>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
              ></Form.Control>
            </Form.Group>
            <Button onClick={loginHandler} className="btn-block btn-warning">
              Login
            </Button>
          </Form>
          <LinkContainer className="mt-3" to="/register">
            <Button className="btn-block" variant="outline-secondary">
              Don't have account? Register now!
            </Button>
          </LinkContainer>
          <Row className="mt-3">
            <Col>
              {loading && <Loader />}
              {error && (
                <Alert variant="danger">{`Invalid Email or Password!`}</Alert>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
