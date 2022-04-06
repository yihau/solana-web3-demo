import { Keypair, Transaction, SystemProgram, Connection, PublicKey } from "@solana/web3.js";

import {
  ACCOUNT_SIZE,
  createAssociatedTokenAccountInstruction,
  createInitializeAccountInstruction,
  getAssociatedTokenAddress,
  getMinimumBalanceForRentExemptAccount,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

import * as bs58 from "bs58";

// connection
const connection = new Connection("https://api.devnet.solana.com");

// 5YNmS1R9nNSCDzb5a7mMJ1dwK9uHeAAF4CmPEwKgVWr8
const feePayer = Keypair.fromSecretKey(
  bs58.decode("588FU4PktJWfGfxtzpAAXywSNt74AvtroVzGfKkVN1LwRuvHwKGr851uH8czM5qm4iqLbs1kKoMKtMJG4ATR7Ld2")
);

// G2FAbFQPFa5qKXCetoFZQEvF9BVvCKbvUZvodpVidnoY
const alice = Keypair.fromSecretKey(
  bs58.decode("4NMwxzmYj2uvHuq8xoqhY8RXg63KSVJM1DXkpbmkUY7YQWuoyQgFnnzn6yo3CMnqZasnNPNuAT2TLwQsCaKkUddp")
);

const mintPubkey = new PublicKey("AjMpnWhqrbFPJTQps4wEPNnGuQPMKUcfqHUqAeEf1WM4");

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

(async () => {
  // 1. Random
  {
    let tokenAccount = Keypair.generate();
    console.log(`ramdom token address: ${tokenAccount.publicKey.toBase58()}`);

    let tx = new Transaction();
    tx.add(
      // create account
      SystemProgram.createAccount({
        fromPubkey: feePayer.publicKey,
        newAccountPubkey: tokenAccount.publicKey,
        space: ACCOUNT_SIZE,
        lamports: await getMinimumBalanceForRentExemptAccount(connection),
        programId: TOKEN_PROGRAM_ID,
      }),
      // init token account
      createInitializeAccountInstruction(tokenAccount.publicKey, mintPubkey, alice.publicKey)
    );

    console.log(
      `create random token account txhash: ${await connection.sendTransaction(tx, [feePayer, tokenAccount])}`
    );
  }

  // 2. ATA
  {
    let ata = await getAssociatedTokenAddress(
      mintPubkey, // mint
      alice.publicKey, // owner
      false // allow owner off curve
    );
    console.log(`ata: ${ata.toBase58()}`);

    let tx = new Transaction();
    tx.add(
      createAssociatedTokenAccountInstruction(
        feePayer.publicKey, // payer
        ata, // ata
        alice.publicKey, // owner
        mintPubkey // mint
      )
    );

    console.log(`create ata txhash: ${await connection.sendTransaction(tx, [feePayer])}`);
  }
})();
