import { Keypair, Transaction, SystemProgram } from "@solana/web3.js";

import { CONNECTION, FEE_PAYER } from "../../helper/const";

import * as SPLToken from "@solana/spl-token";

// 創建 Mint (發行自己的token)

// Mint的概念就像是Ethereum上的ERC-20的地址
// 換句話說，USDC、RAY、SRM ... 都是mint

async function main() {
  // 創建一個mint的keypair
  let mint = Keypair.generate();
  console.log(`mint: ${mint.publicKey.toBase58()}`);

  let tx = new Transaction();
  tx.add(
    // 創建一個帳戶
    SystemProgram.createAccount({
      fromPubkey: FEE_PAYER.publicKey,
      newAccountPubkey: mint.publicKey,
      space: SPLToken.MintLayout.span,
      lamports: await SPLToken.Token.getMinBalanceRentForExemptMint(CONNECTION),
      programId: SPLToken.TOKEN_PROGRAM_ID,
    }),
    // 對帳戶做mint的初始化
    SPLToken.Token.createInitMintInstruction(
      SPLToken.TOKEN_PROGRAM_ID, // program id, 通常固定是token program id
      mint.publicKey, // mint account public key
      0, // decimals
      FEE_PAYER.publicKey, // mint authority (增發幣的權限)
      null // freeze authority (冷凍帳戶的權限，這邊我們先留null即可)
    )
  );
  tx.feePayer = FEE_PAYER.publicKey;

  let txhash = await CONNECTION.sendTransaction(tx, [mint, FEE_PAYER]);
  console.log(`txhash: ${txhash}`);
}

main().then(
  () => process.exit(),
  (err) => {
    console.error(err);
    process.exit(-1);
  }
);
