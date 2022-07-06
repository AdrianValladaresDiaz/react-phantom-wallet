import { solana } from "./solana";

export interface customWindow extends Window {
  solana: solana;
}
