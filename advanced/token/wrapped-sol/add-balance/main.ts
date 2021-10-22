import { Keypair, Transaction, SystemProgram, TransactionInstruction} from "@solana/web3.js";

import { ALICE, CONNECTION, FEE_PAYER, TEST_MINT } from "../../../../helper/const";

import * as SPLToken from "@solana/spl-token";

// 增加餘額

// wrapped sol要增加餘額的方式就不是像是一般mint那樣可以使用mint to，下面有兩種方法可以達到我們的目的

// 1. 暫時的token account
//   a. 先創建一個隨機的帳戶，並把我們需要的wrapped SOL amount也一起打進去 (所以總共會是 rent + amount)
//   b. 使用轉帳把剛剛的錢打到我們的目標帳戶上
//   c. 把我們剛剛的暫時的帳戶回收

// 2. SyncNative
//   a. 轉SOL到token帳戶內
//   b. 做SyncNative來刷新餘額

async function main() {
  let ata = await SPLToken.Token.getAssociatedTokenAddress(
    SPLToken.ASSOCIATED_TOKEN_PROGRAM_ID,
    SPLToken.TOKEN_PROGRAM_ID,
    SPLToken.NATIVE_MINT,
    ALICE.publicKey
  );
  console.log(`ata: ${ata.toBase58()}`);

  // 1. 暫時的token account

  let tmpAccount = Keypair.generate();
  // wrapped sol的decimals是9
  let amount = 1e9;
  let tx1 = new Transaction();
  tx1.add(
    SystemProgram.createAccount({
      fromPubkey: FEE_PAYER.publicKey,
      newAccountPubkey: tmpAccount.publicKey,
      space: SPLToken.AccountLayout.span,
      lamports: (await SPLToken.Token.getMinBalanceRentForExemptAccount(CONNECTION)) + amount, // rent + amount
      programId: SPLToken.TOKEN_PROGRAM_ID,
    }),
    SPLToken.Token.createInitAccountInstruction(
      SPLToken.TOKEN_PROGRAM_ID,
      SPLToken.NATIVE_MINT,
      tmpAccount.publicKey,
      ALICE.publicKey
    ),
    SPLToken.Token.createTransferInstruction(
      SPLToken.TOKEN_PROGRAM_ID,
      tmpAccount.publicKey,
      ata,
      ALICE.publicKey,
      [],
      amount
    ),
    SPLToken.Token.createCloseAccountInstruction(
      SPLToken.TOKEN_PROGRAM_ID,
      tmpAccount.publicKey,
      ALICE.publicKey,
      ALICE.publicKey,
      []
    )
  );
  tx1.feePayer = FEE_PAYER.publicKey;
  console.log(`tx1 txhash: ${await CONNECTION.sendTransaction(tx1, [FEE_PAYER, tmpAccount, ALICE])}`);

  // 2. SyncNative
  let tx2 = new Transaction();
  tx2.add(
    SystemProgram.transfer({
      fromPubkey: ALICE.publicKey,
      toPubkey: ata,
      lamports: amount,
    }),
    // 因為spl-token那邊還沒把這個介面export出來，我們就直接寫原生操作
    new TransactionInstruction({
      keys: [
        {
          pubkey: ata,
          isSigner: false,
          isWritable: true,
        },
      ],
      data: Buffer.from(new Uint8Array([17])),
      programId: SPLToken.TOKEN_PROGRAM_ID,
    })
  );
  tx2.feePayer = FEE_PAYER.publicKey;

  console.log(`ata txhash: ${await CONNECTION.sendTransaction(tx2, [FEE_PAYER, ALICE])}`);
}

main().then(
  () => process.exit(),
  (err) => {
    console.error(err);
    process.exit(-1);
  }
);
