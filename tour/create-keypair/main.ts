import { Keypair } from "@solana/web3.js";
import * as bs58 from 'bs58';

// 建立Solana的帳戶

async function main() {
  // 新建一組keypair
  let alice = Keypair.generate();

  // 這樣可以拿到pubkey，基本上在explorer上都會看到base58過後的值
  console.log(`pubkey: ${alice.publicKey.toBase58()}`);

  // 也可以印出私鑰的數值
  console.log(`prikey: [${Array.from(alice.secretKey)}]`);

  // =========================================================

  // 如果你想要匯入到phantom, 可以透過以下方式拿到phantom的private格式
  console.log(`private key for phantom:: ${bs58.encode(alice.secretKey)}`);

  // 同樣的，如果你有phantom的私鑰，也能反向做bs58 decode來還原成 web3 js的keypair
  let fromPhantom = Keypair.fromSecretKey(bs58.decode("5MaiiCavjCmn9Hs1o3eznqDEhRwxo7pXiAYez7keQUviUkauRiTMD8DrESdrNjN8zd9mTmVhRvBJeg5vhyvgrAhG"))
  console.log(`address from phantom private: ${fromPhantom.publicKey.toBase58()}`)
}

main().then(
  () => process.exit(),
  (err) => {
    console.error(err);
    process.exit(-1);
  }
);
