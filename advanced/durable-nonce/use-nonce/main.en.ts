import {
  Keypair,
  Transaction,
  SystemProgram,
  Connection,
  NONCE_ACCOUNT_LENGTH,
  sendAndConfirmTransaction,
  PublicKey,
  NonceAccount,
} from "@solana/web3.js";
import { CONNECTION, FEE_PAYER } from "../../../helper/const";

// use nonce

// nonce account
const nonceAccountPubkey = new PublicKey("2ZKe8GmRAqFRj3AvVSFBTLHNNrH1uB23hwjHV3CzJGmf");

async function main() {
  // here we use a tranfer as an example

  // create a random `to`
  let to = Keypair.generate();

  let tx = new Transaction();
  tx.add(
    // nonce advance must be the first insturction
    SystemProgram.nonceAdvance({
      noncePubkey: nonceAccountPubkey,
      authorizedPubkey: FEE_PAYER.publicKey,
    }),
    // after that, you can append what you really want to do, here we append a transfer instruction
    SystemProgram.transfer({
      fromPubkey: FEE_PAYER.publicKey,
      toPubkey: to.publicKey,
      lamports: 1e8,
    })
  );

  // then we use the `nonce` which stored in the nonce acocunt as a recent blockhash
  tx.recentBlockhash = "EFtM4FKWZS8WUPd7VFW2Lukzk2KEgCucibrjF2jZDPyZ";
  tx.feePayer = FEE_PAYER.publicKey;
  tx.sign(FEE_PAYER);

  let rawtx = tx.serialize();
  console.log(`txhash: ${await CONNECTION.sendRawTransaction(rawtx)}`);

  // !!! the nonce will be changed after you do `nonce advance` !!!
}

main().then(
  () => process.exit(),
  (err) => {
    console.error(err);
    process.exit(-1);
  }
);
