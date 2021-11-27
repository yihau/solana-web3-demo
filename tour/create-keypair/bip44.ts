import { Keypair } from "@solana/web3.js";
import { derivePath } from "ed25519-hd-key";
import * as bip39 from "bip39";

(async () => {
  const mnemonic = "neither lonely flavor argue grass remind eye tag avocado spot unusual intact";
  const seed = bip39.mnemonicToSeedSync(mnemonic, ""); // (mnemonic, password)
  for (let i = 0; i < 10; i++) {
    const path = `m/44'/501'/${i}'/0'`;
    const keypair = Keypair.fromSeed(derivePath(path, seed.toString("hex")).key);
    console.log(`${path} => ${keypair.publicKey.toBase58()}`);
  }
  /*
	m/44'/501'/0'/0' => 5vftMkHL72JaJG6ExQfGAsT2uGVHpRR7oTNUPMs68Y2N
	m/44'/501'/1'/0' => GcXbfQ5yY3uxCyBNDPBbR5FjumHf89E7YHXuULfGDBBv
	m/44'/501'/2'/0' => 7QPgyQwNLqnoSwHEuK8wKy2Y3Ani6EHoZRihTuWkwxbc
	m/44'/501'/3'/0' => 5aE8UprEEWtpVskhxo3f8ETco2kVKiZT9SS3D5Lcg8s2
	m/44'/501'/4'/0' => 5n6afo6LZmzH1J4R38ZCaNSwaztLjd48nWwToLQkCHxp
	m/44'/501'/5'/0' => 2Gr1hWnbaqGXMghicSTHncqV7GVLLddNFJDC7YJoso8M
	m/44'/501'/6'/0' => BNMDY3tCyYbayMzBjZm8RW59unpDWcQRfVmWXCJhLb7D
	m/44'/501'/7'/0' => 9CySTpi4iC85gMW6G4BMoYbNBsdyJrfseHoGmViLha63
	m/44'/501'/8'/0' => ApteF7PmUWS8Lzm6tJPkWgrxSFW5LwYGWCUJ2ByAec91
	m/44'/501'/9'/0' => 6frdqXQAgJMyKwmZxkLYbdGjnYTvUceh6LNhkQt2siQp
  */
})();
