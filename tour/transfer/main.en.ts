import { Keypair, Transaction, SystemProgram } from "@solana/web3.js";
import { ALICE, CONNECTION, FEE_PAYER } from "../../helper/const";

// SOL transfer

async function main() {
  // create a fake reciever
  let to = Keypair.generate();
  console.log(`to: ${to.publicKey.toBase58()}`);

  // create a empty tx
  let tx = new Transaction();
  // add instruction of transfer
  tx.add(
    SystemProgram.transfer({
      fromPubkey: ALICE.publicKey,
      toPubkey: to.publicKey,
      lamports: 1e8, // 0.1 SOL
    })
  );
  // fee payer
  tx.feePayer = FEE_PAYER.publicKey;

  // send tx (we need ALICE and FEE_PAYER as signers, if we juse use FEE_PAYER to trasnfer or just use ALICE as a feePayer, that we need 1 signer here)
  let txhash = await CONNECTION.sendTransaction(tx, [ALICE, FEE_PAYER]);
  console.log(`txhash: ${txhash}`);
}

main().then(
  () => process.exit(),
  (err) => {
    console.error(err);
    process.exit(-1);
  }
);
