import {
  Keypair,
  Transaction,
  SystemProgram,
  Connection,
  NONCE_ACCOUNT_LENGTH,
  sendAndConfirmTransaction,
  PublicKey,
  NonceAccount,
} from "@solana/web3.js";

const url = "http://localhost:8899";
const connection = new Connection(url);
const feePayer = Keypair.fromSecretKey(
  Uint8Array.from([
    206, 54, 90, 62, 42, 169, 79, 30, 10, 214, 71, 58, 161, 79, 210, 133, 123, 207, 196, 142, 168, 155, 129, 108, 35,
    155, 218, 75, 82, 233, 79, 40, 67, 120, 93, 30, 66, 81, 199, 231, 199, 75, 70, 229, 64, 75, 252, 105, 43, 152, 135,
    212, 92, 179, 44, 129, 174, 181, 26, 186, 90, 20, 83, 69,
  ])
);

async function main() {
  // 之前我們在發交易的時候，其實在tx裡面有幫我們偷做一件事情，就是拿一塊最近的blockhash塞進去後一起簽名
  // 而這個blockhash距離鏈上最新的區塊太遠的話，交易會送不成功 (大概拿到之後兩分鐘就會過期)
  // 這個限制也讓我們開發上難免綁手綁腳，不能讓交易在本地擱置一下之後再發出
  // 而官方有提供一個解法叫做durable nonce，概念上就是你先創一個帳號，然後把nonce塞在裡面暫存在鏈上
  // 之後你只要在你的tx的放上advanced nonce的操作，他就知道你要啟動這個機制
  // 下面我們一步一步來建立這個機制

    // ===== 1. 創造一個nonce account暫存鏈上的blockhash  =====
    let nonceAccount = Keypair.generate();
    console.log(`nonce account: ${nonceAccount.publicKey.toBase58()}`)
    let tx = new Transaction();
    tx.add(
      // 創一個nonce account
      SystemProgram.createAccount({
        fromPubkey: feePayer.publicKey,
        newAccountPubkey: nonceAccount.publicKey,
        lamports: await connection.getMinimumBalanceForRentExemption(NONCE_ACCOUNT_LENGTH),
        space: NONCE_ACCOUNT_LENGTH,
        programId: SystemProgram.programId,
      }),
      // init
      SystemProgram.nonceInitialize({
        noncePubkey: nonceAccount.publicKey,  // nonce account pubkey
        authorizedPubkey: feePayer.publicKey, // 這個auth就是之後要更新nonce的auth
      })
    );
    let txhash = await sendAndConfirmTransaction(connection, tx, [feePayer, nonceAccount])
    console.log(txhash)

  //   // ===== 2. 創建成功之後我們可以去鏈上看這個nonce account裡面存的nonce =====
  //   let accountInfo = await connection.getAccountInfo(new PublicKey("8i6EnJ6frFksanDC2Sy9M2fRhLxE8KsSuBXK84sMigK7")); // 剛剛創建出來的nonce account
  //   let nonceAccount = NonceAccount.fromAccountData(accountInfo.data);
  //   console.log(nonceAccount.nonce)

  //   // ===== 3. 利用這個nonce進行我們的下一次交易 =====
  //   let randomAccount = Keypair.generate();
  //   let tx = new Transaction();
  //   tx.add(
  //     // 這邊拿轉帳當做例子
  //     SystemProgram.transfer({
  //       fromPubkey: feePayer.publicKey,
  //       toPubkey: randomAccount.publicKey,
  //       lamports: 1e8,
  //     })
  //   );
  //   // 這邊要設定剛剛我們創建的nonce account以及這個nonce裡面暫存的blockhash
  //   tx.nonceInfo = {
  //     nonce: "By3BpKrv1AHEjHJDFAnZoVs66CsPYVHHNCaTRXhSUnnr",  // 剛剛創建的nonce account裡面暫存的nonce
  //     nonceInstruction: SystemProgram.nonceAdvance({
  //       noncePubkey: new PublicKey("8i6EnJ6frFksanDC2Sy9M2fRhLxE8KsSuBXK84sMigK7"), // 我們剛剛創建的nonce account
  //       authorizedPubkey: feePayer.publicKey, // 我們剛剛創建的 nonce account的 auth
  //     }),
  //   };
  //   let txhash = await sendAndConfirmTransaction(connection, tx, [feePayer])
  //   console.log(txhash)
}

main().then(
  () => process.exit(),
  (err) => {
    console.error(err);
    process.exit(-1);
  }
);
