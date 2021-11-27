import { Connection, Keypair } from "@solana/web3.js";
import * as bs58 from "bs58";

// connection
const connection = new Connection("https://api.devnet.solana.com");

// 5YNmS1R9nNSCDzb5a7mMJ1dwK9uHeAAF4CmPEwKgVWr8
const feePayer = Keypair.fromSecretKey(
  bs58.decode("588FU4PktJWfGfxtzpAAXywSNt74AvtroVzGfKkVN1LwRuvHwKGr851uH8czM5qm4iqLbs1kKoMKtMJG4ATR7Ld2")
);

(async () => {
  // 1e9 lamports = 10^9 lamports = 1 SOL
  let txhash = await connection.requestAirdrop(feePayer.publicKey, 1e9);
  console.log(`txhash: ${txhash}`);
})();
