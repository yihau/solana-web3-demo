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
let programId = new PublicKey("8FfKRwvdUCKKs63zvz7NK3cEqwQeT2ivkcuy3v9Ypsgn");

async function main() {
  let connection = new Connection("http://localhost:8899");
  let randomAccount = new Keypair();
  console.log(`random address: ${randomAccount.publicKey.toBase58()}`);

  // 跟program互動之前我們必須要先知道tx的結構，下面簡單介紹一下
  // 一個 tx = 多個簽名 + 一個message
  // 一個 message = 許多的insturcitons
  // 一個 instruction = program id + accountMeta + data
  // accountMeta = pubkey + isSigner + isWritable
  // 如果isSiger指定是true，那該個account也會需要簽名這個交易才有辦法發送
  // 如果isWritable是true，那program才能更改他的資料

  // 回歸正題，所以當我們需要跟我們的program互動時，會需要一個instruction來幫我們完成
  // 下面有一個很簡單的互動instruction
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
      ], // account meta, 會依照這個順序傳到program內
      data: Buffer.from(new Uint8Array([1, 2, 3, 4, 5])), // data
      programId: programId,
    })
  );
  console.log(`txhash: ${await connection.sendTransaction(tx, [feePayer])}`);
  // 執行完成後可以在官方的explorer上觀察一下這個tx的log
  // 應該會完整log出來我們剛剛上面傳入的訊息
  // 這樣我們就完成第一步了，下一篇我會跟大家說如何讓同一個prgoram有不同的分支
}

main().then(
  () => process.exit(),
  (err) => {
    console.error(err);
    process.exit(-1);
  }
);
