import { Keypair, Transaction, SystemProgram } from "@solana/web3.js";

import { CONNECTION, FEE_PAYER } from "../../helper/const";

import * as SPLToken from "@solana/spl-token";

// create mint (create your own token)

// you can treat mint as ERC-20's token address in Ethereum
// so, SRM, RAY, USDC... all of them are mint

async function main() {
  // create a mint account
  let mint = Keypair.generate();
  console.log(`mint: ${mint.publicKey.toBase58()}`);

  let tx = new Transaction();
  tx.add(
    // create account
    SystemProgram.createAccount({
      fromPubkey: FEE_PAYER.publicKey,
      newAccountPubkey: mint.publicKey,
      space: SPLToken.MintLayout.span,
      lamports: await SPLToken.Token.getMinBalanceRentForExemptMint(CONNECTION),
      programId: SPLToken.TOKEN_PROGRAM_ID,
    }),
    // init mint
    SPLToken.Token.createInitMintInstruction(
      SPLToken.TOKEN_PROGRAM_ID, // program id, always token program id
      mint.publicKey, // mint account public key
      0, // decimals
      FEE_PAYER.publicKey, // mint authority (an auth to mint token)
      null // freeze authority (we use null first, the auth can let you freeze user's token account)
    )
  );
  tx.feePayer = FEE_PAYER.publicKey;

  let txhash = await CONNECTION.sendTransaction(tx, [mint, FEE_PAYER]);
  console.log(`txhash: ${txhash}`);
}

main().then(
  () => process.exit(),
  (err) => {
    console.error(err);
    process.exit(-1);
  }
);
