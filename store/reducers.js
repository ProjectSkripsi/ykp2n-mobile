import { combineReducers } from 'redux'

import auth from './auth/auth-reducer'

const reducers = combineReducers({
  auth,
})

export default reducers
