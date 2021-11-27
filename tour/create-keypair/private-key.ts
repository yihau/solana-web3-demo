import { Keypair } from "@solana/web3.js";
import * as bs58 from "bs58";

(async () => {
  // 1. create a random
  {
    const keypair = Keypair.generate();
    console.log(`public key: ${keypair.publicKey.toBase58()}`);
    console.log(`private key(raw): ${keypair.secretKey}`);
    console.log(`private key(bs58): ${bs58.encode(keypair.secretKey)}`);
  }

  // 2. from bs58 string
  {
    const keypair = Keypair.fromSecretKey(
      bs58.decode("5MaiiCavjCmn9Hs1o3eznqDEhRwxo7pXiAYez7keQUviUkauRiTMD8DrESdrNjN8zd9mTmVhRvBJeg5vhyvgrAhG")
    );
  }

  // 3. from bytes
  {
    const keypair = Keypair.fromSecretKey(
      Uint8Array.from([
        174, 47, 154, 16, 202, 193, 206, 113, 199, 190, 53, 133, 169, 175, 31, 56, 222, 53, 138, 189, 224, 216, 117,
        173, 10, 149, 53, 45, 73, 251, 237, 246, 15, 185, 186, 82, 177, 240, 148, 69, 241, 227, 167, 80, 141, 89, 240,
        121, 121, 35, 172, 247, 68, 251, 226, 218, 48, 63, 176, 109, 168, 89, 238, 135,
      ])
    );
    console.log(`${keypair.publicKey.toBase58()}`); // 24PNhTaNtomHhoy3fTRaMhAFCRj4uHqhZEEoWrKDbR5p
  }
})();
