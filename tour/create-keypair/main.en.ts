import { Keypair } from "@solana/web3.js";
import * as bs58 from 'bs58';

// create keypair

async function main() {
  // create a new keypair
  let alice = Keypair.generate();

  // you can use this way to get pubkey
  // normally use base58 format for pubkey
  console.log(`pubkey: ${alice.publicKey.toBase58()}`);

  // also you can print private key
  console.log(`prikey: [${Array.from(alice.secretKey)}]`);

  // =========================================================

  // you can use bs58 encode to get the format of private key which phantom used
  console.log(`private key for phantom:: ${bs58.encode(alice.secretKey)}`);

  // you also can recover phantom wallet's private to web3 keypair object
  let fromPhantom = Keypair.fromSecretKey(bs58.decode("5MaiiCavjCmn9Hs1o3eznqDEhRwxo7pXiAYez7keQUviUkauRiTMD8DrESdrNjN8zd9mTmVhRvBJeg5vhyvgrAhG"))
  console.log(`address from phantom private: ${fromPhantom.publicKey.toBase58()}`)
}

main().then(
  () => process.exit(),
  (err) => {
    console.error(err);
    process.exit(-1);
  }
);
