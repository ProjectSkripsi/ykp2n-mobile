import {
  GET_SYMPTOMS_REQUEST,
  GET_SYMPTOMS_SUCCESS,
  GET_SYMPTOMS_ERROR,
} from '../types'

export const getSymptomsRequest = (callBack) => ({
  type: GET_SYMPTOMS_REQUEST,
  payload: { callBack },
})

export const getSymptomsSuccess = (response) => ({
  type: GET_SYMPTOMS_SUCCESS,
  payload: response,
})

export const getSymptomsError = (error) => ({
  type: GET_SYMPTOMS_ERROR,
  payload: { error },
})
