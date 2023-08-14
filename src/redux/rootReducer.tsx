import {combineReducers} from 'redux';
import {ListReducer} from './list/reducer';
import {DetailReducer} from './detail/reducer';
import {AbilityReducer} from './ability/reducer';

const rootReducer = combineReducers({
  list: ListReducer,
  detail: DetailReducer,
  ability: AbilityReducer,
});
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
