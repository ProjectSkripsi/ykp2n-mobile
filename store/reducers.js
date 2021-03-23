import { combineReducers } from 'redux'
import symptoms from './gejala/reducer'
import auth from './auth/auth-reducer'

const reducers = combineReducers({
  auth,
  symptoms,
})

export default reducers
