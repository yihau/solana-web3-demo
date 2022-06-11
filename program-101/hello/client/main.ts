import { Connection, Keypair, Transaction, SystemProgram, PublicKey, TransactionInstruction } from "@solana/web3.js";
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

(async () => {
  let programId = new PublicKey("H9oXrmgoSdMRgeM9M4jM4RfuPUznHDjgZdBTgAmnDtRU");

  // instruction is composed by
  // - program id
  // - account meta list
  // - data

  // in our first program, we don't parse any accounts and data. leave them empty here
  // we will make some changes later
  let ins = new TransactionInstruction({
    programId: programId,
    keys: [],
    data: Buffer.from([]),
  });

  let tx = new Transaction().add(ins);

  let txhash = await connection.sendTransaction(tx, [feePayer]);
  console.log(`txhash: ${txhash}`);
})();
