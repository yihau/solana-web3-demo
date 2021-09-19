import { CONNECTION, ALICE_TOKEN_ADDRESS_1 } from "../../../helper/const";

// 查詢代幣餘額

async function main() {
  console.log(await CONNECTION.getTokenAccountBalance(ALICE_TOKEN_ADDRESS_1))
}

main().then(
  () => process.exit(),
  (err) => {
    console.error(err);
    process.exit(-1);
  }
);
