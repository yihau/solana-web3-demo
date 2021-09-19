import { Keypair, Transaction, SystemProgram } from "@solana/web3.js";

import { ALICE, CONNECTION, FEE_PAYER, TEST_MINT } from "../../helper/const";

import * as SPLToken from "@solana/spl-token";

// 創建Token Account

// 如果要在Solana上收Token的話，會需要創造且初始化一個相對應的Token Account
// 換句話說，如果你要收USDC，你會需要準備一個收USDC的Account，如果想要收RAY，也是一樣的。
// 而這幾個收Token的Account在Solana裡面都會是不一樣的地址 (是不同的Account)

// 創建Token Account的方法有兩種

// 1. 隨機產生
// 這種方法的概念就是隨便找一個地址，然後對他做Token Account的初始化
// 目前不建議使用這種方法，這種方法會造成Token Account管理上的麻煩 (因為要記錄許多不同的Account)
// 現在比較推薦能用第二種方式產生Token Account

// 2. Associated Token Address (ATA)
// 這種方式會依據你的SOL地址推算出你的Token Account地址
// 所以每次算出來的都會是一樣的，在管理上只需要知道SOL的地址就可以知道他的Token地址

async function main() {
  // 1. 隨機產生
  let randomTokenAccount = Keypair.generate();
  console.log(`ramdom token address: ${randomTokenAccount.publicKey.toBase58()}`);

  let randomTokenAccountTx = new Transaction();
  randomTokenAccountTx.add(
    // 創建account
    SystemProgram.createAccount({
      fromPubkey: FEE_PAYER.publicKey,
      newAccountPubkey: randomTokenAccount.publicKey,
      space: SPLToken.AccountLayout.span,
      lamports: await SPLToken.Token.getMinBalanceRentForExemptAccount(CONNECTION),
      programId: SPLToken.TOKEN_PROGRAM_ID,
    }),
    // token account初始化
    SPLToken.Token.createInitAccountInstruction(
      SPLToken.TOKEN_PROGRAM_ID, // program id, 通常是固定值 (token program id)
      TEST_MINT, // mint
      randomTokenAccount.publicKey, // 要初始化的token account public key
      ALICE.publicKey // 操作 token account 的權限 (如果token account需要授權，都需要此帳號簽名)
    )
  );
  randomTokenAccountTx.feePayer = FEE_PAYER.publicKey;

  console.log(
    `random token account txhash: ${await CONNECTION.sendTransaction(randomTokenAccountTx, [
      randomTokenAccount,
      FEE_PAYER,
    ])}`
  );

  // 2. ATA

  // 以下是 associated token account的算法
  // 在同一個mint跟token account owner的狀況下，每次都會算出一樣的地址
  let ata = await SPLToken.Token.getAssociatedTokenAddress(
    SPLToken.ASSOCIATED_TOKEN_PROGRAM_ID, // 通常是固定值, associated token program id
    SPLToken.TOKEN_PROGRAM_ID, // 通常是固定值, token program id
    TEST_MINT, // mint
    ALICE.publicKey // token account auth (擁有token account權限的人)
  );
  console.log(`ata: ${ata.toBase58()}`);

  let ataTx = new Transaction();
  ataTx.add(
    SPLToken.Token.createAssociatedTokenAccountInstruction(
      SPLToken.ASSOCIATED_TOKEN_PROGRAM_ID, // 通常是固定值, associated token program id
      SPLToken.TOKEN_PROGRAM_ID, // 通常是固定值, token program id
      TEST_MINT, // mint (需要跟剛剛算ata時的mint是同一個)
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
