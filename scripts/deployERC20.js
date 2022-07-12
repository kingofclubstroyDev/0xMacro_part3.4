const hre = require("hardhat");

async function main() {


  const TOKEN = await hre.ethers.getContractFactory("ERC20Token");
  const token = await TOKEN.deploy("ERC20 Token", "ERC20");

  await token.deployed();

  console.log("token deployed to:", token.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
