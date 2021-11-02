import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { Connection, PublicKey } from "@solana/web3.js";
import * as SPLToken from "@solana/spl-token";

// get token accounts by owner

const connection = new Connection("https://api.devnet.solana.com");

async function main() {
  // 1. you can fetch all token account by an owner
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

  // 2. or just fetch specific mint for a owner
  let response2 = await connection.getTokenAccountsByOwner(
    new PublicKey("27kVX7JpPZ1bsrSckbR76mV6GeRqtrjoddubfg2zBpHZ"), // owner here
    {
      mint: new PublicKey("E4ZN2KmnVmpwLwjJNAwRjuQLeE5iFHLcAJ8LGB7FMaGQ"),
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
