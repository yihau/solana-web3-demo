import { CONNECTION, TEST_MINT } from "../../helper/const";

import * as SPLToken from "@solana/spl-token";

// fetch mint info

// you can get mint informations by a mint address

async function main() {
  // we can use the function which lives in @solana/spl-token to fetch mint info
  // the parameters are, (connection, mint address, token program id, fee payer)
  // here we just want to fetch info, so we don't need to pass fee payer
  let token = new SPLToken.Token(CONNECTION, TEST_MINT, SPLToken.TOKEN_PROGRAM_ID, null);
  let tokenInfo = await token.getMintInfo();
  console.log(tokenInfo);

  // you will find that the data not include name, symbol, image...
  // because in the begin, solana don't make these data write on chain
  // if you want to fetch these info, refer to
  // https://github.com/solana-labs/token-list
}

main().then(
  () => process.exit(),
  (err) => {
    console.error(err);
    process.exit(-1);
  }
);
