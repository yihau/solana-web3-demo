import { Transaction } from "@solana/web3.js";

import { CONNECTION, FEE_PAYER, ALICE_TOKEN_ADDRESS_1, ALICE_TOKEN_ADDRESS_2, ALICE } from "../../helper/const";

import * as SPLToken from "@solana/spl-token";

// token transfer

async function main() {
  let tx = new Transaction();
  tx.add(
    SPLToken.Token.createTransferInstruction(
      SPLToken.TOKEN_PROGRAM_ID, // always token program address
      ALICE_TOKEN_ADDRESS_1, // from (token account public key)
      ALICE_TOKEN_ADDRESS_2, // to (token account public key)
      ALICE.publicKey, // from's authority
      [], // pass signer if from's mint is a multisig pubkey
      10 // amount
    )
  );
  tx.feePayer = FEE_PAYER.publicKey;

  console.log(`txhash: ${await CONNECTION.sendTransaction(tx, [ALICE, FEE_PAYER])}`);
}

main().then(
  () => process.exit(),
  (err) => {
    console.error(err);
    process.exit(-1);
  }
);
