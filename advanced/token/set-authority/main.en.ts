import { Transaction } from "@solana/web3.js";
import { CONNECTION, TEST_MINT, FEE_PAYER } from "../../../helper/const";
import { TOKEN_PROGRAM_ID, Token } from "@solana/spl-token";

// you can set/update your account's auth
// there are 4 types => 'MintTokens' | 'FreezeAccount' | 'AccountOwner' | 'CloseAccount'
// MintTokens and FreezeAccount are for mint account
// AccountOwner and CloseAccount are for token account

async function main() {
  let tx = new Transaction();
  tx.add(
    Token.createSetAuthorityInstruction(
      TOKEN_PROGRAM_ID, // always token program.
      TEST_MINT, // mint acocunt or token account
      null, // new auth, if you want to turn off the auth, just pass null
      "MintTokens", // authority type, there are 4 types => 'MintTokens' | 'FreezeAccount' | 'AccountOwner' | 'CloseAccount'
      FEE_PAYER.publicKey, // original auth
      []
    )
  );
  tx.feePayer = FEE_PAYER.publicKey;
  console.log(`txhash: ${await CONNECTION.sendTransaction(tx, [FEE_PAYER])}`);
}

main().then(
  () => process.exit(),
  (err) => {
    console.error(err);
    process.exit(-1);
  }
);
