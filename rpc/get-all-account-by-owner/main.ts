import { CONNECTION, ALICE, TEST_MINT } from "../../helper/const"

// 查詢owner擁有多少個token account

async function main() {
  let response = await CONNECTION.getTokenAccountsByOwner(ALICE.publicKey, {
    mint: TEST_MINT,
  });
  response.value.forEach((e) => {
    console.log(`pubkey: ${e.pubkey.toBase58()}`);
  });
}

main().then(
  () => process.exit(),
  (err) => {
    console.error(err);
    process.exit(-1);
  }
);
