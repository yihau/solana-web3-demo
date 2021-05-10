import {
    Keypair,
    Transaction,
    SystemProgram,
    Connection,
    sendAndConfirmTransaction,
    PublicKey,
  } from "@solana/web3.js";

  import * as SPLToken from "@solana/spl-token";

  async function main() {
    const url = "http://localhost:8899";
    let connection = new Connection(url);
    // prettier-ignore
    let feePayer = Keypair.fromSecretKey(Uint8Array.from([206,54,90,62,42,169,79,30,10,214,71,58,161,79,210,133,123,207,196,142,168,155,129,108,35,155,218,75,82,233,79,40,67,120,93,30,66,81,199,231,199,75,70,229,64,75,252,105,43,152,135,212,92,179,44,129,174,181,26,186,90,20,83,69]))
    let mintPubkey = new PublicKey(
      "Fpb9rrF7iW3eHNTvgpZX3LTC3PwYT7jCzB3zdUmnyCfw"
    );
    let feePayerTokenAccountPubkey = new PublicKey(
      "HUrZoLwp65hVNdZ39cSxocEKgkFCNe2RkPG8943WDWEt"
    );
    let receiveTokenAccountPubkey = new PublicKey(
        "35m6F4P1VYKTXMAayVKq11SYTPpANUqYZMAMeoXX29vp"
    )

    // 需要接收mint的話，就要擁有那個mint的相對應token account
    // 如果對方也沒有相對應得token account的話你可以為他產生一個
    // 產生方法可以看create-token-account的介紹
    // 而solana天生可以帶多insturciton的特性可以讓所有的步驟在同一個tx一次完成

    let tx = new Transaction();
    tx.add(
      SPLToken.Token.createTransferInstruction(
        SPLToken.TOKEN_PROGRAM_ID, // program id
        feePayerTokenAccountPubkey, // token from
        receiveTokenAccountPubkey, // token to
        feePayer.publicKey, // token from auth
        [], // 如果你的token from的auth是mutiple singer 這邊會需要把其他的singer帶進來
        1e9, // 要轉帳的數量 這邊是最小單位 也就是說decimals如果是9 想要轉1顆來就得帶1e9
      )
    );
    tx.feePayer = feePayer.publicKey;

    let tsHash = await sendAndConfirmTransaction(connection, tx, [feePayer]); // 如果token from的auth不是feePayer, 這邊會需要額外也把auth也帶進來
    console.log(`txHash: ${tsHash}`);
  }

  main().then(
    () => process.exit(),
    (err) => {
      console.error(err);
      process.exit(-1);
    }
  );
