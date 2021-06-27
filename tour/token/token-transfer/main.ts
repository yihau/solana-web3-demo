import { Transaction } from "@solana/web3.js";

import { CONNECTION, FEE_PAYER, ALICE_TOKEN_ADDRESS_1, ALICE_TOKEN_ADDRESS_2, ALICE } from "../../../helper/const";

import * as SPLToken from "@solana/spl-token";

// Token轉帳

async function main() {
  let tx = new Transaction();
  tx.add(
    SPLToken.Token.createTransferInstruction(
      SPLToken.TOKEN_PROGRAM_ID, // 通常是固定數值, token program address
      ALICE_TOKEN_ADDRESS_1, // from (token account public key)
      ALICE_TOKEN_ADDRESS_2, // to (token account public key)
      ALICE.publicKey, // from的auth
      [], // from是mutiple signers才需要帶，這邊我們留空
      10 // 轉帳的數量，這邊是最小單位，要注意decimals與實際數值的換算
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
