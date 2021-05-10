import {
  Keypair,
  Transaction,
  SystemProgram,
  Connection,
  sendAndConfirmTransaction,
} from "@solana/web3.js";

async function main() {
  // 可以在本地用 solana-test-validator 起一個測試的鏈方便測試
  const url = "http://localhost:8899";
  let connection = new Connection(url);
  // 這個account是預產的 可以透過前面學習到的步驟產完然後帶進來
  // prettier-ignore
  let feePayer = Keypair.fromSecretKey(Uint8Array.from([206,54,90,62,42,169,79,30,10,214,71,58,161,79,210,133,123,207,196,142,168,155,129,108,35,155,218,75,82,233,79,40,67,120,93,30,66,81,199,231,199,75,70,229,64,75,252,105,43,152,135,212,92,179,44,129,174,181,26,186,90,20,83,69]))

  let to = Keypair.generate();

  let tx = new Transaction();
  tx.add(
    SystemProgram.transfer({
      fromPubkey: feePayer.publicKey,
      toPubkey: to.publicKey,
      lamports: 1e9,
    })
  );
  tx.feePayer = feePayer.publicKey;

  console.log(await sendAndConfirmTransaction(connection, tx, [feePayer]));
  console.log(`to balance: ${await connection.getBalance(to.publicKey)}`);
}

main().then(
  () => process.exit(),
  (err) => {
    console.error(err);
    process.exit(-1);
  }
);
