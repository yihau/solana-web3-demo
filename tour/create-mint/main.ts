import { Keypair, Transaction, SystemProgram, Connection } from "@solana/web3.js";

import {
  createInitializeMintInstruction,
  getMinimumBalanceForRentExemptMint,
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

import * as bs58 from "bs58";

// connection
const connection = new Connection("https://api.devnet.solana.com");

// 5YNmS1R9nNSCDzb5a7mMJ1dwK9uHeAAF4CmPEwKgVWr8
const feePayer = Keypair.fromSecretKey(
  bs58.decode("588FU4PktJWfGfxtzpAAXywSNt74AvtroVzGfKkVN1LwRuvHwKGr851uH8czM5qm4iqLbs1kKoMKtMJG4ATR7Ld2")
);

// G2FAbFQPFa5qKXCetoFZQEvF9BVvCKbvUZvodpVidnoY
const alice = Keypair.fromSecretKey(
  bs58.decode("4NMwxzmYj2uvHuq8xoqhY8RXg63KSVJM1DXkpbmkUY7YQWuoyQgFnnzn6yo3CMnqZasnNPNuAT2TLwQsCaKkUddp")
);

// 創建 Mint (發行自己的token)

// Mint的概念就像是Ethereum上的ERC-20的地址
// 換句話說，USDC、RAY、SRM ... 都是mint

(async () => {
  // create a mint account
  let mint = Keypair.generate();
  console.log(`mint: ${mint.publicKey.toBase58()}`);

  let tx = new Transaction();
  tx.add(
    // create account
    SystemProgram.createAccount({
      fromPubkey: feePayer.publicKey,
      newAccountPubkey: mint.publicKey,
      space: MINT_SIZE,
      lamports: await getMinimumBalanceForRentExemptMint(connection),
      programId: TOKEN_PROGRAM_ID,
    }),
    // init mint
    createInitializeMintInstruction(
      mint.publicKey, // 幣的地址
      0, // 位數
      alice.publicKey, // 增發幣的權限
      null // 冷凍帳戶的權限 (我們這邊先留null)
    )
  );

  console.log(`txhash: ${await connection.sendTransaction(tx, [feePayer, mint])}`);
})();
