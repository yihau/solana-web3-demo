import { Transaction } from "@solana/web3.js";

import { CONNECTION, FEE_PAYER, TEST_MINT, ALICE_TOKEN_ADDRESS_1 } from "../../../helper/const";

import * as SPLToken from "@solana/spl-token";

// 增發代幣

async function main() {
  let tx = new Transaction();
  tx.add(
    SPLToken.Token.createMintToInstruction(
      SPLToken.TOKEN_PROGRAM_ID, // 通常是固定值, token program id
      TEST_MINT, // mint
      ALICE_TOKEN_ADDRESS_1, // 收token的地址 (需要是token account)
      FEE_PAYER.publicKey, // mint 的 auth
      [], // 如果auth是mutiple singer才需要，這邊我們先留空
      1e9 // 要增發的數量 隨意帶 不過要記得這邊是最小單位 也就是說decimals如果是9 想要mint出1顆來就得帶1e9
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
