
const FunctionalityContract = artifacts.require("Functionality1");
const ProxyContract = artifacts.require("Proxy");

module.exports = async function(deployer) {
	await deployer.deploy(FunctionalityContract);
  	await deployer.deploy(ProxyContract, FunctionalityContract.address);
};
