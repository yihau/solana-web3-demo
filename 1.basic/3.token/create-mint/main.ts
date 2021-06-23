import {
  Keypair,
  Transaction,
  SystemProgram,
  Connection,
  sendAndConfirmTransaction,
} from "@solana/web3.js";

import * as SPLToken from "@solana/spl-token";

async function main() {
  const url = "http://localhost:8899";
  let connection = new Connection(url);
  // prettier-ignore
  let feePayer = Keypair.fromSecretKey(Uint8Array.from([206,54,90,62,42,169,79,30,10,214,71,58,161,79,210,133,123,207,196,142,168,155,129,108,35,155,218,75,82,233,79,40,67,120,93,30,66,81,199,231,199,75,70,229,64,75,252,105,43,152,135,212,92,179,44,129,174,181,26,186,90,20,83,69]))

  // mint account 的概念就像是ethereum上的erc20地址
  // 所以說，USDT, USDC, SRM ... 大家在solana的世界裡面都算是mint account
  // 但他們的program都是token program
  let mint = Keypair.generate();

  let tx = new Transaction();
  tx.add(
    SystemProgram.createAccount({
      fromPubkey: feePayer.publicKey,
      newAccountPubkey: mint.publicKey,
      space: SPLToken.MintLayout.span,
      lamports: await SPLToken.Token.getMinBalanceRentForExemptMint(connection),
      programId: SPLToken.TOKEN_PROGRAM_ID,
    }),
    SPLToken.Token.createInitMintInstruction(
      SPLToken.TOKEN_PROGRAM_ID, // program id
      mint.publicKey, // mint
      0, // decimals
      feePayer.publicKey, // mint authority
      null // freezeAuthority: PublicKey | null
    )
  );
  tx.feePayer = feePayer.publicKey;

  let tsHash = await sendAndConfirmTransaction(connection, tx, [
    feePayer,
    mint, // 需要mint的簽名是因為有做create account
  ]);
  console.log(`txHash: ${tsHash}`)
  console.log(`mint: ${mint.publicKey.toBase58()}`);
}

main().then(
  () => process.exit(),
  (err) => {
    console.error(err);
    process.exit(-1);
  }
);
