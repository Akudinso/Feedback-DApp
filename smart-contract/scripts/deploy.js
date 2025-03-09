const hre = require("hardhat");

async function main() {
  const FeedbackDApp = await hre.ethers.getContractFactory("FeedbackDApp");

  console.log("Deploying contract...");
  const feedbackDApp = await FeedbackDApp.deploy(); // Deploy contract
  await feedbackDApp.waitForDeployment(); // Wait for deployment to complete

  console.log(`Contract deployed to: ${await feedbackDApp.getAddress()}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
