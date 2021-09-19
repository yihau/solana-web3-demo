import { CONNECTION, FEE_PAYER } from "../../helper/const";

// request some SOL airdrop

async function main() {
  // get SOL airdrop
  let txhash = await CONNECTION.requestAirdrop(FEE_PAYER.publicKey, 1e9);

  // you can lookup this tx on https://explorer.solana.com, remember to chose the network which you are using
  console.log(`txhash: ${txhash}`);
}

main().then(
  () => process.exit(),
  (err) => {
    console.error(err);
    process.exit(-1);
  }
);
