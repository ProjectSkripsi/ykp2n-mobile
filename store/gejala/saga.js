import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { GET_SYMPTOMS_REQUEST } from '../types'
import { getSymptomsError, getSymptomsSuccess } from './action'
import { getGejala } from './services'
import { setItem } from '../../constants/utils'

function* getSymptomsSaga({ payload }) {
  const { callBack } = payload
  try {
    const response = yield call(getGejala)
    if (callBack) {
      callBack(response)
    }
    yield put(getSymptomsSuccess(response.data))
  } catch (error) {
    if (callBack) {
      callBack(error)
    }
    yield put(getSymptomsError(error))
  }
}

export function* watchSymptomsSaga() {
  yield takeEvery(GET_SYMPTOMS_REQUEST, getSymptomsSaga)
}

export default function* rootSaga() {
  yield all([fork(watchSymptomsSaga)])
}
