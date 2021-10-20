import { Keypair, Transaction, Connection, TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js";

// remember to check your fee payer has enough SOL to send tx

// 5YNmS1R9nNSCDzb5a7mMJ1dwK9uHeAAF4CmPEwKgVWr8
let feePayer = Keypair.fromSecretKey(
  Uint8Array.from([
    206, 54, 90, 62, 42, 169, 79, 30, 10, 214, 71, 58, 161, 79, 210, 133, 123, 207, 196, 142, 168, 155, 129, 108, 35,
    155, 218, 75, 82, 233, 79, 40, 67, 120, 93, 30, 66, 81, 199, 231, 199, 75, 70, 229, 64, 75, 252, 105, 43, 152, 135,
    212, 92, 179, 44, 129, 174, 181, 26, 186, 90, 20, 83, 69,
  ])
);

// your program
let programId = new PublicKey("8FfKRwvdUCKKs63zvz7NK3cEqwQeT2ivkcuy3v9Ypsgn");

async function main() {
  let connection = new Connection("http://localhost:8899");
  let randomAccount = new Keypair();
  console.log(`random address: ${randomAccount.publicKey.toBase58()}`);

  // if you want to interact with you program, you need to know tx's struction. below are some main concepts.
  // a tx = many signatures + one message
  // a message = many instructions
  // an instruction = program id + account meta + data
  // account meta = pubeky + isSigner + isWritable
  // if isSigner is true, this account should sign this tx too
  // if isWritable is true, this account's data can be modify after this tx.

  // back to the topic. so for now, we are going to create an instruction to interact with our program
  let tx = new Transaction();
  tx.add(
    new TransactionInstruction({
      keys: [
        {
          pubkey: feePayer.publicKey,
          isSigner: true,
          isWritable: true,
        },
        {
          pubkey: randomAccount.publicKey,
          isSigner: false,
          isWritable: true,
        },
      ], // account meta, program will receive the same order array
      data: Buffer.from(new Uint8Array([1, 2, 3, 4, 5])), // data
      programId: programId,
    })
  );
  console.log(`txhash: ${await connection.sendTransaction(tx, [feePayer])}`);
  // after you sending, you can check tx on official explorer
  // it should log these data which we pass into tx.
  // in next chapter I'm going to tell you how to make branch to your program
}

main().then(
  () => process.exit(),
  (err) => {
    console.error(err);
    process.exit(-1);
  }
);
