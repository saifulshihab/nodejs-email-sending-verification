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
  TODO_COMPLETE_RESET,
  TODO_INCOMPLETE_RESET,
  TODO_DELETE_RESET,
  TODO_UPDATE_REQUEST,
  TODO_UPDATE_SUCCESS,
  TODO_UPDATE_FAIL,
  TODO_UPDATE_RESET,
  TODO_COMPLETE_SUCCESS,
  TODO_COMPLETE_REQUEST,
  TODO_INCOMPLETE_REQUEST,
  TODO_INCOMPLETE_SUCCESS,
} from '../constants/todoConstant';

export const todoItemsReducer = (state = { todos: [] }, action) => {
  switch (action.type) {
    case GET_ALL_TODOS_REQUEST:
      return { loading: true };
    case GET_ALL_TODOS_SUCCESS:
      return { loading: false, todos: action.payload };
    case GET_ALL_TODOS_FAIL:
      return { loading: true, error: action.payload };
    default:
      return state;
  }
};

export const addTodoItemReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_NEW_TODO_REQUEST:
      return { loading: true };
    case ADD_NEW_TODO_SUCCESS:
      return { loading: false, success: true };
    case ADD_NEW_TODO_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const todoCompleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TODO_COMPLETE_REQUEST:
      return { loading: true };
    case TODO_COMPLETE_SUCCESS:
      return { loading: false, success: true };
    case TODO_COMPLETE_FAIL:
      return { error: action.payload };
    case TODO_COMPLETE_RESET:
      return {};
    default:
      return state;
  }
};

export const todoInCompleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TODO_INCOMPLETE_REQUEST:
      return { loading: true };
    case TODO_INCOMPLETE_SUCCESS:
      return { loading: false, success: true };
    case TODO_INCOMPLETE_FAIL:
      return { error: action.payload };
    case TODO_INCOMPLETE_RESET:
      return {};
    default:
      return state;
  }
};

export const todoDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TODO_DELETE:
      return { success: true };
    case TODO_DELETE_FAIL:
      return { error: action.payload };
    case TODO_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const todoEditReducer = (state = {}, action) => {
  switch (action.type) {
    case TODO_UPDATE_REQUEST:
      return { loading: true };
    case TODO_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case TODO_UPDATE_FAIL:
      return { error: action.payload };
    case TODO_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
