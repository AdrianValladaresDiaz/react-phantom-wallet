import { customWindow } from "../interfaces/custom.window";
// declare let window: customWindow

export const phantomExists = () => {
  const win = window as unknown as customWindow;
  return !!win.solana?.isPhantom;
};

export const phantomConnected = async () => {
  try {
    const { solana } = window as unknown as customWindow;
    console.log(solana);
    const res = await solana.connect({ onlyIfTrusted: true });
    console.log(res);
  } catch (e) {
    console.log(e);
  }
};
