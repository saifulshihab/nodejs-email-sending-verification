import axios from 'axios';
import {
  GET_ALL_TODOS_REQUEST,
  GET_ALL_TODOS_SUCCESS,
  GET_ALL_TODOS_FAIL,
  ADD_NEW_TODO_REQUEST,
  ADD_NEW_TODO_SUCCESS,
  ADD_NEW_TODO_FAIL,
  TODO_COMPLETE,
  TODO_COMPLETE_FAIL,
  TODO_INCOMPLETE,
  TODO_INCOMPLETE_FAIL,
  TODO_DELETE,
  TODO_DELETE_FAIL,
  TODO_UPDATE_REQUEST,
  TODO_UPDATE_SUCCESS,
  TODO_UPDATE_FAIL,
} from '../constants/todoConstant';
import { baseURL } from '../shared/baseURL';

export const getAllTodos = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_ALL_TODOS_REQUEST,
    });

    const config = {
      headers: {},
    };

    const { data } = await axios.get(`${baseURL}/api/todos`, config);

    dispatch({
      type: GET_ALL_TODOS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_TODOS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addNewTodo = (title, description) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_NEW_TODO_REQUEST,
    });

    const config = {
      headers: {},
    };

    const { data } = await axios.post(
      `${baseURL}/api/todos`,
      { title, description },
      config
    );

    dispatch({
      type: ADD_NEW_TODO_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_NEW_TODO_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const completeTodo = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {},
    };

    await axios.put(`${baseURL}/api/todos/${id}/complete`, config);

    dispatch({
      type: TODO_COMPLETE,
    });
  } catch (error) {
    dispatch({
      type: TODO_COMPLETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const incompleteTodo = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {},
    };

    await axios.put(`${baseURL}/api/todos/${id}/incomplete`, config);

    dispatch({
      type: TODO_INCOMPLETE,
    });
  } catch (error) {
    dispatch({
      type: TODO_INCOMPLETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteTodo = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {},
    };

    await axios.delete(`${baseURL}/api/todos/${id}`, config);

    dispatch({
      type: TODO_DELETE,
    });
  } catch (error) {
    dispatch({
      type: TODO_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const editTodo = (id, title, description) => async (dispatch) => {
  try {
    dispatch({ type: TODO_UPDATE_REQUEST });

    const config = {
      headers: {},
    };

    await axios.put(
      `${baseURL}/api/todos/${id}`,
      { title, description },
      config
    );

    dispatch({
      type: TODO_UPDATE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: TODO_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
