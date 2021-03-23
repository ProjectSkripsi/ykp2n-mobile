import { all, call, fork, put, takeEvery } from 'redux-saga/effects'

import { AUTH_LOGIN_REQUEST } from '../types'
import { loginSuccess, loginError } from './auth-action'
import { loginService } from './services'
import { setItem } from '../../constants/utils'

function* loginSaga({ payload }) {
  const { email, password, callBack } = payload
  try {
    const response = yield call(loginService, email, password)
    if (callBack) {
      callBack(response)
    }
    yield put(loginSuccess(response.data))
    const result = response.data
    setItem('user', JSON.stringify(result))
    setItem('token', JSON.stringify(result.token))
  } catch (error) {
    if (callBack) {
      callBack(error)
    }
    yield put(loginError(error))
  }
}

export function* watchLoginSaga() {
  yield takeEvery(AUTH_LOGIN_REQUEST, loginSaga)
}

export default function* rootSaga() {
  yield all([fork(watchLoginSaga)])
}
