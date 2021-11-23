import { Connection } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import * as bs58 from "bs58";
// get NFT current owner

const connection = new Connection("https://api.mainnet-beta.solana.com");

(async () => {
  let accountInfos = await connection.getProgramAccounts(TOKEN_PROGRAM_ID, {
    encoding: "base64",
    filters: [
      {
        dataSize: 165,
      },
      {
        memcmp: {
          offset: 0,
          bytes: "9MwGzSyuQRqmBHqmYwE6wbP3vzRBj4WWiYxWns3rkR7A", // your mint here
        },
      },
      {
        memcmp: {
          offset: 64,
          bytes: "Ahg1opVcGX", // this is base58 encode [1,0,0,0,0,0,0,0]
        },
      },
    ],
  });

  // if everything goes right, it will be an array which only contain one item.
  // the item is a token account which hold the NFT.
  console.log(accountInfos);

  // you can parse its data to retrieve the real owner (SOL address)
  console.log(`owner: ${bs58.encode(accountInfos[0].account.data.slice(32, 64))}`);
})();
