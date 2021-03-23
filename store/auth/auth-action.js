import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_ERROR,
} from '../types'

export const loginRequest = (email, password, callBack) => ({
  type: AUTH_LOGIN_REQUEST,
  payload: { email, password, callBack },
})

export const loginSuccess = (response) => ({
  type: AUTH_LOGIN_SUCCESS,
  payload: response,
})

export const loginError = (error) => ({
  type: AUTH_LOGIN_ERROR,
  payload: { error },
})
