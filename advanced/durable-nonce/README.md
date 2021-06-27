# Durable Nonce

在solana發交易的時候，會在tx內包一塊最近的blockhash塞進去，之後一起簽名。而這個blockhash距離鏈上最新的區塊太遠的話，tx就會被拒絕。 (大概拿到之後兩分鐘就會過期) 這個機制使我們沒有辦法讓tx在本地放一陣子之後再送出。官方有提供一個解法叫做durable nonce。

## 機制

這個durable nonce會需要你先創一個nonce account。nonce account在創建完後同時裡面也會存在一個nonce。我們只要讓tx符合下面條件就可以啟動nonce的機制

1. 把 nonce 放在 blockhash (就不用放最近一塊的blockhash了)
2. tx的第一個instruction是advanced nonce的操作

滿足上面兩個條件就可以啟動durable nonce的機制，下面會分成幾個步驟帶大家一步一步操作。

* [創建nonce account](../durable-nonce/create-nonce-account/main.ts)
* [查詢nonce account的nonce](../durable-nonce/query-nonce/main.ts)
* [使用nonce機制](../durable-nonce/use-nonce/main.ts)