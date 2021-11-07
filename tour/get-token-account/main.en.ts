import { CONNECTION, TEST_MINT } from "../../helper/const";

import * as SPLToken from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";

// fetch token account info

// you can get token informations by a token address

async function main() {
  // we can use the function which lives in @solana/spl-token to fetch token account info
  // the parameters are, (connection, mint address, token program id, fee payer)
  // here we just want to fetch info, so we don't need to pass all infos
  let tokenAccountPubkey = new PublicKey("GfgZN2Nim5fbFhVJJpasAApsVzVrYzMmwKzNwjR3i58X")
  let tokenAccount = await (new SPLToken.Token(CONNECTION, null, SPLToken.TOKEN_PROGRAM_ID, null)).getAccountInfo(tokenAccountPubkey);
  console.log(tokenAccount);
}

main().then(
  () => process.exit(),
  (err) => {
    console.error(err);
    process.exit(-1);
  }
);
