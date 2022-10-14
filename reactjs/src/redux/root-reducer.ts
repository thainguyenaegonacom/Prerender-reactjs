import { combineReducers } from 'redux';
import homeReducer from './home/reducer';
import blogsReducer from './blogs/reducer';
import productReducer from './product/reducer';
import userReducer from './auth/reducer';
import navReducer from './nav/reducer';

const rootReducer = combineReducers({
  userReducer,
  homeReducer,
  blogsReducer,
  productReducer,
  navReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
