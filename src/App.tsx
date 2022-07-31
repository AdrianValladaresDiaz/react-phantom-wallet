import React, { useEffect, useReducer } from "react";
import "./App.scss";
// import { GiphyFetch } from "@giphy/js-fetch-api";
import { eagerlyConnectPhantom, phantomExists } from "./utils/solanaUtils";
import Button from "./components/Button/Button";
import { customWindow } from "./interfaces/custom.window";
import userReducer, { context } from "./state/userState/userContext";
import { loginUserAction } from "./state/userState/actionCreators";
import Layout from "./components/Layout/Layout";
import UserContent from "./components/UserContent/UserContent";

const App = () => {
  const [userState, userDispatch] = useReducer(userReducer, {
    user: null,
    loggedIn: false,
  });

  // Connecting to phantom wallet
  useEffect(() => {
    const tryConnectingPhantom = async () => {
      if (phantomExists()) {
        console.log("phantom found");
        const publicKey = await eagerlyConnectPhantom();
        if (publicKey) {
          console.log("dispatching key");
          userDispatch(loginUserAction(publicKey.toString()));
        }
      }
    };

    window.addEventListener("load", tryConnectingPhantom);

    return () => {
      window.removeEventListener("load", tryConnectingPhantom);
    };
  }, []);

  const connectWallet = async () => {
    if (phantomExists()) {
      const { solana } = window as unknown as customWindow;
      const res = await solana.connect();
      console.log("Connected with public key", res.publicKey.toString());
      userDispatch(loginUserAction(res.publicKey.toString()));
    }
  };

  return (
    // disabling eslint b/c dispatch is always stable.
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <context.Provider value={{ state: userState, dispatch: userDispatch }}>
      <div className="App">
        <Layout>
          {userState.loggedIn ? (
            <UserContent />
          ) : (
            <Button onClick={connectWallet} content="CONNECT WALLET" />
          )}
        </Layout>
      </div>
    </context.Provider>
  );
};

export default App;
