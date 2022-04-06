import { Keypair, Transaction, SystemProgram, Connection, PublicKey } from "@solana/web3.js";

import {
  ACCOUNT_SIZE,
  createAssociatedTokenAccountInstruction,
  createInitializeAccountInstruction,
  getAssociatedTokenAddress,
  getMinimumBalanceForRentExemptAccount,
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

const mintPubkey = new PublicKey("AjMpnWhqrbFPJTQps4wEPNnGuQPMKUcfqHUqAeEf1WM4");

// 創建Token Account

// 如果要在Solana上收Token的話，會需要創造且初始化一個相對應的Token Account
// 換句話說，如果你要收USDC，你會需要準備一個收USDC的Account，如果想要收RAY，也是一樣的。
// 而這幾個收Token的Account在Solana裡面都會是不一樣的地址 (是不同的Account)

// 創建Token Account的方法有兩種

// 1. 隨機產生
// 這種方法的概念就是隨便找一個地址，然後對他做Token Account的初始化
// 目前不建議使用這種方法，這種方法會造成Token Account管理上的麻煩 (因為要記錄許多不同的Account)
// 現在比較推薦能用第二種方式產生Token Account

// 2. Associated Token Address (ATA)
// 這種方式會依據你的SOL地址推算出你的Token Account地址
// 所以每次算出來的都會是一樣的，在管理上只需要知道SOL的地址就可以知道他的Token地址

(async () => {
  // 1. Random
  {
    let tokenAccount = Keypair.generate();
    console.log(`ramdom token address: ${tokenAccount.publicKey.toBase58()}`);

    let tx = new Transaction();
    tx.add(
      // create account
      SystemProgram.createAccount({
        fromPubkey: feePayer.publicKey,
        newAccountPubkey: tokenAccount.publicKey,
        space: ACCOUNT_SIZE,
        lamports: await getMinimumBalanceForRentExemptAccount(connection),
        programId: TOKEN_PROGRAM_ID,
      }),
      // init token account
      createInitializeAccountInstruction(tokenAccount.publicKey, mintPubkey, alice.publicKey)
    );

    console.log(
      `create random token account txhash: ${await connection.sendTransaction(tx, [feePayer, tokenAccount])}`
    );
  }

  // 2. ATA
  {
    let ata = await getAssociatedTokenAddress(
      mintPubkey, // mint
      alice.publicKey, // owner
      false // allow owner off curve
    );
    console.log(`ata: ${ata.toBase58()}`);

    let tx = new Transaction();
    tx.add(
      createAssociatedTokenAccountInstruction(
        feePayer.publicKey, // payer
        ata, // ata
        alice.publicKey, // owner
        mintPubkey // mint
      )
    );

    console.log(`create ata txhash: ${await connection.sendTransaction(tx, [feePayer])}`);
  }
})();
