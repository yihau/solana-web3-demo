#

## 開始

首先如果想要開發solana，非常建議在本地端安裝solana的cli工具。他可以啟動local的節點以及包裝了許多方便的函式，在開發上可以變得更加快速。

可以參考[這裡](https://docs.solana.com/cli)的前幾篇，可以不用寫任何code就先體驗一下solana

如果有裝好cli工具的話可以在本地用


```
solana-test-validator
```

來啟動一個測試節點加速開發流程 (目前windows還沒有支援使用)

[官方的explorer](https://explorer.solana.com/)可以指定custom的網址

也就是說可以指定 http://localhost:8899 來對應到本地的節點方便看交易訊息。


## 世界觀

### 概述

Solana跟Ethereum在設計概念上不太一樣。

在Ethereum上面大家都是把資料都塞到contract上，account跟contract互動結束之後，contract會把相對應的結果存在自己身上。但在solana的contract(官方稱呼為program，以下也都會用program來稱呼)只有邏輯的部分，而儲存資料的地方是account。

### Account

Solana的Account有幾個比較重要的觀念

#### Owner

account的owner通常都是某一個program，一般我們持有的最基本的account都是屬於system program。而當只有account屬於某一個program的時候，這個program才有辦法寫資料進去。如果違反這個規定交易是會直接失敗的。但讀取就沒有這個限制，只要你不修改到裡面的資料，可以任意讀去任何想要的account。

#### Rent

前面有提到account是拿來存資料的，而你的帳戶也會因為儲存資料的不同而收取一個類似`資料管理費`的錢。收的時機是

1. 你的帳戶有被包含到交易內
2. 每一個epoch結束

幣種都是原生代幣SOL，如果這個錢被扣到沒有的話，資料就會全部消失！

官方有給另外一個免收租的方式，就是你在這個account裡面一開始就給予足夠兩年份的租金份額。這樣你的帳戶會被標記成免租金帳戶，從此之後都不會跟你收錢。

#### Program Derived Address

大家都知道在做tx的時候的時候，可以透過所屬的private key來簽名，達到授權的作用。而在Solana裡面不僅僅是普通的private key可以簽名，Program 也可以簽名。而這種只能被Program簽名授權的account官方稱之為 Program Derived Address。

這種Account的好處在於，僅有Program可以簽名。代表著相關授權都只能透過Program的條件來觸發。

### Transaction

Solana的Tx結構比較不一樣，可以包含很多instruction。

同一筆Tx可以做到A轉帳給B，B轉帳給C，C轉帳給A的這種麻煩的操作。

---
關於詳細資訊，建議可以花點時間把這兩篇看完

1. https://docs.solana.com/developing/programming-model/accounts
2. https://docs.solana.com/developing/programming-model/calling-between-programs

