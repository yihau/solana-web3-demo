import { PublicKey, NonceAccount } from "@solana/web3.js";
import { CONNECTION } from "../../../helper/const";

// query nonce account

async function main() {
  let nonceAccountPubkey = new PublicKey("2ZKe8GmRAqFRj3AvVSFBTLHNNrH1uB23hwjHV3CzJGmf");
  let accountInfo = await CONNECTION.getAccountInfo(nonceAccountPubkey);
  let nonceAccount = NonceAccount.fromAccountData(accountInfo.data);
  console.log(`auth: ${nonceAccount.authorizedPubkey.toBase58()}`)
  console.log(`nonce: ${nonceAccount.nonce}`)
  console.log(`fee calculator: ${nonceAccount.feeCalculator}`)
}

main().then(
  () => process.exit(),
  (err) => {
    console.error(err);
    process.exit(-1);
  }
);
