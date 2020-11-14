import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import Loader from './loader';
import { resetPassword } from '../actions/userAction';

const CreateNewPassword = ({ match }) => {
  const dispatch = useDispatch();

  const [newPass, setNewPass] = useState('');
  const [conPass, setConPass] = useState('');

  const token = match.params.token;

  const passReset = useSelector((state) => state.passReset);
  const { loading, error, message } = passReset;

  useEffect(() => {}, [dispatch]);

  const resetPasswordHandler = () => {
    dispatch(resetPassword(token, newPass, conPass));
  };

  return (
    <Container>
      <Row className="mt-5 justify-content-center">
        <Col md={4} className="m-3 p-3" style={{ border: '1px solid #ddd' }}>
          <Form>
            <h2>Reset Password</h2>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Create new password"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Retype new password"
                value={conPass}
                onChange={(e) => setConPass(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button
              onClick={resetPasswordHandler}
              className="btn-block btn-warning"
            >
              RESET
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

export default CreateNewPassword;
