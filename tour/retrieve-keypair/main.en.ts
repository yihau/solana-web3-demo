import { Keypair } from "@solana/web3.js";

// use private key to retrieve your keypair

async function main() {
  // use fromSecretKey to get a keypair object
  let myAccount = Keypair.fromSecretKey(
    Uint8Array.from([
      174, 47, 154, 16, 202, 193, 206, 113, 199, 190, 53, 133, 169, 175, 31, 56, 222, 53, 138, 189, 224, 216, 117, 173,
      10, 149, 53, 45, 73, 251, 237, 246, 15, 185, 186, 82, 177, 240, 148, 69, 241, 227, 167, 80, 141, 89, 240, 121,
      121, 35, 172, 247, 68, 251, 226, 218, 48, 63, 176, 109, 168, 89, 238, 135,
    ])
  );

  // if you want to recover phantom's private key
  // it will return you a base58 encoded private key
  // you will need to do base58 decode to get the Uint8Array then
  // use the step above

  console.log(`pubkey: ${myAccount.publicKey.toBase58()}`);
  console.log(`prikey: [${Array.from(myAccount.secretKey)}]`);
}

main().then(
  () => process.exit(),
  (err) => {
    console.error(err);
    process.exit(-1);
  }
);
