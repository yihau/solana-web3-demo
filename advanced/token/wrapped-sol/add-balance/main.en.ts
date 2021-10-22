import { Keypair, Transaction, SystemProgram, TransactionInstruction} from "@solana/web3.js";

import { ALICE, CONNECTION, FEE_PAYER, TEST_MINT } from "../../../../helper/const";

import * as SPLToken from "@solana/spl-token";

// add balance

// wrapped sol can't use `mint to`. here are two ways we can increase our wrapped sol balance

// 1. use tmp account
//   a. create a tmp account with init balance which is rent + amount
//   b. use `token transfer` to trasnfer wrapped sol to our token account
//   c. close the tmp account

// 2. SyncNative
//   a. transfer SOL to our token account
//   b. do `SyncNative` instruction

async function main() {
  let ata = await SPLToken.Token.getAssociatedTokenAddress(
    SPLToken.ASSOCIATED_TOKEN_PROGRAM_ID,
    SPLToken.TOKEN_PROGRAM_ID,
    SPLToken.NATIVE_MINT,
    ALICE.publicKey
  );
  console.log(`ata: ${ata.toBase58()}`);

  // 1. use tmp account

  let tmpAccount = Keypair.generate();
  // wrapped sol's decimals is 9
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
    // I worte raw instruction because @solana/spl-token havn't export this interface out
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
