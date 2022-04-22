<h1 align="center">Solana Web3 Demo</h1>
<div align="center">
	<a href="https://github.com/yihau/solana-web3-demo/blob/main/README.en.md">English</a>
</div>

## Guide

### Tour

* [創建新帳戶](tour/create-keypair/main.ts)
* [私鑰還原帳戶](tour/retrieve-keypair/main.ts)
* [建立基本連線](tour/create-connection/main.ts)
* [領取測試幣](tour/request-airdrop/main.ts)
* [SOL餘額查詢](tour/get-sol-balance/main.ts)
* [SOL轉帳](tour/transfer/main.ts)
* [創建代幣](tour/create-mint/main.ts)
* [抓取代幣資訊](tour/get-mint/main.ts)
* [創建代幣帳戶](tour/create-token-account/main.ts)
* [增發代幣](tour/mint-to/main.ts)
* [查詢代幣餘額](tour/get-token-balance/main.ts)
* [代幣轉帳](tour/token-transfer/main.ts)

### Advanced

* [代幣](advanced/token/README.md)
  * [關閉帳戶](advanced/token/close-account/main.ts)
  * [查詢使用者的代幣帳戶](advanced/token/get-all-token-account-by-owner/main.ts)
  * [Wrapped SOL](advanced/token/wrapped-sol)
* [NFT](advanced/metaplex)
* [Durable Nonce](advanced/durable-nonce/README.md)
* [Send Tx](advanced/send-tx/main.ts)
* [與program互動](advanced/interact-with-program)

### Rpc


## Start

安裝套件

```bash
npm install
```

執行範例

```bash
npx ts-node -s <FILE_HERE>
```

