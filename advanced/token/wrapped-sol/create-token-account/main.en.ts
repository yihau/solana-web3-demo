import { Keypair, Transaction, SystemProgram } from "@solana/web3.js";

import { ALICE, CONNECTION, FEE_PAYER, TEST_MINT } from "../../../../helper/const";

import * as SPLToken from "@solana/spl-token";

// create token account

// wrapped sol is a kind of mint. we need a token account to hold it.
// (if you don't know how to create a token account, you can find it in tour/create-token-account)

async function main() {
  let ata = await SPLToken.Token.getAssociatedTokenAddress(
    SPLToken.ASSOCIATED_TOKEN_PROGRAM_ID,
    SPLToken.TOKEN_PROGRAM_ID,
    SPLToken.NATIVE_MINT, // wrapped SOL's mint address
    ALICE.publicKey
  );
  console.log(`ata: ${ata.toBase58()}`);

  let ataTx = new Transaction();
  ataTx.add(
    SPLToken.Token.createAssociatedTokenAccountInstruction(
      SPLToken.ASSOCIATED_TOKEN_PROGRAM_ID,
      SPLToken.TOKEN_PROGRAM_ID,
      SPLToken.NATIVE_MINT,
      ata,
      ALICE.publicKey,
      FEE_PAYER.publicKey
    )
  );
  ataTx.feePayer = FEE_PAYER.publicKey;

  console.log(`ata txhash: ${await CONNECTION.sendTransaction(ataTx, [FEE_PAYER])}`);
}

main().then(
  () => process.exit(),
  (err) => {
    console.error(err);
    process.exit(-1);
  }
);
