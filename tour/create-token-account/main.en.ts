import { Keypair, Transaction, SystemProgram } from "@solana/web3.js";

import { ALICE, CONNECTION, FEE_PAYER, TEST_MINT } from "../../helper/const";

import * as SPLToken from "@solana/spl-token";

// create token account

// you will need a token account to recieve token in Solana
// in the other words, if you want to receive USDC, you will need a USDC token account
// if you want to receive RAY, you will need a RAY token account
// and these account's address are different (because they are not the same account)

// There are two ways to create token account

// 1. Random
// the main concept is to create a random keypair and init it as a token account
// but I don't recommend you to use this way, it will let user to store many different account
// make managing token account hard.

// 2. Associated Token Address (ATA)
// the recommend one
// this way will derive your token address by your SOL address + mint address
// and anytime you get the same result, if you pass the same SOL address and mint address
// it make managing token account easy, because I can know all of your token address just by your SOL address

async function main() {
  // 1. Random
  let randomTokenAccount = Keypair.generate();
  console.log(`ramdom token address: ${randomTokenAccount.publicKey.toBase58()}`);

  let randomTokenAccountTx = new Transaction();
  randomTokenAccountTx.add(
    // create account
    SystemProgram.createAccount({
      fromPubkey: FEE_PAYER.publicKey,
      newAccountPubkey: randomTokenAccount.publicKey,
      space: SPLToken.AccountLayout.span,
      lamports: await SPLToken.Token.getMinBalanceRentForExemptAccount(CONNECTION),
      programId: SPLToken.TOKEN_PROGRAM_ID,
    }),
    // init token account
    SPLToken.Token.createInitAccountInstruction(
      SPLToken.TOKEN_PROGRAM_ID, // program id, always token program id
      TEST_MINT, // mint
      randomTokenAccount.publicKey, // token account public key
      ALICE.publicKey // token account authority
    )
  );
  randomTokenAccountTx.feePayer = FEE_PAYER.publicKey;

  console.log(
    `random token account txhash: ${await CONNECTION.sendTransaction(randomTokenAccountTx, [
      randomTokenAccount,
      FEE_PAYER,
    ])}`
  );

  // 2. ATA

  // you always get the same address if you pass the same mint and token account owner
  let ata = await SPLToken.Token.getAssociatedTokenAddress(
    SPLToken.ASSOCIATED_TOKEN_PROGRAM_ID, // always associated token program id
    SPLToken.TOKEN_PROGRAM_ID, // always token program id
    TEST_MINT, // mint
    ALICE.publicKey // token account authority
  );
  console.log(`ata: ${ata.toBase58()}`);

  let ataTx = new Transaction();
  ataTx.add(
    SPLToken.Token.createAssociatedTokenAccountInstruction(
      SPLToken.ASSOCIATED_TOKEN_PROGRAM_ID, // always associated token program id
      SPLToken.TOKEN_PROGRAM_ID, // always token program id
      TEST_MINT, // mint (which we used to calculate ata)
      ata, // the ata we calcualted early
      ALICE.publicKey, // token account owner (which we used to calculate ata)
      FEE_PAYER.publicKey // payer, fund account, like SystemProgram.createAccount's from
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
