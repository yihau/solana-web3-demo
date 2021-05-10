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
  let feePayerTokenAccountPubkey = new PublicKey(
    "HUrZoLwp65hVNdZ39cSxocEKgkFCNe2RkPG8943WDWEt"
  );

  // 當你有了mint和token-account之後, 可以從mint那裡增發一些代幣出來方便以後測試
  let tx = new Transaction();
  tx.add(
    SPLToken.Token.createMintToInstruction(
      SPLToken.TOKEN_PROGRAM_ID, // program id
      mintPubkey, // mint public key
      feePayerTokenAccountPubkey, // dest public key (token account public key) 接受增發的地址
      feePayer.publicKey, // mint auth
      [], // 如果你是mutiple singer 這邊會需要把其他的singer帶進來
      1e9, // 要增發的數量 隨意帶 不過要記得這邊是最小單位 也就是說decimals如果是9 想要mint出1顆來就得帶1e9
    )
  );
  tx.feePayer = feePayer.publicKey;

  let tsHash = await sendAndConfirmTransaction(connection, tx, [feePayer]); // 如果mint的auth不是feePayer, 這邊會需要額外也把mint auth也帶進來
  console.log(`txHash: ${tsHash}`);
}

main().then(
  () => process.exit(),
  (err) => {
    console.error(err);
    process.exit(-1);
  }
);
