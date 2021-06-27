import {
  Keypair,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
  sendAndConfirmRawTransaction,
} from "@solana/web3.js";
import { CONNECTION, FEE_PAYER } from "../../helper/const";

// 發送tx

// 在前面的例子我們都是用用sendTransaction的方式來發送交易，這邊介紹另外兩種方式
// 可以依照不同情況自己選擇要使用哪一種

async function main() {
  // 這邊拿transfer的tx當作例子
  let to = Keypair.generate();
  console.log(`to: ${to.publicKey.toBase58()}`);

  let tx = new Transaction();
  tx.add(
    SystemProgram.transfer({
      fromPubkey: FEE_PAYER.publicKey,
      toPubkey: to.publicKey,
      lamports: 1,
    })
  );
  tx.feePayer = FEE_PAYER.publicKey;

  // 1. 簽名 + 發送
  // 只管發出交易，不管鏈上區塊狀況 (前面的基礎範例都是使用這種)
  // console.log(`txhash: ${await CONNECTION.sendTransaction(tx, [FEE_PAYER])}`);

  // 2. 簽名 + 發送 + 確認
  // 這個方法會等到區塊確認完成之後才會回傳txhash
  // console.log(`txhash: ${await sendAndConfirmTransaction(CONNECTION, tx, [FEE_PAYER])}`);

  // 3. 簽名 => 發送
  // 前兩種方式都是web3幫我們包好的方法，可以一鍵發送交易
  // 第三種比較接近跟原始的rpc互動
  // 對這種方法有概念後轉去其他的語言開發比較不會卡關
  // 在上面設定完 instruction 和 feePayer之後
  // 這邊會需要再多設定一個東西 `blockhash`
  // solana在發送交易時會需要將最近的blockhash包進tx內一起簽名送出
  // 如果鏈上發現你帶的blockhash距離鏈上最新的blockhash太遠的話
  // 會直接拒絕tx，如果你有需要暫存交易一陣子才發出的需求，可以參閱durable nonce篇的介紹

  // a. recent blockhash
  tx.recentBlockhash = (await CONNECTION.getRecentBlockhash()).blockhash;

  // b. 簽名
  tx.sign(...[FEE_PAYER]);

  // c. 序列化交易
  const rawTx = tx.serialize();

  // d. base64 encode
  const encodedTransaction = Buffer.from(rawTx).toString("base64");
  console.log(`txhash: ${await CONNECTION.sendEncodedTransaction(encodedTransaction)}`);

  // d步驟可以使用以下方法取代，上面是為了把完整步驟真實呈現
  // console.log(`txhash: ${await CONNECTION.sendRawTransaction(rawTx)}`);
}

main().then(
  () => process.exit(),
  (err) => {
    console.error(err);
    process.exit(-1);
  }
);
