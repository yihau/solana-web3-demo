import { Keypair } from "@solana/web3.js";

// create keypair

async function main() {
  // create a new keypair
  let alice = Keypair.generate();

  // you can use this way to get pubkey
  // normally use base58 format for pubkey
  console.log(`pubkey: ${alice.publicKey.toBase58()}`);

  // also you can print private key
  console.log(`prikey: [${Array.from(alice.secretKey)}]`);
}

main().then(
  () => process.exit(),
  (err) => {
    console.error(err);
    process.exit(-1);
  }
);
