import { PublicKey, Connection, Transaction } from "@solana/web3.js";
import { CONNECTION, ALICE, TEST_MINT, FEE_PAYER } from "../../../helper/const";
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID, NATIVE_MINT, Token } from "@solana/spl-token";

// close token account
// if you don't want to use the token account, you can close it and retrieve rent back.
// it has different limitation by different mint
// 1. for wrapped SOL, you can close it directly, no limitation
// 2. for other mint(like USDC, SRM ...), you need to transfer all token out first, make token balance 0, then you can close it

async function main() {
  let tx = new Transaction();
  tx.add(
    Token.createCloseAccountInstruction(
      TOKEN_PROGRAM_ID, // fixed
      new PublicKey("Dmysc2pPCGQSzkgkMtcZAtGFzYa7DzohqBxh7aF1YxG3"), // to be closed token account
      ALICE.publicKey, // rent's destination
      ALICE.publicKey, // token account authority
      [] // multisig
    )
  );
  tx.feePayer = FEE_PAYER.publicKey;

  console.log(`txhash: ${await CONNECTION.sendTransaction(tx, [ALICE, FEE_PAYER])}`);
}

main().then(
  () => process.exit(),
  (err) => {
    console.error(err);
    process.exit(-1);
  }
);
