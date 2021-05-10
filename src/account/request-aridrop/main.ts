import { Keypair, Connection } from "@solana/web3.js";

async function main() {
  // 前一章節我們知道如何建立一個普通帳戶
  // 這裡我們會需要為帳戶打點錢方便之後的tx操作

  // 可以在本地用 solana-test-validator 起一個測試的鏈方便測試
  const url = "http://localhost:8899";
  let connection = new Connection(url);

  // 打印版本資訊連接的節點的版本資訊
  const version = await connection.getVersion();
  console.log("Connection to cluster established:", url, version);

  let alice = Keypair.generate();
  console.log(`alice: ${alice.secretKey}`)
  await connection.requestAirdrop(alice.publicKey, 1e10);

  // 等待鏈上完成交易
  for (;;) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    let balance = await connection.getBalance(alice.publicKey);
    if (balance != 0) {
      console.log(`alice: ${await connection.getBalance(alice.publicKey)}`);
      break;
    }
  }
}

main().then(
  () => process.exit(),
  (err) => {
    console.error(err);
    process.exit(-1);
  }
);
