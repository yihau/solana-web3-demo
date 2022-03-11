import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { Connection } from "@solana/web3.js";

(async () => {
  let connection = new Connection("https://solana-api.projectserum.com");
  console.log(
    await connection.getProgramAccounts(TOKEN_PROGRAM_ID, {
      filters: [
        {
          dataSize: 165,
        },
        {
          memcmp: {
            offset: 0,
            bytes: "your mint address here",
          },
        },
        {
          memcmp: {
            offset: 32,
            bytes: "your owner address here",
          },
        },
        {
          memcmp: {
            offset: 64,
            bytes: "Ahg1opVcGX", // bs58 for [1,0,0,0,0,0,0,0], it is a byte array for u64 little endian
          },
        },
      ],
      dataSlice: {
        offset: 0,
        length: 0,
      },
    })
  );
})();
