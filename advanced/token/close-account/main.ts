import { PublicKey, Connection, Transaction } from "@solana/web3.js";
import { CONNECTION, ALICE, TEST_MINT, FEE_PAYER } from "../../../helper/const";
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID, NATIVE_MINT, Token } from "@solana/spl-token";

// close token account
// 當某個token account你不想要再使用了，你可以使用此操作把裡面的rent回收。
// 但在close的時候會因為mint不同而有不同限制
// 1. 如果是 wrapped SOL, 你可以直接close, 沒有限制
// 2. 如果是 其他的mint(USDC, SRM ...), 你需要先把token都轉出，讓token balance變成0之後才能close

async function main() {
  let tx = new Transaction();
  tx.add(
    Token.createCloseAccountInstruction(
      TOKEN_PROGRAM_ID, // 定值
      new PublicKey("Dmysc2pPCGQSzkgkMtcZAtGFzYa7DzohqBxh7aF1YxG3"), // 要回收的token account
      ALICE.publicKey, // rent要回收的地址
      ALICE.publicKey, // token account authority
      [] // multisig
    )
  );
  tx.feePayer = FEE_PAYER.publicKey;

  console.log(`txhash: ${await CONNECTION.sendTransaction(tx, [ALICE, FEE_PAYER])}`);
}

main().then(
  () => process.exit(),
  (err) => {
    console.error(err);
    process.exit(-1);
  }
);
