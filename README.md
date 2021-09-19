# solana-web3-demo

一些solana web3的操作範例

## Guide

### Tour

* [創建新帳戶](tour/create-keypair/main.ts)
* [私鑰還原帳戶](tour/retrieve-keypair/main.ts)
* [建立基本連線](tour/create-connection/main.ts)
* [領取測試幣](tour/request-airdrop/main.ts)
* [SOL餘額查詢](tour/get-sol-balance/main.ts)
* [SOL轉帳](tour/transfer/main.ts)
* [創建代幣](tour/create-mint/main.ts)
* [創建代幣帳戶](tour/create-token-account/main.ts)
* [增發代幣](tour/mint-to/main.ts)
* [查詢代幣餘額](tour/get-token-balance/main.ts)
* [代幣轉帳](tour/token-transfer/main.ts)

### Rpc

* [查詢所有token account](rpc/get-all-account-by-owner/main.ts)

### Advanced

* [Durable Nonce](advanced/durable-nonce/README.md)
* [Send Tx](advanced/send-tx/main.ts)

## Start

安裝套件

```bash
npm install
```

執行範例

```bash
npx ts-node -s <FILE_HERE>
```

