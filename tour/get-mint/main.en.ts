import { Keypair, Transaction, SystemProgram, Connection, PublicKey } from "@solana/web3.js";

import { getMint } from "@solana/spl-token";

// connection
const connection = new Connection("https://api.devnet.solana.com");

const mintPubkey = new PublicKey("2GouGzZ5Z5s8FJmwPkca8Urma64WBFZ8twRCUbLQARkb");

// fetch mint info

// you can get mint informations by a mint address

(async () => {
  let mint = await getMint(connection, mintPubkey);
  console.log(mint);

  // you will find that the data not include name, symbol, image...
  // because in the begin, solana don't make these data write on chain
  // if you want to fetch these info, refer to
  // https://github.com/solana-labs/token-list
})();
