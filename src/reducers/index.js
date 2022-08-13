import { combineReducers } from "redux";
import message from "./message";
import {authReducer} from '../pages/login/store/reducer';
import {memberReducer} from '../pages/members/store/reducers';

export default combineReducers({
  authReducer,
  memberReducer,
  message,
});
