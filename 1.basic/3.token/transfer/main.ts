import { Keypair, Transaction, SystemProgram, Connection, sendAndConfirmTransaction, PublicKey } from "@solana/web3.js";

import * as SPLToken from "@solana/spl-token";

async function main() {
  const url = "http://localhost:8899";
  let connection = new Connection(url);
  let feePayer = Keypair.fromSecretKey(
    Uint8Array.from([
      206, 54, 90, 62, 42, 169, 79, 30, 10, 214, 71, 58, 161, 79, 210, 133, 123, 207, 196, 142, 168, 155, 129, 108, 35,
      155, 218, 75, 82, 233, 79, 40, 67, 120, 93, 30, 66, 81, 199, 231, 199, 75, 70, 229, 64, 75, 252, 105, 43, 152,
      135, 212, 92, 179, 44, 129, 174, 181, 26, 186, 90, 20, 83, 69,
    ])
  );
  let mintPubkey = new PublicKey("Fpb9rrF7iW3eHNTvgpZX3LTC3PwYT7jCzB3zdUmnyCfw");
  let tokenAccount = new PublicKey("DuBkRyK6YroMb8UAi72JX9SSE4Fh5qha25BswqHnGPq2");
  let tokenAccountOwner = Keypair.fromSecretKey(
    Uint8Array.from([
      23, 29, 31, 142, 45, 234, 226, 158, 77, 65, 81, 204, 204, 36, 23, 189, 106, 69, 59, 212, 12, 36, 84, 157, 236,
      171, 35, 26, 21, 217, 238, 202, 101, 234, 192, 214, 252, 92, 68, 118, 94, 2, 40, 144, 174, 4, 71, 136, 179, 59,
      31, 57, 183, 217, 61, 221, 225, 0, 222, 82, 91, 151, 82, 80,
    ])
  );

  let receiverTokenAccountPubkey = new PublicKey("HUrZoLwp65hVNdZ39cSxocEKgkFCNe2RkPG8943WDWEt");

  // 需要接收mint的話，就要擁有那個mint的相對應token account
  // 如果對方也沒有相對應的token account的話你可以為他產生一個
  // 產生方法可以看create-token-account的介紹
  // 而solana天生可以帶多insturciton的特性可以讓所有的步驟在同一個tx一次完成

  let tx = new Transaction();
  tx.add(
    SPLToken.Token.createTransferInstruction(
      SPLToken.TOKEN_PROGRAM_ID, // 固定帶這個
      tokenAccount, // (token account) from
      receiverTokenAccountPubkey, // (token account) to
      tokenAccountOwner.publicKey, // token account owner
      [], // 如果你的from的owner是mutiple singer 這邊會需要把其他的singer也帶進來
      1e9 // 要轉帳的數量 這邊是最小單位 也就是說decimals如果是9 想要轉1顆來就得帶1e9
    )
  );
  tx.feePayer = feePayer.publicKey;

  let tsHash = await sendAndConfirmTransaction(connection, tx, [feePayer, tokenAccountOwner]);
  console.log(`txHash: ${tsHash}`);
}

main().then(
  () => process.exit(),
  (err) => {
    console.error(err);
    process.exit(-1);
  }
);
