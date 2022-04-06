import { Keypair, Transaction, SystemProgram, Connection } from "@solana/web3.js";

import {
  createInitializeMintInstruction,
  getMinimumBalanceForRentExemptMint,
  MINT_SIZE,
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

// create mint (create your own token)

// you can treat a mint as a ERC-20's token address in Ethereum
// SRM, RAY, USDC... all of them are mints

(async () => {
  // create a mint account
  let mint = Keypair.generate();
  console.log(`mint: ${mint.publicKey.toBase58()}`);

  let tx = new Transaction();
  tx.add(
    // create account
    SystemProgram.createAccount({
      fromPubkey: feePayer.publicKey,
      newAccountPubkey: mint.publicKey,
      space: MINT_SIZE,
      lamports: await getMinimumBalanceForRentExemptMint(connection),
      programId: TOKEN_PROGRAM_ID,
    }),
    // init mint
    createInitializeMintInstruction(
      mint.publicKey, // mint pubkey
      0, // decimals
      alice.publicKey, // mint authority (an auth to mint token)
      null // freeze authority (we use null first, the auth can let you freeze user's token account)
    )
  );

  console.log(`txhash: ${await connection.sendTransaction(tx, [feePayer, mint])}`);
})();
