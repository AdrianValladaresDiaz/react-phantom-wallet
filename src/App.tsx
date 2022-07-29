import React, { useEffect, useReducer, useState } from "react";
import "./App.scss";
// import { GiphyFetch } from "@giphy/js-fetch-api";
import {
  eagerlyConnectPhantom,
  getGifs,
  phantomExists,
} from "./utils/solanaUtils";
import Button from "./components/Button/Button";
import { customWindow } from "./interfaces/custom.window";
import GifGrid from "./components/GifGrid/GifGrid";
import userReducer, { context } from "./state/userState/userContext";
import { loginUserAction } from "./state/userState/actionCreators";
import Layout from "./components/Layout/Layout";

const App = () => {
  const [gifList, setGifList] = useState<string[]>([]);
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

  // // Ftching random gifs
  // useEffect(() => {
  //   (async () => {
  //     const gf = new GiphyFetch(process.env.REACT_APP_GIPHY_KEY as string);
  //     const gfs = await gf.trending({ offset: 10, limit: 30 });
  //     console.log(gfs);
  //     const gList = gfs.data.map((gif) => gif.images.fixed_height.url);
  //     setGifList(gList);
  //   })();
  // }, []);

  useEffect(() => {
    (async () => {
      try {
        if (userState.loggedIn) {
          const gifs = await getGifs();
          setGifList(gifs);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, [userState.loggedIn]);

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
            <GifGrid gifArr={gifList} />
          ) : (
            <Button onClick={connectWallet} content="CONNECT WALLET" />
          )}
        </Layout>
      </div>
    </context.Provider>
  );
};

export default App;
