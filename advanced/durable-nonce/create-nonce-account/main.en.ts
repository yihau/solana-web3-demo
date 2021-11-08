import { Keypair, Transaction, SystemProgram, NONCE_ACCOUNT_LENGTH } from "@solana/web3.js";
import { CONNECTION, FEE_PAYER } from "../../../helper/const";

// create nonce account

async function main() {
  let nonceAccount = Keypair.generate();
  console.log(`nonce account: ${nonceAccount.publicKey.toBase58()}`);

  let tx = new Transaction();
  tx.add(
    // create nonce account
    SystemProgram.createAccount({
      fromPubkey: FEE_PAYER.publicKey,
      newAccountPubkey: nonceAccount.publicKey,
      lamports: await CONNECTION.getMinimumBalanceForRentExemption(NONCE_ACCOUNT_LENGTH),
      space: NONCE_ACCOUNT_LENGTH,
      programId: SystemProgram.programId,
    }),
    // init nonce account
    SystemProgram.nonceInitialize({
      noncePubkey: nonceAccount.publicKey, // nonce account pubkey
      authorizedPubkey: FEE_PAYER.publicKey, // nonce account auth
    })
  );
  tx.feePayer = FEE_PAYER.publicKey;

  console.log(`txhash: ${await CONNECTION.sendTransaction(tx, [nonceAccount, FEE_PAYER])}`);
}

main().then(
  () => process.exit(),
  (err) => {
    console.error(err);
    process.exit(-1);
  }
);
