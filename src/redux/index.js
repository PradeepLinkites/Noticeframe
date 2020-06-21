import { combineReducers } from 'redux';

// Our custom reducers
// We need to import each one here and add them to the combiner at the bottom
import user from './user/reducer';
import event from './event/reducer';
import setting from './setting/reducer';
import category from './category/reducer';


// Combine all
const appReducer = combineReducers({
  user,
  event,
  setting,
  category,
});

// Setup root reducer
const rootReducer = (state, action) => {
  const newState = (action.type === 'RESET') ? undefined : state;
  return appReducer(newState, action);
};

export default rootReducer;
