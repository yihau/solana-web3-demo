import { defineUserConfig } from "vuepress";
import type { DefaultThemeOptions } from "vuepress";
import * as path from "path";

export default defineUserConfig<DefaultThemeOptions>({
  base: "/solana-web3-demo/",
  lang: "en-US",
  title: "Solana Web3 Example",
  themeConfig: {
    navbar: [{ text: "GitHub", link: "https://github.com/yihau/solana-web3-demo" }],
    locales: {
      "/": {
        selectLanguageName: "English",
        sidebar: [
          {
            text: "Getting Started",
            children: ["/README.md"],
          },
          {
            text: "Tour",
            children: [
              { text: "Create Keypair (Account)", link: "/tour/create-keypair" },
              { text: "Request Airdrop", link: "/tour/request-airdrop" },
              { text: "Get Balance (SOL)", link: "/tour/get-sol-balance" },
              { text: "Transfer (SOL)", link: "/tour/transfer" },
              { text: "Create Mint (Token)", link: "/tour/create-mint" },
              { text: "Get Mint (Token)", link: "/tour/get-mint" },
              { text: "Create Account (Token)", link: "/tour/create-token-account" },
              { text: "Get Account (Token)", link: "/tour/get-token-account" },
              { text: "Mint To (Token)", link: "/tour/mint-to" },
              { text: "Get Balance (Token)", link: "/tour/get-token-balance" },
              { text: "Transfer (Token)", link: "/tour/token-transfer" },
            ],
          },
          {
            text: "Advanced",
            children: [
              {
                text: "Token",
                children: [
                  {
                    text: "Wrapped SOL",
                    children: [
                      { text: "Create Token Account", link: "/advanced/token/wrapped-sol/create-token-account" },
                      { text: "Add Balanace", link: "/advanced/token/wrapped-sol/add-balance" },
                    ],
                  },
                  { text: "Close Account", link: "/advanced/token/close-account" },
                  { text: "Set Authority", link: "/advanced/token/set-authority" },
                  { text: "Get All Token Account By Owner", link: "/advanced/token/get-all-token-account-by-owner" },
                ],
              },
              {
                text: "Metaplex (NFT)",
                children: [
                  { text: "Get Token Metadata", link: "/advanced/metaplex/get-tokenmeta" },
                  { text: "Get NFT", link: "/advanced/metaplex/get-nft" },
                  { text: "Mint NFT", link: "/advanced/metaplex/mint-nft" },
                ],
              },
              {
                text: "Durable Nonce",
                link: "/advanced/durable-nonce/README.md",
                children: [
                  { text: "Create Nonce Account", link: "/advanced/durable-nonce/create-nonce-account" },
                  { text: "Get Nonce Account", link: "/advanced/durable-nonce/query-nonce" },
                  { text: "Use Nonce", link: "/advanced/durable-nonce/use-nonce" },
                ],
              },
            ],
          },
        ],
      },
      "/zh/": {
        selectLanguageName: "中文",
        sidebar: [
          {
            text: "開始",
            children: ["/zh/README.md"],
          },
          {
            text: "入門",
            children: [
              { text: "創建錢包", link: "/zh/tour/create-keypair" },
              { text: "拿測試幣", link: "/zh/tour/request-airdrop" },
              { text: "抓取SOL餘額", link: "/zh/tour/get-sol-balance" },
              { text: "SOL轉帳", link: "/zh/tour/transfer" },
              { text: "創建代幣", link: "/zh/tour/create-mint" },
              { text: "抓取代幣資訊", link: "/zh/tour/get-mint" },
              { text: "創建代幣帳戶", link: "/zh/tour/create-token-account" },
              { text: "抓取代幣帳戶資訊", link: "/zh/tour/get-token-account" },
              { text: "增發代幣", link: "/zh/tour/mint-to" },
              { text: "抓取代幣餘額", link: "/zh/tour/get-token-balance" },
              { text: "代幣轉帳", link: "/zh/tour/token-transfer" },
            ],
          },
          {
            text: "進階",
            children: [
              {
                text: "代幣",
                children: [
                  {
                    text: "Wrapped SOL",
                    children: [
                      { text: "創建帳戶", link: "/zh/advanced/token/wrapped-sol/create-token-account" },
                      { text: "增加持有量", link: "/zh/advanced/token/wrapped-sol/add-balance" },
                    ],
                  },
                  { text: "關閉帳戶", link: "/zh/advanced/token/close-account" },
                  { text: "設定權限", link: "/zh/advanced/token/set-authority" },
                  { text: "根據Owner抓取代幣帳戶", link: "/zh/advanced/token/get-all-token-account-by-owner" },
                ],
              },
              {
                text: "Metaplex (NFT)",
                children: [
                  { text: "Token Metadata", link: "/zh/advanced/metaplex/get-tokenmeta" },
                  { text: "Get NFT", link: "/advanced/metaplex/get-nft" },
                  { text: "Mint NFT", link: "/advanced/metaplex/mint-nft" },
                ],
              },
              {
                text: "Durable Nonce",
                link: "/zh/advanced/durable-nonce/README.md",
                children: [
                  { text: "創建Nonce帳戶", link: "/zh/advanced/durable-nonce/create-nonce-account" },
                  { text: "抓取Nonce", link: "/zh/advanced/durable-nonce/query-nonce" },
                  { text: "使用Nonce", link: "/zh/advanced/durable-nonce/use-nonce" },
                ],
              },
            ],
          },
        ],
      },
    },
  },

  locales: {
    // The key is the path for the locale to be nested under.
    // As a special case, the default locale can use '/' as its path.
    "/": {
      lang: "en-US",
      title: "Solana Web3 Example",
    },
    "/zh/": {
      lang: "zh-TW",
      title: "Solana Web3 Example",
    },
  },

  markdown: {
    importCode: {
      handleImportPath: (str) => str.replace(/^@/, path.resolve(__dirname, "../../")),
    },
  },

  plugins: [
    [
      "@vuepress/plugin-google-analytics",
      {
        id: "G-QBVBH32M0L",
      },
    ],
  ],
});
