import { Connection, PublicKey } from "@solana/web3.js";
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";

// NFT 其實就跟 SRM, USDC ... 一樣，只是一個mint，唯一不同的地方就是他的發行量是1
//
// 如果你想要抓取NFT的metadata，首先你要先知道該NFT的mint地址
// 下面我隨便抓一個NFT來當做例子
// https://explorer.solana.com/address/9MwGzSyuQRqmBHqmYwE6wbP3vzRBj4WWiYxWns3rkR7A
//
// tokenmeta會存在一個PDA內，他的算法是依據NFT的mint地址算出來的
// => ['metadata', metadata_program_id, mint_id]
// 只要知道就可以了，因為SDK都幫我們包好了

const connection = new Connection("https://api.mainnet-beta.solana.com");

(async () => {
  let mintPubkey = new PublicKey("9MwGzSyuQRqmBHqmYwE6wbP3vzRBj4WWiYxWns3rkR7A");
  let tokenmetaPubkey = await Metadata.getPDA(mintPubkey);

  const tokenmeta = await Metadata.load(connection, tokenmetaPubkey);
  console.log(tokenmeta);
})();

