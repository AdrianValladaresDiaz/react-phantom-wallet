import React from "react";
import {
  AnyAction,
  loginUserAction,
  logoutUserAction,
} from "../../interfaces/actionInterfaces";
import actionTypes from "./actionTypes";

export type UserState = {
  user: string | null;
  loggedIn: boolean;
};

export const initialUserState = {
  user: null,
  loggedIn: false,
};

export const userReducer = (
  userState: UserState,
  action: AnyAction | loginUserAction | logoutUserAction
) => {
  let newUserState;
  switch (action.type) {
    case actionTypes.loginUser:
      newUserState = {
        ...userState,
        user: (action as loginUserAction).publicKey,
        loggedIn: true,
      };
      break;
    case actionTypes.logoutUser:
      newUserState = { ...userState, user: null, loggedIn: false };
      break;
    default:
      newUserState = { ...userState };
  }
  return newUserState;
};

export const UserContext = React.createContext<UserState | null>(null);

export default userReducer;
