import axios from 'axios';
import {
  GET_ALL_TODOS_REQUEST,
  GET_ALL_TODOS_SUCCESS,
  GET_ALL_TODOS_FAIL,
  ADD_NEW_TODO_REQUEST,
  ADD_NEW_TODO_SUCCESS,
  ADD_NEW_TODO_FAIL,
  TODO_COMPLETE_FAIL,
  TODO_INCOMPLETE_FAIL,
  TODO_DELETE,
  TODO_DELETE_FAIL,
  TODO_UPDATE_REQUEST,
  TODO_UPDATE_SUCCESS,
  TODO_UPDATE_FAIL,
  TODO_COMPLETE_REQUEST,
  TODO_COMPLETE_SUCCESS,
  TODO_INCOMPLETE_REQUEST,
  TODO_INCOMPLETE_SUCCESS,
} from '../constants/todoConstant';
import { baseURL } from '../shared/baseURL';

export const getAllTodos = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_ALL_TODOS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
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

export const addNewTodo = (title, description) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: ADD_NEW_TODO_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
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

export const completeTodo = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TODO_COMPLETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await fetch(`${baseURL}/api/todos/${id}/complete`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    })
      .then((res) => {
        dispatch({
          type: TODO_COMPLETE_SUCCESS,
        });
      })
      .catch((err) => {
        throw err;
      });

    /*  await axios.put(`${baseURL}/api/todos/${id}/complete`, config);     // don't know why axios is not sending payload

    dispatch({
      type: TODO_COMPLETE_SUCCESS,
    }); */
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

export const incompleteTodo = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: TODO_INCOMPLETE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await fetch(`${baseURL}/api/todos/${id}/incomplete`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    })
      .then((res) => {
        dispatch({
          type: TODO_INCOMPLETE_SUCCESS,
        });
      })
      .catch((err) => {
        throw err;
      });
  /*   await axios.patch(`${baseURL}/api/todos/${id}/incomplete`, config);

    dispatch({
      type: TODO_INCOMPLETE_SUCCESS,
    }); */
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

export const deleteTodo = (id) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
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

export const editTodo = (id, title, description) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: TODO_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
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
