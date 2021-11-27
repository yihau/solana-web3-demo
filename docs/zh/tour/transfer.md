# Transfer

@[code](@/tour/transfer/main.ts)

1. 這個交易是`alice`轉帳 1 SOL 給`4MWwxzWsWmHrsbfPFwE6LDq471nqNeNMsD6DS7y8nruw`，feePayer是`feePayer`。
2. `tx.feePayer = feePayer.publicKey;` 是可以省略的。如果沒有特別指定feePayer是誰，這個交易的第一個簽名的人會被當作是feePayer。
