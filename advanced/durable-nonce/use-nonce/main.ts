import {
  Keypair,
  Transaction,
  SystemProgram,
  Connection,
  NONCE_ACCOUNT_LENGTH,
  sendAndConfirmTransaction,
  PublicKey,
  NonceAccount,
} from "@solana/web3.js";
import { CONNECTION, FEE_PAYER } from "../../../helper/const";

// 使用nonce機制

// 剛剛產的nonce account
const nonceAccountPubkey = new PublicKey("2ZKe8GmRAqFRj3AvVSFBTLHNNrH1uB23hwjHV3CzJGmf");

async function main() {
  // 這邊用transfer當作使用nonce機制的範例tx

  // 隨便產一個to的address
  let to = Keypair.generate();

  // 創建tx
  let tx = new Transaction();
  tx.add(
    // nonce advance的操作一定要在第一個instruction
    SystemProgram.nonceAdvance({
      noncePubkey: nonceAccountPubkey,
      authorizedPubkey: FEE_PAYER.publicKey,
    }),
    // 後面放原本想要做的操作
    SystemProgram.transfer({
      fromPubkey: FEE_PAYER.publicKey,
      toPubkey: to.publicKey,
      lamports: 1e8,
    })
  );

  // 這裡帶nonce account裡面存的nonce
  tx.recentBlockhash = "EFtM4FKWZS8WUPd7VFW2Lukzk2KEgCucibrjF2jZDPyZ";
  tx.feePayer = FEE_PAYER.publicKey;
  tx.sign(FEE_PAYER);

  let rawtx = tx.serialize();
  console.log(`txhash: ${await CONNECTION.sendRawTransaction(rawtx)}`);

  // 要注意每次nonce advance之後，nonce account存的nonce就不一樣了
  // 如果有想要再次使用，需要再去拿一次nonce
}

main().then(
  () => process.exit(),
  (err) => {
    console.error(err);
    process.exit(-1);
  }
);
