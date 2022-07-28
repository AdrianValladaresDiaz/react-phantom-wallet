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

import { customWindow } from "../interfaces/custom.window";
import idl from "./idl.json";
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
  const provider = getProvider(
    process.env.REACT_APP_PREFLIGHT_COMMITMENT as Commitment,
    process.env.REACT_APP_SOLANA_CLUSTER as Cluster
  );

  // Get our program's id from the IDL file.
  const programID = new PublicKey(idl.metadata.address);

  const program = new Program(idl as Idl, programID, provider);
  const baseAccount = Keypair.generate();

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

  return baseAccount;
};

export const getGifs = async () => {
  // SystemProgram is a reference to the Solana runtime!

  // fill in the docs for this
  const provider = getProvider(
    process.env.REACT_APP_PREFLIGHT_COMMITMENT as Commitment,
    process.env.REACT_APP_SOLANA_CLUSTER as Cluster
  );

  // Create a keypair for the account that will hold the GIF data.
  // const baseAccount = Keypair.generate();
  const baseAccount = await createGifAccount();

  // Get our program's id from the IDL file.
  const programID = new PublicKey(idl.metadata.address);

  const program = new Program(idl as Idl, programID, provider);
  const account = await program.account.baseAccount.fetch(
    baseAccount.publicKey
  );

  console.log(`got account ${JSON.stringify(account)}`);
  return account.gifList;
};
