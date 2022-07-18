import React, { useEffect, useState } from "react";
import "./App.scss";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { eagerlyConnectPhantom, phantomExists } from "./utils/solanaUtils";
import Button from "./components/Button/Button";
import { customWindow } from "./interfaces/custom.window";
import GifGrid from "./components/GifGrid/GifGrid";
import { MemoizedBackground } from "./components/Background/Background";
import twitterLogo from "./assets/twitter-logo.svg";

// Constants
const TWITTER_HANDLE = "_buildspace";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  const [walletAddress, setWalletAddress] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [gifList, setGifList] = useState<string[]>([]);

  useEffect(() => {
    const onLoad = async () => {
      if (phantomExists()) {
        console.log("phantom found");
        const publicKey = await eagerlyConnectPhantom();
        if (publicKey) {
          setWalletAddress(publicKey.toString());
        }
      }
    };

    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("load", onLoad);
    };
  }, []);

  useEffect(() => {
    (async () => {
      const gf = new GiphyFetch(process.env.REACT_APP_GIPHY_KEY as string);
      const gfs = await gf.trending({ offset: 10, limit: 6 });
      console.log(gfs);
      const gList = gfs.data.map((gif) => gif.images.fixed_height.url);
      setGifList(gList);
    })();
  }, []);

  const connectWallet = async () => {
    if (phantomExists()) {
      const { solana } = window as unknown as customWindow;
      const res = await solana.connect();
      console.log("Connected with public key", res.publicKey.toString());
      setWalletAddress(res.publicKey.toString());
    }
  };

  console.log(`wallet address is: ${JSON.stringify(walletAddress)}`);
  return (
    <div className="App">
      <MemoizedBackground />
      <div className="container">
        <div className="header-container">
          <p className="header">🏖 Summer Time Animations 🏖</p>
          <p className="sub-text">
            View your GIF collection in the metaverse ✨
          </p>
          {walletAddress ? (
            <>
              <p>you are logged in {walletAddress}</p>
              <GifGrid gifArr={gifList} />
            </>
          ) : (
            <Button onClick={connectWallet} content="CONNECT WALLET" />
          )}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
