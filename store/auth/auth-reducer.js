import {
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_ERROR,
} from '../types'

const INIT_STATE = {
  user: null,
  error: null,
  isLoading: false,
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case AUTH_LOGIN_REQUEST:
      return { ...state, isLoading: true, error: null }
    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        user: action.payload,
      }
    case AUTH_LOGIN_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }

    default:
      return { ...state }
  }
}
