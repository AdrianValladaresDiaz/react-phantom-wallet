import React, { useEffect, useState } from "react";
import twitterLogo from "./assets/twitter-logo.svg";
import "./App.scss";
import { eagerlyConnectPhantom, phantomExists } from "./utils/solanaUtils";
import Button from "./components/Button/Button";
import { customWindow } from "./interfaces/custom.window";
import GifGrid from "./components/GifGrid/GifGrid";

// Constants
const TWITTER_HANDLE = "_buildspace";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

// eslint-disable-next-line no-unused-vars
const TEST_GIFS = [
  "https://i.giphy.com/media/eIG0HfouRQJQr1wBzz/giphy.webp",
  "https://media3.giphy.com/media/L71a8LW2UrKwPaWNYM/giphy.gif?cid=ecf05e47rr9qizx2msjucl1xyvuu47d7kf25tqt2lvo024uo&rid=giphy.gif&ct=g",
  "https://media4.giphy.com/media/AeFmQjHMtEySooOc8K/giphy.gif?cid=ecf05e47qdzhdma2y3ugn32lkgi972z9mpfzocjj6z1ro4ec&rid=giphy.gif&ct=g",
  "https://i.giphy.com/media/PAqjdPkJLDsmBRSYUp/giphy.webp",
];

const App = () => {
  const [walletAddress, setWalletAddress] = useState("");

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
      <div className="background" />
      <div className="container">
        <div className="header-container">
          <p className="header">🏖 Summer Time Animations 🏖</p>
          <p className="sub-text">
            View your GIF collection in the metaverse ✨
          </p>
          {walletAddress ? (
            <>
              <p>you are logged in {walletAddress}</p>
              <GifGrid gifArr={TEST_GIFS} />
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
