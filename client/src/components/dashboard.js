import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../actions/userAction';
import {
  getAllTodos,
  addNewTodo,
  completeTodo,
  incompleteTodo,
  deleteTodo,
  editTodo,
} from '../actions/todoAction';
import Loader from './loader';
import {
  TODO_COMPLETE_RESET,
  TODO_DELETE_RESET,
  TODO_INCOMPLETE_RESET,
  TODO_UPDATE_RESET,
} from '../constants/todoConstant';

const Dashboard = ({ history }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const [todoId, setTodoId] = useState('');
  const [updateTitle, setupdateTitle] = useState('');
  const [updateDesc, setupdateDesc] = useState('');

  const [show, setShow] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const todoItems = useSelector((state) => state.todoItems);
  const { loading: loadingItems, error: errorItems, todos } = todoItems;

  const addTodoItem = useSelector((state) => state.addTodoItem);
  const {
    loading: loadingAddTodo,
    error: errorAddTodo,
    success: successAddTodo,
  } = addTodoItem;

  const todoComplete = useSelector((state) => state.todoComplete);
  const { success: completeSuccess } = todoComplete;

  const todoInComplete = useSelector((state) => state.todoInComplete);
  const { success: incompleteSuccess } = todoInComplete;

  const todoDelete = useSelector((state) => state.todoDelete);
  const { success: deleteSuccess } = todoDelete;

  const todoEdit = useSelector((state) => state.todoEdit);
  const { success: editSuccess } = todoEdit;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }

    dispatch(getAllTodos());

    if (successAddTodo) {
      setTitle('');
      setDesc('');
    }
  }, [
    dispatch,
    userInfo,
    history,
    successAddTodo,
    completeSuccess,
    incompleteSuccess,
    deleteSuccess,
    editSuccess,
  ]);

  const logoutHandler = () => {
    dispatch(logoutUser());
  };

  const addTodoHandler = () => {
    dispatch(addNewTodo(title, desc));
  };

  const completeHandler = (id) => {
    dispatch(completeTodo(id));
    // dispatch({ type: TODO_COMPLETE_RESET });
  };

  const incompleteHandler = (id) => {
    dispatch(incompleteTodo(id));
    dispatch({ type: TODO_INCOMPLETE_RESET });
  };

  const deleteHandler = (id) => {
    dispatch(deleteTodo(id));
    dispatch({ type: TODO_DELETE_RESET });
  };

  const editTodoHandler = () => {
    dispatch(editTodo(todoId, updateTitle, updateDesc));
    dispatch({ type: TODO_UPDATE_RESET });
    setShow(false);
  };

  const findTodoItem = (id) => {
    if (todos) {
      todos.forEach((d) => {
        if (d._id === id) {
          setTodoId(d._id);
          setupdateTitle(d.title);
          setupdateDesc(d.description);
        }
      });
    }
  };

  const handleShow = (id) => {
    findTodoItem(id);
    setShow(true);
  };
  const handleClose = () => setShow(false);

  return (
    <Container>
      <Row className="p-3" style={{ backgroundColor: 'rgb(230 230 230)' }}>
        <Col md={11}>
          <h2>WelCome BacK! {userInfo && userInfo.email}</h2>
        </Col>
        <Col md={1}>
          <Button variant="outline-danger" onClick={logoutHandler}>
            Logout
          </Button>
        </Col>
      </Row>

      <Row className="p-3">
        <Col md={3}>
          <h3>Add To Do</h3>
          <Form>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                placeholder="Enter a title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                row={3}
                placeholder="To Do description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button onClick={addTodoHandler} className="btn-block">
              ADD
            </Button>
          </Form>
          {loadingAddTodo ? (
            <Loader />
          ) : (
            errorAddTodo && <Alert variant="danger">{errorAddTodo}</Alert>
          )}
        </Col>
        <Col md={9}>
          <h3>To Do List</h3>
          <table className="table">
            <thead>
              <tr>
                <th style={{ width: '20%' }} scope="col">
                  Title
                </th>
                <th style={{ width: '60%' }} scope="col">
                  Description
                </th>
                <th style={{ textAlign: 'center', width: '20%' }} scope="col">
                  Complete/Incomplete/Edit/Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {todos &&
                todos.map((todo) => (
                  <tr key={todo._id}>
                    {todo.done ? (
                      <>
                        <td style={{ color: '#ddd', width: '20%' }}>
                          <strike>{todo.title}</strike>
                        </td>

                        <td style={{ color: '#ddd', width: '60%' }}>
                          <strike>{todo.description} </strike>
                        </td>
                      </>
                    ) : (
                      <>
                        <td style={{ width: '20%' }}>{todo.title}</td>
                        <td style={{ width: '60%' }}>{todo.description}</td>
                      </>
                    )}
                    <td style={{ textAlign: 'center', width: '20%' }}>
                      <Button
                        onClick={() => completeHandler(todo._id && todo._id)}
                        className="mr-1"
                        variant="outline-success"
                        disabled={todo.done && true}
                      >
                        <i className="fas fa-check"></i>
                      </Button>
                      <Button
                        className="mr-1"
                        disabled={!todo.done && true}
                        onClick={() => incompleteHandler(todo._id)}
                        variant="outline-secondary"
                      >
                        <i className="fas fa-times"></i>
                      </Button>
                      <Button
                        className="mr-1"
                        onClick={() => handleShow(todo._id)}
                        variant="outline-info"
                      >
                        <i className="fas fa-edit"></i>
                      </Button>
                      <Button
                        onClick={() => deleteHandler(todo._id)}
                        variant="outline-danger"
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {loadingItems ? (
            <Loader />
          ) : (
            errorItems && <Alert variant="danger">{errorItems}</Alert>
          )}
          {todos && todos.length === 0 && (
            <Alert variant="danger">
              <i className="fas fa-exclamation-triangle"></i> No Items!
            </Alert>
          )}
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose} animation={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update To Do</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                placeholder="Enter a title"
                value={updateTitle}
                onChange={(e) => setupdateTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                row={3}
                placeholder="To Do description"
                value={updateDesc}
                onChange={(e) => setupdateDesc(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={editTodoHandler} className="btn-block">
            UPDATE
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Dashboard;
