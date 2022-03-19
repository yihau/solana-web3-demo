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
  let programId = new PublicKey("C8pMh4nKK3z8eHbR2RXN2UfRm65scxd5UJV6Fqkv9mr2");

  // an account meta list is an array and program will receive a same order account info list when loaded.

  // an account meta including
  // - isSigner
  // - isWritable

  // if you assign some account is a signer, the account need to sign the tx
  // if your account's data will be modified after this tx, you should assign this account is writable

  let firstAccount = Keypair.generate();
  console.log(`first account: ${firstAccount.publicKey.toBase58()}`);

  let secondAccount = Keypair.generate();
  console.log(`second account: ${secondAccount.publicKey.toBase58()}`);

  let ins = new TransactionInstruction({
    programId: programId,
    keys: [
      {
        pubkey: firstAccount.publicKey,
        isSigner: true,
        isWritable: false,
      },
      {
        pubkey: secondAccount.publicKey,
        isSigner: false,
        isWritable: false,
      },
    ],
    data: Buffer.from([]),
  });

  let tx = new Transaction().add(ins);

  let txhash = await connection.sendTransaction(tx, [feePayer, firstAccount]); // you can try to remove firstAccount and see what will happen
  console.log(`txhash: ${txhash}`);
})();
