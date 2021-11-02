import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { Connection, PublicKey } from "@solana/web3.js";
import * as SPLToken from "@solana/spl-token";

// 用owner來抓取所有代幣帳戶

const connection = new Connection("https://api.devnet.solana.com");

async function main() {
  // 1. 抓取所有onwer所有擁有的代幣帳戶
  let response = await connection.getTokenAccountsByOwner(
    new PublicKey("27kVX7JpPZ1bsrSckbR76mV6GeRqtrjoddubfg2zBpHZ"), // owner here
    {
      programId: TOKEN_PROGRAM_ID,
    }
  );
  response.value.forEach((e) => {
    console.log(`pubkey: ${e.pubkey.toBase58()}`);
    const accountInfo = SPLToken.AccountLayout.decode(e.account.data);
    console.log(`mint: ${new PublicKey(accountInfo.mint)}`);
    console.log(`amount: ${SPLToken.u64.fromBuffer(accountInfo.amount)}`);
  });

  console.log("-------------------");

  // 2. 也可以抓取owner持有特定mint的所有帳戶
  let response2 = await connection.getTokenAccountsByOwner(
    new PublicKey("27kVX7JpPZ1bsrSckbR76mV6GeRqtrjoddubfg2zBpHZ"), // owner here
    {
      mint: new PublicKey("E4ZN2KmnVmpwLwjJNAwRjuQLeE5iFHLcAJ8LGB7FMaGQ"), // mint (token)
    }
  );
  response2.value.forEach((e) => {
    console.log(`pubkey: ${e.pubkey.toBase58()}`);
    const accountInfo = SPLToken.AccountLayout.decode(e.account.data);
    console.log(`mint: ${new PublicKey(accountInfo.mint)}`);
    console.log(`amount: ${SPLToken.u64.fromBuffer(accountInfo.amount)}`);
  });
}

main().then(
  () => process.exit(),
  (err) => {
    console.error(err);
    process.exit(-1);
  }
);
