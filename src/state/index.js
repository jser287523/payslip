import { combineReducers } from 'redux';
import employee from './employee';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
    employee,
    form: formReducer
});

export default rootReducer;
