import { Keypair } from "@solana/web3.js";

// 建立Solana的帳戶

async function main() {
  // 新建一組keypair
  let alice = Keypair.generate();

  // 這樣可以拿到pubkey，基本上在explorer上都會看到base58過後的值
  console.log(`pubkey: ${alice.publicKey.toBase58()}`);

  // 也可以印出私鑰的數值
  console.log(`prikey: [${Array.from(alice.secretKey)}]`);
}

main().then(
  () => process.exit(),
  (err) => {
    console.error(err);
    process.exit(-1);
  }
);
