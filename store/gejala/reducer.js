import {
  GET_SYMPTOMS_REQUEST,
  GET_SYMPTOMS_SUCCESS,
  GET_SYMPTOMS_ERROR,
} from '../types'

const INIT_STATE = {
  data: [],
  error: null,
  isLoading: false,
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_SYMPTOMS_REQUEST:
      return { ...state, isLoading: true, error: null }
    case GET_SYMPTOMS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.payload,
      }
    case GET_SYMPTOMS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }

    default:
      return { ...state }
  }
}
