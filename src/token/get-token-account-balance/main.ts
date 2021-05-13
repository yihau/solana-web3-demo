import { Keypair, Connection, PublicKey } from "@solana/web3.js";

async function main() {
  const url = "http://localhost:8899";
  let connection = new Connection(url);
  let feePayerTokenAccountPubkey = new PublicKey(
    "HUrZoLwp65hVNdZ39cSxocEKgkFCNe2RkPG8943WDWEt"
  );

  let response = await connection.getTokenAccountBalance(
    feePayerTokenAccountPubkey
  );
  console.log(response);
}

main().then(
  () => process.exit(),
  (err) => {
    console.error(err);
    process.exit(-1);
  }
);
