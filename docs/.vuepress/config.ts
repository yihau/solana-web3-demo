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
        selectLanguageName: "??????",
        sidebar: [
          {
            text: "??????",
            children: ["/zh/README.md"],
          },
          {
            text: "??????",
            children: [
              { text: "????????????", link: "/zh/tour/create-keypair" },
              { text: "????????????", link: "/zh/tour/request-airdrop" },
              { text: "??????SOL??????", link: "/zh/tour/get-sol-balance" },
              { text: "SOL??????", link: "/zh/tour/transfer" },
              { text: "????????????", link: "/zh/tour/create-mint" },
              { text: "??????????????????", link: "/zh/tour/get-mint" },
              { text: "??????????????????", link: "/zh/tour/create-token-account" },
              { text: "????????????????????????", link: "/zh/tour/get-token-account" },
              { text: "????????????", link: "/zh/tour/mint-to" },
              { text: "??????????????????", link: "/zh/tour/get-token-balance" },
              { text: "????????????", link: "/zh/tour/token-transfer" },
            ],
          },
          {
            text: "??????",
            children: [
              {
                text: "??????",
                children: [
                  {
                    text: "Wrapped SOL",
                    children: [
                      { text: "????????????", link: "/zh/advanced/token/wrapped-sol/create-token-account" },
                      { text: "???????????????", link: "/zh/advanced/token/wrapped-sol/add-balance" },
                    ],
                  },
                  { text: "????????????", link: "/zh/advanced/token/close-account" },
                  { text: "????????????", link: "/zh/advanced/token/set-authority" },
                  { text: "??????Owner??????????????????", link: "/zh/advanced/token/get-all-token-account-by-owner" },
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
                  { text: "??????Nonce??????", link: "/zh/advanced/durable-nonce/create-nonce-account" },
                  { text: "??????Nonce", link: "/zh/advanced/durable-nonce/query-nonce" },
                  { text: "??????Nonce", link: "/zh/advanced/durable-nonce/use-nonce" },
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
