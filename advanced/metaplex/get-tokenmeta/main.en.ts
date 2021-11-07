import { programs } from "@metaplex/js";
import { Connection, PublicKey } from "@solana/web3.js";

// NFT is a mint. just like SRM, USDC ..., the only different is that NFT's supply is 1
//
// if we want to get NFT's metadata, first we need to know what is the mint address.
// here I take a random DAPE as an example
// https://explorer.solana.com/address/9MwGzSyuQRqmBHqmYwE6wbP3vzRBj4WWiYxWns3rkR7A
//
// tokenmeta is a PDA a which derived by mint address
// the formula is ['metadata', metadata_program_id, mint_id]
// is it totally fine to forget it because sdk already wrapped it for us

const connection = new Connection("https://api.mainnet-beta.solana.com");

async function main() {
  let mintPubkey = new PublicKey("9MwGzSyuQRqmBHqmYwE6wbP3vzRBj4WWiYxWns3rkR7A");
  let tokenmetaPubkey = await programs.metadata.Metadata.getPDA(mintPubkey);

  const tokenmeta = await programs.metadata.Metadata.load(connection, tokenmetaPubkey);
  console.log(tokenmeta);
}

main().then(
  () => process.exit(),
  (err) => {
    console.error(err);
    process.exit(-1);
  }
);
