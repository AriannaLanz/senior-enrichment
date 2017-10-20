import { combineReducers } from 'redux'
import campuses from './campus';
import students from './student';


const rootReducer = combineReducers({
campuses,
students
});

export default rootReducer
