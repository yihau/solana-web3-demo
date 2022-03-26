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
  let programId = new PublicKey("A4toBdAvsqE6RRgFGHBXgpKxAhU7dY2RRkWARhzYqjKm");

  // `invoke` allows us to call another program in our program

  // we need to pack all needed accounts and program in the same instruction so that we can composed them in our prgoram

  // here we try to use invoke in our program
  {
    let ins = new TransactionInstruction({
      programId: programId,
      keys: [
        {
          pubkey: alice.publicKey,
          isSigner: true,
          isWritable: true,
        },
        {
          pubkey: feePayer.publicKey,
          isSigner: false,
          isWritable: true,
        },
        // remember you also need to pack the invoke instruciton's program here
        // we want to call system program's transfer in our prgoram
        // so we need to pack system program into instruction
        {
          pubkey: SystemProgram.programId,
          isSigner: false,
          isWritable: false,
        },
      ],
      // we pack `amount` into data. [1, 0, 0, 0, 0, 0, 0, 0] is a little endian u64 which value is 1
      data: Buffer.from([1, 0, 0, 0, 0, 0, 0, 0]),
    });

    let tx = new Transaction().add(ins);

    let txhash = await connection.sendTransaction(tx, [feePayer, alice]);
    console.log(`txhash: ${txhash}`);
  }
})();
