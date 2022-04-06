import { Connection, Keypair, Transaction, PublicKey, TransactionInstruction, SystemProgram } from "@solana/web3.js";
import * as bs58 from "bs58";
import * as borsh from "borsh";

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

class GreetingAccount {
  counter = 0;
  constructor(fields: { counter: number } | undefined = undefined) {
    if (fields) {
      this.counter = fields.counter;
    }
  }
}

const GreetingSchema = new Map([[GreetingAccount, { kind: "struct", fields: [["counter", "u32"]] }]]);

const GREETING_SIZE = borsh.serialize(GreetingSchema, new GreetingAccount()).length;

(async () => {
  let programId = new PublicKey("ETZX5pGLX6FUtduJuoKScvTY1TH53LAeCtPjAhXFQooM");

  // 1. init + hello
  {
    let greetAccount = Keypair.generate();
    console.log(`greet account: ${greetAccount.publicKey.toBase58()}`);

    let tx = new Transaction().add(
      // create account
      SystemProgram.createAccount({
        fromPubkey: feePayer.publicKey,
        newAccountPubkey: greetAccount.publicKey,
        space: GREETING_SIZE,
        lamports: await connection.getMinimumBalanceForRentExemption(GREETING_SIZE),
        programId: programId,
      }),
      new TransactionInstruction({
        programId: programId,
        keys: [
          {
            pubkey: greetAccount.publicKey,
            isSigner: false,
            isWritable: true,
          },
        ],
        data: Buffer.from([]),
      })
    );

    console.log(`txhash: ${await connection.sendTransaction(tx, [feePayer, greetAccount])}`);
  }

  // 2. hello to exist account
  // {
  //   let greetAccountPubkey = new PublicKey("D4FTRFfasgzaNZYPeMb2TahXZwt5N8HUDA7K1tb3DyNW");

  //   let tx = new Transaction().add(
  //     new TransactionInstruction({
  //       programId: programId,
  //       keys: [
  //         {
  //           pubkey: greetAccountPubkey,
  //           isSigner: false,
  //           isWritable: true,
  //         },
  //       ],
  //       data: Buffer.from([]),
  //     })
  //   );

  //   console.log(`txhash: ${await connection.sendTransaction(tx, [feePayer])}`);
  // }

  // 3. get account
  // {
  //   let greetAccountPubkey = new PublicKey("D4FTRFfasgzaNZYPeMb2TahXZwt5N8HUDA7K1tb3DyNW");
  //   let accountInfo = await connection.getAccountInfo(greetAccountPubkey);
  //   if (!accountInfo) {
  //     throw Error(`failed to get ${greetAccountPubkey}`);
  //   }
  //   console.log(accountInfo.data);

  //   const greetAccount = borsh.deserialize(GreetingSchema, GreetingAccount, accountInfo.data);
  //   console.log(`${JSON.stringify(greetAccount)}`);
  // }
})();
