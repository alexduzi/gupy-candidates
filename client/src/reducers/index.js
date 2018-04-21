import { combineReducers } from 'redux';
// import { reducer as reduxForm } from 'redux-form';
import candidateReducer from './candidateReducer';

export default combineReducers({
  candidates: candidateReducer
});
