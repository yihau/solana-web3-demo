import { Connection } from "@solana/web3.js";

// build a connection

async function main() {
  // you can host a local node by solana-test-validator if you have installed solana cli tool
  // (hasn't support for Windows yet)
  const url = "http://localhost:8899";

  // also you can use devnet directly
  // const url = "http://api.testnet.solana.com";
  let connection = new Connection(url);

  // print version
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
