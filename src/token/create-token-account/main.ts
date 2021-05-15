import {
  Keypair,
  Transaction,
  SystemProgram,
  Connection,
  sendAndConfirmTransaction,
  PublicKey,
} from "@solana/web3.js";

import * as SPLToken from "@solana/spl-token";

async function main() {
  const url = "http://localhost:8899";
  let connection = new Connection(url);
  // prettier-ignore
  let feePayer = Keypair.fromSecretKey(Uint8Array.from([206,54,90,62,42,169,79,30,10,214,71,58,161,79,210,133,123,207,196,142,168,155,129,108,35,155,218,75,82,233,79,40,67,120,93,30,66,81,199,231,199,75,70,229,64,75,252,105,43,152,135,212,92,179,44,129,174,181,26,186,90,20,83,69]))
  let mintPubkey = new PublicKey(
    "Fpb9rrF7iW3eHNTvgpZX3LTC3PwYT7jCzB3zdUmnyCfw"
  );

  // 需要接收mint的話，就要擁有那個mint的相對應token account
  // 在產生token account的時候有兩種方法可以實現
  let alice = Keypair.generate(); // 創一個新的帳號，這個帳號是實際可以授權token account的人
  console.log("alice:", alice.publicKey.toBase58());

  // 1. 直接產生一個 並對他做 token init (這個方法可以一直產生新的token account指定給想要指定的人)
  let tokenAccount = Keypair.generate();
  let tx1 = new Transaction();
  tx1.add(
    SystemProgram.createAccount({
      fromPubkey: feePayer.publicKey,
      newAccountPubkey: tokenAccount.publicKey,
      space: SPLToken.AccountLayout.span,
      lamports: await SPLToken.Token.getMinBalanceRentForExemptAccount(
        connection
      ),
      programId: SPLToken.TOKEN_PROGRAM_ID,
    }),
    SPLToken.Token.createInitAccountInstruction(
      SPLToken.TOKEN_PROGRAM_ID, // program id, 這個會是固定都是帶這個數值 SPLToken.TOKEN_PROGRAM_ID
      mintPubkey, // mint,
      tokenAccount.publicKey, // 要init的token account
      alice.publicKey // owner, 實際上擁有token account的人
    )
  );
  tx1.feePayer = feePayer.publicKey;

  let tsHash1 = await sendAndConfirmTransaction(connection, tx1, [
    feePayer,
    tokenAccount, // 需要token_account的簽名是因為有做create account
  ]);
  console.log(`txHash1: ${tsHash1}`);
  console.log(`token-account: ${tokenAccount.publicKey.toBase58()}`);

  // 2. 創建 associated token account
  // 同一個owner的同一個mint只會有一個associated token account
  // 也就是說 alice 在 USDC 用這個算法 每次算都會是同一個 account
  // 這可以大幅度的降低管理account的問題 要用的時候再算就好了

  // 以下是 associated token account的算法
  let assoTokenAccountPubkey = await SPLToken.Token.getAssociatedTokenAddress(
    SPLToken.ASSOCIATED_TOKEN_PROGRAM_ID, // 固定值 都會是帶這個program id
    SPLToken.TOKEN_PROGRAM_ID, // // 固定值 都會是帶這個program id
    mintPubkey, // mint
    alice.publicKey // owner
  );

  let tx2 = new Transaction();
  tx2.add(
    SPLToken.Token.createAssociatedTokenAccountInstruction(
      SPLToken.ASSOCIATED_TOKEN_PROGRAM_ID, // 固定值 都會是帶這個program id
      SPLToken.TOKEN_PROGRAM_ID, // 固定值 都會是帶這個program id
      mintPubkey, // mint 要跟剛剛算account的時候帶的mint一樣
      assoTokenAccountPubkey, // 剛剛算出來的那個 assoTokenAccountPubkey
      alice.publicKey, // owner, 要跟剛剛算account的時候帶的owner一樣
      feePayer.publicKey // fee payer
    )
  );
  tx2.feePayer = feePayer.publicKey;

  let tsHash = await sendAndConfirmTransaction(connection, tx2, [feePayer]);
  console.log(`txHash2: ${tsHash}`);
  console.log(`associated-token-account: ${assoTokenAccountPubkey.toBase58()}`);
}

main().then(
  () => process.exit(),
  (err) => {
    console.error(err);
    process.exit(-1);
  }
);
