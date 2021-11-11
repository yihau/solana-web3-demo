import { Keypair, Connection, Transaction, SystemProgram, TransactionInstruction, PublicKey } from "@solana/web3.js";
import * as bs58 from "bs58";

(async function () {
  // 5pVyoAeURQHNMVU7DmfMHvCDNmTEYXWfEwc136GYhTKG for test
  const newFeePayer = Keypair.fromSecretKey(
    bs58.decode("5MaiiCavjCmn9Hs1o3eznqDEhRwxo7pXiAYez7keQUviUkauRiTMD8DrESdrNjN8zd9mTmVhRvBJeg5vhyvgrAhG")
  );

  // 8DMP4Ytk6Znu4GxDrrQnGNvx7ZZdR4UaMom3HTH9CZqs for test
  const oriAccount = Keypair.fromSecretKey(
    bs58.decode("4UojpNP3oQBR1jbdcCyVyNyYJ1hnjaJWLrkzK4zEv8bdtVEuKyUX5Nfau24ZxqSFxwTYcVEBBrngXZRWcwf7B8os")
  );

  const connection = new Connection("https://api.devnet.solana.com");

  // 1) to simulate your current situation
  //   let tx = new Transaction().add(
  //     SystemProgram.allocate({
  //       accountPubkey: oriAccount.publicKey,
  //       space: 100,
  //     })
  //   );
  //   console.log(`txhash: ${await connection.sendTransaction(tx, [oriAccount])}`);

  // 2) deploy the program

  // 3) recover your account
  //   const programId = new PublicKey("AfYY9LPWptXWv9YSZws4wehZMNX5o2YiUzKqmXEqJVyu");
  //   let tx = new Transaction().add(
  //     SystemProgram.assign({
  //       accountPubkey: oriAccount.publicKey,
  //       programId: programId,
  //     }),
  //     new TransactionInstruction({
  //       keys: [
  //         {
  //           pubkey: oriAccount.publicKey,
  //           isSigner: false,
  //           isWritable: true,
  //         },
  //         {
  //           pubkey: newFeePayer.publicKey,
  //           isSigner: false,
  //           isWritable: true,
  //         },
  //       ],
  //       programId: programId,
  //     })
  //   );
  //   tx.feePayer = newFeePayer.publicKey;
  //   console.log(`txhash: ${await connection.sendTransaction(tx, [oriAccount, newFeePayer])}`);

  // 4) test for origin account
  //   let tx = new Transaction().add(
  //     SystemProgram.transfer({
  //       fromPubkey: oriAccount.publicKey,
  //       toPubkey: newFeePayer.publicKey,
  //       lamports: 1,
  //     })
  //   );
  //   console.log(`txhash: ${await connection.sendTransaction(tx, [oriAccount])}`);
})();
