import actionTypes from "./actionTypes";

export const loginUserAction = (publicKey: string) => ({
  type: actionTypes.loginUser,
  publicKey,
});

export const logoutUserAction = () => ({
  type: actionTypes.logoutUser,
});
