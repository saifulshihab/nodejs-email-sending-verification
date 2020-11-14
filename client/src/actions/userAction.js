import axios from 'axios';
import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  PASSWORD_RESET_LINK_REQUEST,
  PASSWORD_RESET_LINK_FAIL,
  PASSWORD_RESET_LINK_SUCCESS,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
} from '../constants/userConstanst';
import { baseURL } from '../shared/baseURL';

export const registerUser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      `${baseURL}/api/users/register`,
      { email, password },
      config
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      `${baseURL}/api/users/login`,
      { email, password },
      config
    );

    if (email) localStorage.setItem('userInfo', JSON.stringify(data));

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGOUT,
    });
    localStorage.removeItem('userInfo');
  } catch (error) {
    dispatch({
      type: USER_LOGOUT,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getResetPasswordLink = (email) => async (dispatch) => {
  try {
    dispatch({
      type: PASSWORD_RESET_LINK_REQUEST,
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      `${baseURL}/api/users/getResetPasswordLink`,
      { email },
      config
    );
    dispatch({
      type: PASSWORD_RESET_LINK_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: PASSWORD_RESET_LINK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const resetPassword = (token, newPass, conPass) => async (dispatch) => {
  try {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      `${baseURL}/api/users/resetPassword/${token}`,
      { newPass, conPass },
      config
    );

    dispatch({
      type: RESET_PASSWORD_SUCCESS,
      payload: data.status,
    });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
