# Transfer

@[code](@/tour/transfer/main.ts)

1. this tx do `alice` transfer 1 SOL to `4MWwxzWsWmHrsbfPFwE6LDq471nqNeNMsD6DS7y8nruw` and fee payer is `feePayer`
2. `tx.feePayer = feePayer.publicKey;` is dispensable. If you don't make it explicit, the first signer of this tx will be treated as a fee payer.
