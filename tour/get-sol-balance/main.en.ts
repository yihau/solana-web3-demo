import { CONNECTION, ALICE } from "../../helper/const";

// get SOL balance

async function main() {
  console.log(await CONNECTION.getBalance(ALICE.publicKey))
}

main().then(
  () => process.exit(),
  (err) => {
    console.error(err);
    process.exit(-1);
  }
);
