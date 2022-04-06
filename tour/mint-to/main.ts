import { Keypair, Transaction, Connection, PublicKey } from "@solana/web3.js";
import { createMintToCheckedInstruction } from "@solana/spl-token";
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

const tokenAccount1Pubkey = new PublicKey("37sAdhEFiYxKnQAm7CPd5GLK1ZxWovqn3p87kKjfD44c");

const tokenAccount2Pubkey = new PublicKey("CFEPU5Jd6DNj8gpjPLJ1d9i4xSJDGYNV7n6qw53zE3n1");

// mint token

(async () => {
  let tx = new Transaction();
  tx.add(
    createMintToCheckedInstruction(
      mintPubkey,
      tokenAccount1Pubkey,
      alice.publicKey, // mint auth
      1, // amount
      0 // decimals
    )
  );
  console.log(`txhash: ${await connection.sendTransaction(tx, [feePayer, alice])}`);
})();
