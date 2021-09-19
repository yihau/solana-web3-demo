import { Transaction } from "@solana/web3.js";

import { CONNECTION, FEE_PAYER, TEST_MINT, ALICE_TOKEN_ADDRESS_1 } from "../../helper/const";

import * as SPLToken from "@solana/spl-token";

// mint token

async function main() {
  let tx = new Transaction();
  tx.add(
    SPLToken.Token.createMintToInstruction(
      SPLToken.TOKEN_PROGRAM_ID, // always token program id
      TEST_MINT, // mint
      ALICE_TOKEN_ADDRESS_1, // receiver (also need a token account)
      FEE_PAYER.publicKey, // mint's authority
      [], // if mint's authority is a multisig account, then we pass singers into it, for now is empty
      1e9 // mint amount, you can pass whatever you want, but it is the smallest unit, so if your decimals is 9, you will need to pass 1e9 to get 1 token
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
