import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { getResetPasswordLink } from '../actions/userAction';
import Loader from './loader';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');

  const passResetLink = useSelector((state) => state.passResetLink);
  const { loading, error, message } = passResetLink;

  useEffect(() => {}, [dispatch]);

  const getPasswordResetLinkHandler = () => {
    if (email) {
      dispatch(getResetPasswordLink(email));
    }
  };

  return (
    <Container>
      <Row className="mt-5 justify-content-center">
        <Col md={4} className="m-3 p-3" style={{ border: '1px solid #ddd' }}>
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
              onClick={getPasswordResetLinkHandler}
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
            <Col>
              {loading ? (
                <Loader />
              ) : error ? (
                <Alert variant="danger">
                  <i className="fas fa-exclamation-triangle"></i>
                  {error}
                </Alert>
              ) : (
                message && <Alert variant="success">{message}</Alert>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPassword;
