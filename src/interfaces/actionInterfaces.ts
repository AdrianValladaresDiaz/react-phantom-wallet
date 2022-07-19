export type AnyAction = {
  type: string;
};

export type loginUserAction = AnyAction & { publicKey: string };

export type logoutUserAction = AnyAction;
