import { customWindow } from "../interfaces/custom.window";
// declare let window: customWindow

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
