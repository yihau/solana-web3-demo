import { Keypair, Transaction, Connection, TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js";

// 發交易前記得確認feePayer有錢

// 5YNmS1R9nNSCDzb5a7mMJ1dwK9uHeAAF4CmPEwKgVWr8
let feePayer = Keypair.fromSecretKey(
  Uint8Array.from([
    206, 54, 90, 62, 42, 169, 79, 30, 10, 214, 71, 58, 161, 79, 210, 133, 123, 207, 196, 142, 168, 155, 129, 108, 35,
    155, 218, 75, 82, 233, 79, 40, 67, 120, 93, 30, 66, 81, 199, 231, 199, 75, 70, 229, 64, 75, 252, 105, 43, 152, 135,
    212, 92, 179, 44, 129, 174, 181, 26, 186, 90, 20, 83, 69,
  ])
);

// 你剛剛部署的program
let programId = new PublicKey("GgMdxkeXtAhLtNw3Tx4H3Cnd7WDVAuXL7mTr5NovF2zF");

async function main() {
  let connection = new Connection("http://localhost:8899");
  {
    let tx = new Transaction();
    tx.add(
      new TransactionInstruction({
        keys: [],
        data: Buffer.from(new Uint8Array([1])), // data
        programId: programId,
      })
    );
    console.log(`instruction 1's txhash: ${await connection.sendTransaction(tx, [feePayer])}`);
  }

  {
    let tx = new Transaction();
    tx.add(
      new TransactionInstruction({
        keys: [],
        data: Buffer.from(new Uint8Array([2])), // data
        programId: programId,
      })
    );
    console.log(`instruction 2's txhash: ${await connection.sendTransaction(tx, [feePayer])}`);
  }

  {
    let tx = new Transaction();
    tx.add(
      new TransactionInstruction({
        keys: [],
        data: Buffer.from(new Uint8Array([3])), // data
        programId: programId,
      })
    );
    // 你會發現這個交易送不出去，他會被模擬交易擋下，如果你很想要發上鏈，可以用下面方法2來把它發出去
    console.log(`unknown instruction's txhash: ${await connection.sendTransaction(tx, [feePayer])}`);
    console.log(`unknown instruction's txhash: ${await connection.sendTransaction(tx, [feePayer], {skipPreflight: true})}`);
  }
}

main().then(
  () => process.exit(),
  (err) => {
    console.error(err);
    process.exit(-1);
  }
);
