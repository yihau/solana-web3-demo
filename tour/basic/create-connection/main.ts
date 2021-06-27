import { Connection } from "@solana/web3.js";

// 與Solana建立連線

async function main() {
  // 如果你有裝Solana cli的工具，可以使用 solana-test-validator 在本地建立測試鏈 (Windows尚未支援)
  const url = "http://localhost:8899";

  // 也可以使用官方建立的devnet來進行測試
  // const url = "http://api.testnet.solana.com";
  let connection = new Connection(url);

  // 打印節點的版本資訊
  const version = await connection.getVersion();
  console.log("Connection to cluster established:", url, version);
}

main().then(
  () => process.exit(),
  (err) => {
    console.error(err);
    process.exit(-1);
  }
);
