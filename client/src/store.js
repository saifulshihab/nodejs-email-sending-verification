import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  passResetLinkReducer,
  passResetReducer,
  userLoginReducer,
  userRegisterReducer,
} from './reducer/userReducer';
import {
  addTodoItemReducer,
  todoCompleteReducer,
  todoDeleteReducer,
  todoEditReducer,
  todoInCompleteReducer,
  todoItemsReducer,
} from './reducer/todoReducer';

const initialState = {
  userLogin: {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
  },
};

const reducer = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  passResetLink: passResetLinkReducer,
  passReset: passResetReducer,
  todoItems: todoItemsReducer,
  addTodoItem: addTodoItemReducer,
  todoComplete: todoCompleteReducer,
  todoInComplete: todoInCompleteReducer,
  todoDelete: todoDeleteReducer,
  todoEdit: todoEditReducer,
});

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
