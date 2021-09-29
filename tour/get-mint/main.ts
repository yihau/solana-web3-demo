import { CONNECTION, TEST_MINT } from "../../helper/const";

import * as SPLToken from "@solana/spl-token";

// 拿mint的資訊

// 你可以透過mint的地址來抓取他裡面的詳細資訊

async function main() {
  // 可以透過@solana/spl-token裡面幫我們包好的function來拿取mint資訊
  // 這邊依序會需要, connection, mint address, token program id, fee payer
  // 但因為我們只需要拿取資料而已，所以fee payer部分我們留null即可
  let token = new SPLToken.Token(CONNECTION, TEST_MINT, SPLToken.TOKEN_PROGRAM_ID, null);
  let tokenInfo = await token.getMintInfo();
  console.log(tokenInfo);

  // 你會發現name, symbol, image並不在回來的資訊上
  // 因為當初solana並沒有把這幾個欄位也規劃上鏈
  // 如果有需要抓取相關資訊可以參考
  // https://github.com/solana-labs/token-list
}

main().then(
  () => process.exit(),
  (err) => {
    console.error(err);
    process.exit(-1);
  }
);
