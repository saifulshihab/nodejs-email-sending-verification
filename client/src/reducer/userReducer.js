import {
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_REQUEST,
  USER_REGISTER_RESET,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_LOGOUT,
  PASSWORD_RESET_LINK_REQUEST,
  PASSWORD_RESET_LINK_SUCCESS,
  PASSWORD_RESET_LINK_FAIL,
  PASSWORD_RESET_LINK_RESET,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_RESET,
  RESET_PASSWORD_REQUEST,
} from '../constants/userConstanst';

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, success: true, message: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case USER_REGISTER_RESET:
      return {};
    default:
      return state;
  }
};

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const passResetLinkReducer = (state = {}, action) => {
  switch (action.type) {
    case PASSWORD_RESET_LINK_REQUEST:
      return { loading: true };
    case PASSWORD_RESET_LINK_SUCCESS:
      return { loading: false, message: action.payload };
    case PASSWORD_RESET_LINK_FAIL:
      return { loading: false, error: action.payload };
    case PASSWORD_RESET_LINK_RESET:
      return {};
    default:
      return state;
  }
};

export const passResetReducer = (state = {}, action) => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST:
      return { loading: true };
    case RESET_PASSWORD_SUCCESS:
      return { loading: false, message: action.payload };
    case RESET_PASSWORD_FAIL:
      return { loading: false, error: action.payload };
    case RESET_PASSWORD_RESET:
      return {};
    default:
      return state;
  }
};
