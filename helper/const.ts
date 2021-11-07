import { Keypair, Connection, PublicKey } from "@solana/web3.js";

// 5YNmS1R9nNSCDzb5a7mMJ1dwK9uHeAAF4CmPEwKgVWr8
export const FEE_PAYER = Keypair.fromSecretKey(
  Uint8Array.from([
    206, 54, 90, 62, 42, 169, 79, 30, 10, 214, 71, 58, 161, 79, 210, 133, 123, 207, 196, 142, 168, 155, 129, 108, 35,
    155, 218, 75, 82, 233, 79, 40, 67, 120, 93, 30, 66, 81, 199, 231, 199, 75, 70, 229, 64, 75, 252, 105, 43, 152, 135,
    212, 92, 179, 44, 129, 174, 181, 26, 186, 90, 20, 83, 69,
  ])
);

// 2hieMSXcsk3F3bZE8iDe7WGREZesRDnDjHtdPVjya4NA
export const ALICE = Keypair.fromSecretKey(
  Uint8Array.from([
    16, 169, 21, 27, 237, 134, 45, 100, 113, 192, 66, 107, 174, 36, 175, 110, 195, 29, 133, 60, 134, 224, 92, 212, 74,
    138, 10, 139, 228, 27, 48, 106, 25, 74, 1, 158, 20, 222, 117, 41, 169, 27, 181, 228, 44, 110, 140, 200, 168, 187,
    24, 5, 88, 67, 100, 134, 162, 184, 245, 220, 111, 72, 139, 31,
  ])
);

// export const API_ENDPOINT = "https://api.devnet.solana.com";
export const API_ENDPOINT = "http://localhost:8899";

export const CONNECTION = new Connection(API_ENDPOINT);

export const TEST_MINT = new PublicKey("E4ZN2KmnVmpwLwjJNAwRjuQLeE5iFHLcAJ8LGB7FMaGQ");

export const ALICE_TOKEN_ADDRESS_1 = new PublicKey("3ug8rjJdifEcTExVXFkaGuSjR3VZoDWi49ghA8gYpZiF")

export const ALICE_TOKEN_ADDRESS_2 = new PublicKey("8Rs6tAqLUDzVc3GweP71sefv68ejsW8dG9ZssWpqfhBP")