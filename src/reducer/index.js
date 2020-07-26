import user from './user'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    user: user
})

export default rootReducer