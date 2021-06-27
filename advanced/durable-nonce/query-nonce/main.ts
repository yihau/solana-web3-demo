import { PublicKey, NonceAccount } from "@solana/web3.js";
import { CONNECTION } from "../../../helper/const";

// 查詢nonce account帳戶詳細資料

async function main() {
  let nonceAccountPubkey = new PublicKey("2ZKe8GmRAqFRj3AvVSFBTLHNNrH1uB23hwjHV3CzJGmf");
  let accountInfo = await CONNECTION.getAccountInfo(nonceAccountPubkey);
  let nonceAccount = NonceAccount.fromAccountData(accountInfo.data);
  console.log(`auth: ${nonceAccount.authorizedPubkey.toBase58()}`)
  console.log(`nonce: ${nonceAccount.nonce}`)
  // 拿來計算fee的價目表，目前都只有收簽名數量 (1個簽名 5000 lamports = 0.000005 SOL)
  console.log(`fee calculator: ${nonceAccount.feeCalculator}`)
}

main().then(
  () => process.exit(),
  (err) => {
    console.error(err);
    process.exit(-1);
  }
);
