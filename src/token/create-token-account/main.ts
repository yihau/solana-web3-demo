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

  // 1. 直接產生一個 並對他做 token init
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
      SPLToken.TOKEN_PROGRAM_ID, // programId: PublicKey,
      mintPubkey, // mint: PublicKey,
      tokenAccount.publicKey, // account: PublicKey,
      feePayer.publicKey // owner: PublicKey,
    )
  );
  tx1.feePayer = feePayer.publicKey;

  let tsHash1 = await sendAndConfirmTransaction(connection, tx1, [
    feePayer,
    tokenAccount, // 需要token_account的簽名是因為有做create account
  ]);
  console.log(`txHash1: ${tsHash1}`);
  console.log(`token-account: ${tokenAccount.publicKey.toBase58()}`);

  // 2. 創建 associated token (同一個owner的同一個mint只會有一個associated token account)
  let assoTokenAccountPubkey = await SPLToken.Token.getAssociatedTokenAddress(
    SPLToken.ASSOCIATED_TOKEN_PROGRAM_ID,
    SPLToken.TOKEN_PROGRAM_ID,
    mintPubkey,
    feePayer.publicKey
  );
  let tx2 = new Transaction();
  tx2.add(
    SPLToken.Token.createAssociatedTokenAccountInstruction(
      SPLToken.ASSOCIATED_TOKEN_PROGRAM_ID,
      SPLToken.TOKEN_PROGRAM_ID,
      mintPubkey,
      assoTokenAccountPubkey,
      feePayer.publicKey,
      feePayer.publicKey
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
