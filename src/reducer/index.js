import user from './user'
import category from './category'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    user: user,
    category: category
})

export default rootReducer