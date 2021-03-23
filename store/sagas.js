import { all } from 'redux-saga/effects'
import authSaga from './auth/saga'
import symptomSaga from './gejala/saga'

export default function* rootSaga(getState) {
  yield all([authSaga(), symptomSaga()])
}
