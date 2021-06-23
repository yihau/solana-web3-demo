import { Keypair, Connection, PublicKey } from "@solana/web3.js";

async function main() {
  const url = "http://localhost:8899";
  let connection = new Connection(url);
  // prettier-ignore
  let alice = Keypair.fromSecretKey(Uint8Array.from([206,54,90,62,42,169,79,30,10,214,71,58,161,79,210,133,123,207,196,142,168,155,129,108,35,155,218,75,82,233,79,40,67,120,93,30,66,81,199,231,199,75,70,229,64,75,252,105,43,152,135,212,92,179,44,129,174,181,26,186,90,20,83,69]))
  let mintPubkey = new PublicKey(
    "Fpb9rrF7iW3eHNTvgpZX3LTC3PwYT7jCzB3zdUmnyCfw"
  );

  // 有時候你或許會想要知道某個owner到底握有幾個mint的account
  // 這時候你可以用下面的方式拿到所有alice擁有的mint的token account
  let response = await connection.getTokenAccountsByOwner(alice.publicKey, {
    mint: mintPubkey,
  });
  response.value.forEach((e) => {
    console.log(`pubkey: ${e.pubkey.toBase58()}`);
  });
}

main().then(
  () => process.exit(),
  (err) => {
    console.error(err);
    process.exit(-1);
  }
);
