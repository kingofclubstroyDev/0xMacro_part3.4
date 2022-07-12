const hre = require("hardhat");

async function main() {


  const TOKEN = await hre.ethers.getContractFactory("Token");
  const token = await TOKEN.deploy();

  await token.deployed();

  console.log("token deployed to:", token.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
