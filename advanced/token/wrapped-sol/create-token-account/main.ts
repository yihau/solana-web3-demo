import { Keypair, Transaction, SystemProgram } from "@solana/web3.js";

import { ALICE, CONNECTION, FEE_PAYER, TEST_MINT } from "../../../../helper/const";

import * as SPLToken from "@solana/spl-token";

// 創建Token Account

// wrapped sol 本質上也是一種 mint，所以我們會需要一個token account來持有他 (不熟悉的朋友可以到tour/create-token-account複習下)

async function main() {
  let ata = await SPLToken.Token.getAssociatedTokenAddress(
    SPLToken.ASSOCIATED_TOKEN_PROGRAM_ID, // 通常是固定值, associated token program id
    SPLToken.TOKEN_PROGRAM_ID, // 通常是固定值, token program id
    SPLToken.NATIVE_MINT, // mint
    ALICE.publicKey // token account auth (擁有token account權限的人)
  );
  console.log(`ata: ${ata.toBase58()}`);

  let ataTx = new Transaction();
  ataTx.add(
    SPLToken.Token.createAssociatedTokenAccountInstruction(
      SPLToken.ASSOCIATED_TOKEN_PROGRAM_ID, // 通常是固定值, associated token program id
      SPLToken.TOKEN_PROGRAM_ID, // 通常是固定值, token program id
      SPLToken.NATIVE_MINT, // mint (需要跟剛剛算ata時的mint是同一個)
      ata, // 剛剛算出來的 ata
      ALICE.publicKey, // token account owner (要跟剛剛算ata時的token account auth是同一個)
      FEE_PAYER.publicKey // payer, 建立帳戶付錢的人，等同於 SystemProgram.createAccount 的 from
    )
  );
  ataTx.feePayer = FEE_PAYER.publicKey;

  console.log(`ata txhash: ${await CONNECTION.sendTransaction(ataTx, [FEE_PAYER])}`);
}

main().then(
  () => process.exit(),
  (err) => {
    console.error(err);
    process.exit(-1);
  }
);
