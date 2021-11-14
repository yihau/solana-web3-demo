import { Keypair } from "@solana/web3.js";
import * as bs58 from "bs58";
import { derivePath } from "ed25519-hd-key";
import * as bip39 from "bip39";

// 建立solana帳戶

(async () => {
  // 1. 創建一個隨機的帳戶
  {
    let alice = Keypair.generate();
    console.log(`pubkey: ${alice.publicKey.toBase58()}`);

    // 這是真實私鑰的樣子，也是solana keypair file存的格式
    console.log(`raw prikey: [${Array.from(alice.secretKey)}]`);

    // 可以用下面這種方式來還原raw private
    // Keypair.fromSecretKey(
    //   Uint8Array.from([
    //     174, 47, 154, 16, 202, 193, 206, 113, 199, 190, 53, 133, 169, 175, 31, 56, 222, 53, 138, 189, 224, 216, 117,
    //     173, 10, 149, 53, 45, 73, 251, 237, 246, 15, 185, 186, 82, 177, 240, 148, 69, 241, 227, 167, 80, 141, 89, 240,
    //     121, 121, 35, 172, 247, 68, 251, 226, 218, 48, 63, 176, 109, 168, 89, 238, 135,
    //   ])
    // );

    // 你可以用易讀一些的bs58編碼，這也是phantom上面你導出私鑰會看到的格式
    console.log(`private key for phantom:: ${bs58.encode(alice.secretKey)}`);

    // 可以反向的把phantom錢包的私鑰轉為keypair物件
    let fromPhantom = Keypair.fromSecretKey(
      bs58.decode("5MaiiCavjCmn9Hs1o3eznqDEhRwxo7pXiAYez7keQUviUkauRiTMD8DrESdrNjN8zd9mTmVhRvBJeg5vhyvgrAhG")
    );
    console.log(`from phantom private key: ${fromPhantom.publicKey.toBase58()}`);
  }

  // 2. 用seed來創建帳戶 (solana cli tool)
  {
    var seedFromSolanaCli = "pill tomorrow foster begin walnut borrow virtual kick shift mutual shoe scatter";
    let seedBuffer = bip39.mnemonicToSeedSync(seedFromSolanaCli, "");
    let fromSolanaCliTool = Keypair.fromSeed(seedBuffer.slice(0, 32));
    // 5ZWj7a1f8tWkjBESHKgrLmXshuXxqeY9SYcfbshpAqPG
    console.log(`from solana cli tool seed: ${fromSolanaCliTool.publicKey.toBase58()}`);
  }

  // 3. 用seed來創建帳戶 (phantom)
  {
    let seedFromPhantomWallet = "neither lonely flavor argue grass remind eye tag avocado spot unusual intact";
    let path = `m/44'/501'/0'/0'`;
    var seedBuffer = bip39.mnemonicToSeedSync(seedFromPhantomWallet, "");
    let fromPhantomSeed = Keypair.fromSeed(derivePath(path, seedBuffer.toString("hex")).key);
    // 5vftMkHL72JaJG6ExQfGAsT2uGVHpRR7oTNUPMs68Y2N
    console.log(`from phantom wallet seed: ${fromPhantomSeed.publicKey.toBase58()}`);
  }
})();
