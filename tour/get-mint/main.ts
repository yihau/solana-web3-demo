import { Keypair, Transaction, SystemProgram, Connection, PublicKey } from "@solana/web3.js";

import { getMint } from "@solana/spl-token";

// connection
const connection = new Connection("https://api.devnet.solana.com");

const mintPubkey = new PublicKey("2GouGzZ5Z5s8FJmwPkca8Urma64WBFZ8twRCUbLQARkb");

// 拿mint的資訊

// 你可以透過mint的地址來抓取他裡面的詳細資訊

(async () => {
  let mint = await getMint(connection, mintPubkey);
  console.log(mint);

  // 你會發現name, symbol, image並不在回來的資訊上
  // 因為當初solana並沒有把這幾個欄位也規劃上鏈
  // 如果有需要抓取相關資訊可以參考
  // https://github.com/solana-labs/token-list
})();
