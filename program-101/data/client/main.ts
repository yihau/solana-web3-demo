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
  let programId = new PublicKey("Pp1xH7WfZEgfsjseWLLs4H8c4YT1xmdGWmenGBu62iE");

  // data is the most powerful part in an instruction
  // we can pack everything into data, like number, pubkey ... whatever you want.

  // when we pack something into data, it should be a byte array
  // and a program will receive the same byte array as well.
  // how to serialize/deserialize is up to you. there are many different ways to make it.

  // here I use data to make a function selector, we will make a more complex example later.

  // our program will take the first byte as a function selector
  // then print remains

  {
    let ins = new TransactionInstruction({
      programId: programId,
      keys: [],
      data: Buffer.from([0, 1, 2, 3, 4, 5, 6, 7, 8]),
    });

    let tx = new Transaction().add(ins);

    let txhash = await connection.sendTransaction(tx, [feePayer]);
    console.log(`called first instruction txhash: ${txhash}`);
  }

  {
    let ins = new TransactionInstruction({
      programId: programId,
      keys: [],
      data: Buffer.from([1, 8, 7, 6, 5, 4, 3, 2, 1]),
    });

    let tx = new Transaction().add(ins);

    let txhash = await connection.sendTransaction(tx, [feePayer]);
    console.log(`called second instruction txhash: ${txhash}`);
  }
})();
