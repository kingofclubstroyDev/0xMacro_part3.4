require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");

const fs = require("fs");
const privateKey = fs.readFileSync(".env").toString();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 2000,
      },
    }

  },
  paths: {
    artifacts: "./src/artifacts",
  }, 

  networks : {
    hardhat: {
      chainId: 1337,
    },
    ropsten: {
      url: 'https://ropsten.infura.io/v3/6b2231f7f9ab46b7a9e63b08489d305b',
       accounts: [privateKey],
       blockGasLimit: 30_000_000,
       //gasPrice: 100000000000

    }
  },
  etherscan: {
    //apiKey: "23TTJA3YVBMN572QJ3ANNJAGH78NC564YB",
    apiKey: "IFISI2UTZZPHIIWW6U86R7ZWKWU6NFZZE9",
  },

};
