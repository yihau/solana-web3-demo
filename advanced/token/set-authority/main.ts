import { Transaction } from "@solana/web3.js";
import { CONNECTION, TEST_MINT, FEE_PAYER } from "../../../helper/const";
import { TOKEN_PROGRAM_ID, Token } from "@solana/spl-token";

// 你可以設定/更新你的帳戶權限
// 這裡有四種權限可以指定更新 => 'MintTokens' | 'FreezeAccount' | 'AccountOwner' | 'CloseAccount'
// MintTokens 和 FreezeAccount 是給mint account使用的
// AccountOwner 和 CloseAccount 是給token account使用的

async function main() {
  let tx = new Transaction();
  tx.add(
    Token.createSetAuthorityInstruction(
      TOKEN_PROGRAM_ID, // token program id
      TEST_MINT, // 目標帳戶 (這邊用mint account來當例子)
      null, // 新的數值, 如果你想要拔掉該權限，可以直接傳null
      "MintTokens", // 剛剛所說的有四個型別的權限
      FEE_PAYER.publicKey, // 原本這個權限的帳戶
      []
    )
  );
  tx.feePayer = FEE_PAYER.publicKey;
  console.log(`txhash: ${await CONNECTION.sendTransaction(tx, [FEE_PAYER])}`);
}

main().then(
  () => process.exit(),
  (err) => {
    console.error(err);
    process.exit(-1);
  }
);
