import { Keypair } from "@solana/web3.js";

async function main() {
  let alice = Keypair.generate();

  // 這樣可以拿到pubkey，基本上在explorer上都會看到base58過後的值
  console.log(`pubkey: ${alice.publicKey.toBase58()}`);
  // 這是一個 u8 的 array
  console.log(`pubkey: ${Array.from(alice.secretKey)}`);

  // 當然你也可以從已知的private key導回account
  // 我們先一個測試用的帳號 => $ solana-keygen new -o ./testaccount.json
  // cat ./testaccount.json 會顯示一段u8的array, 把他傳進去

  // prettier-ignore
  let testAccount = Keypair.fromSecretKey(Uint8Array.from([174,47,154,16,202,193,206,113,199,190,53,133,169,175,31,56,222,53,138,189,224,216,117,173,10,149,53,45,73,251,237,246,15,185,186,82,177,240,148,69,241,227,167,80,141,89,240,121,121,35,172,247,68,251,226,218,48,63,176,109,168,89,238,135]))
  console.log(`pubkey: ${testAccount.publicKey.toBase58()}`);
  // 這個值應該會與你做 solana address -k ./testaccount.json
  // 顯示的數值一樣
}

main().then(
  () => process.exit(),
  (err) => {
    console.error(err);
    process.exit(-1);
  }
);
