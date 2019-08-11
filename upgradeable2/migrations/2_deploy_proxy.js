
const Functionality1 = artifacts.require("Functionality1");
const Functionality2 = artifacts.require("Functionality2");
const Proxy = artifacts.require("Proxy");




// const Migrations = artifacts.require("Migrations");
//
// module.exports = function(deployer) {
//   deployer.deploy(Migrations);
// };

let accounts = web3.eth.getAccounts();

module.exports = async function(deployer) {

		let accounts = await web3.eth.getAccounts();
		let account1 = accounts[0];

		// deploy Functionality1 contract
		await deployer.deploy(Functionality1, {from:account1});
		// get address of deployed contract
		let func1 = await Functionality1.deployed();
		// deploy Functionality2 contract
		await deployer.deploy(Functionality2, {from:account1});
		// get address of deployed contract
		let func2 = await Functionality2.deployed();

		//deploy proxy and pass func1 as parameter
		let proxy = await deployer.deploy(Proxy, func1.address, {from:account1});

		// CHECKING Values
		console.log(">> functionality1 deployed: ");
		console.log(func1.address);
		console.log(">> functionality2 deployed: ");
		console.log(func2.address);
		console.log(">> proxy deployed");
  	console.log(proxy.address);
		console.log(">> owner address");
		console.log(account1);

		console.log("+++++++++++++++++++++++++++++");

		// checking if proxy parameters set correctly
		let funcAddress = await proxy.getFuncAddress();
		let ownerAddress = await proxy.getOwner();

		console.log(">>>> func parameter in proxy ... " + funcAddress);
		console.log(">>>> owner parameter in proxy ... " + ownerAddress);

		console.log("+++++++++++++++++++++++++++++");

		// normally truffle will complain, no such function
		// because proxy won't have methods from functionality
		// so, we need to fool truffle... as below :)
  	let proxyRouter = await Functionality1.at(proxy.address);
  	console.log(">> attempting to write age(36) via proxy ...");
  	await proxyRouter.setUintValue("age", 36);
  	let ageValue = await proxyRouter.getUintValue("age");
  	console.log(">> attempting to read age from proxy..." + ageValue);

		console.log("+++++++++++++++++++++++++++++");
  	console.log(">> to upgrade func address in proxy ...");
		await proxy.upgrade(func2.address);
	  console.log(">> checking the new func address in proxy... ");
		let newFuncAddress = await proxy.getFuncAddress();
		console.log("it is now set to: "+ newFuncAddress);
		console.log("should be set to: "+ func2.address);
		console.log("previous was: " + func1.address);
		
};
