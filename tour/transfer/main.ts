import { Keypair, Transaction, SystemProgram } from "@solana/web3.js";
import { ALICE, CONNECTION, FEE_PAYER } from "../../helper/const";

// SOL的轉帳

async function main() {
  // 建立一個測試的收幣的地址
  let to = Keypair.generate();
  console.log(`to: ${to.publicKey.toBase58()}`);

  // 建立一個空的tx物件
  let tx = new Transaction();
  // 加上tranfer的instruction
  tx.add(
    SystemProgram.transfer({
      fromPubkey: ALICE.publicKey,
      toPubkey: to.publicKey,
      lamports: 1e8, // 0.1 SOL
    })
  );
  // 指定fee payer
  tx.feePayer = FEE_PAYER.publicKey;

  // 發送交易 (後面的array是帶入要簽名的帳戶，我們建立的這個交易需要from跟feePayer都簽名，如果from跟feePayer都是同一個人，那就只需要帶入feePayer即可)
  let txhash = await CONNECTION.sendTransaction(tx, [ALICE, FEE_PAYER]);
  console.log(`txhash: ${txhash}`);
}

main().then(
  () => process.exit(),
  (err) => {
    console.error(err);
    process.exit(-1);
  }
);
