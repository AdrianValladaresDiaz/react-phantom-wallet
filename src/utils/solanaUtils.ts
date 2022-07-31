import {
  Connection,
  PublicKey,
  clusterApiUrl,
  Commitment,
  ConfirmOptions,
  Cluster,
} from "@solana/web3.js";

import {
  AnchorProvider,
  Idl,
  Program,
  Wallet,
  web3,
} from "@project-serum/anchor";

import { Buffer } from "buffer";
import { customWindow } from "../interfaces/custom.window";
import idl from "./idl.json";
// import kp from "../.baseAccountKeypair.json";

window.Buffer = Buffer;

// const kp = JSON.parse(process.env.REAC_APP_SOLANA_KEYPAIR as string);
const kp = JSON.parse(process.env.REACT_APP_SOLANA_KEYPAIR as string);
// eslint-disable-next-line no-underscore-dangle
const arr = Object.values(kp._keypair.secretKey) as any;
const secret = new Uint8Array(arr);

const baseAccount = web3.Keypair.fromSecretKey(secret);
console.log(secret);
console.log(baseAccount);

// eslint-disable-next-line no-unused-vars
const { SystemProgram, Keypair } = web3;

export const phantomExists = () => {
  const win = window as unknown as customWindow;
  return !!win.solana?.isPhantom;
};

export const eagerlyConnectPhantom = async () => {
  try {
    const { solana } = window as unknown as customWindow;
    const res = await solana.connect({ onlyIfTrusted: true }); // Eagerly connect
    console.log(`Connected with public key ${res.publicKey.toString()}`);
    return res.publicKey;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getProvider = (
  preflightCommitment: Commitment,
  cluster: Cluster = "devnet"
) => {
  //
  const win = window as unknown as customWindow;

  // Set our network to devnet.
  const rpcEndpoint = clusterApiUrl(cluster);

  // Controls how we want to acknowledge when a transaction is "done".
  const opts = {
    preflightCommitment,
  };

  const connection = new Connection(
    rpcEndpoint,
    opts.preflightCommitment as Commitment
  );

  const provider = new AnchorProvider(
    connection,
    win.solana as unknown as Wallet,
    opts as ConfirmOptions
  );

  return provider;
};

export const createGifAccount = async () => {
  try {
    const provider = getProvider(
      process.env.REACT_APP_PREFLIGHT_COMMITMENT as Commitment,
      process.env.REACT_APP_SOLANA_CLUSTER as Cluster
    );

    // Get our program's id from the IDL file.
    const programID = new PublicKey(idl.metadata.address);

    const program = new Program(idl as Idl, programID, provider);

    const args = {
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [baseAccount],
    };

    // const tx = await program.methods.initialize(args).rpc();
    const tx = await program.rpc.initialize(args);
    console.log(
      `created baseAccount with key ${baseAccount.publicKey.toString()} in tx ${tx}`
    );
  } catch (e) {
    console.log(e);
  }
};

export const getGifs = async () => {
  // SystemProgram is a reference to the Solana runtime!

  // fill in the docs for this
  const provider = getProvider(
    process.env.REACT_APP_PREFLIGHT_COMMITMENT as Commitment,
    process.env.REACT_APP_SOLANA_CLUSTER as Cluster
  );

  // only uncomment this line if the account needs to be initialized
  // await createGifAccount();
  // Get our program's id from the IDL file.
  const programID = new PublicKey(idl.metadata.address);

  const program = new Program(idl as Idl, programID, provider);

  const account = await program.account.baseAccount.fetch(
    baseAccount.publicKey
  );

  console.log(`got account ${JSON.stringify(account)}`);
  return account.gifList;
};

export const sendGif = async (gif: string) => {
  console.log("called sendGif");
  console.log(`sending ${gif}`);
  try {
    const provider = getProvider(
      process.env.REACT_APP_PREFLIGHT_COMMITMENT as Commitment,
      process.env.REACT_APP_SOLANA_CLUSTER as Cluster
    );

    const programID = new PublicKey(idl.metadata.address);

    const program = new Program(idl as Idl, programID, provider);

    await program.rpc.addGif(gif, {
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
      },
    });
    console.log("GIF successfully sent to program", gif);
  } catch (e) {
    console.log(e);
  }
};
