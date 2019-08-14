
const Functionality1 = artifacts.require("Functionality1");
const Functionality2 = artifacts.require("Functionality2");
const Functionality3 = artifacts.require("Functionality3");
const Proxy = artifacts.require("Proxy");




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
		console.log(">> attempting to upgrade func address in proxy ...");
		await proxy.upgrade(func2.address);
		console.log(">> checking the new func address in proxy... ");
		let newFuncAddress = await proxy.getFuncAddress();
		console.log("it is now set to: "+ newFuncAddress);
		console.log("should be set to: "+ func2.address);
		console.log("previous was: " + func1.address);
		console.log(">> trying to read age from proxy after func update");
		let ageValue2 = await proxyRouter.getUintValue("age");
		console.log(">> the value is: " + ageValue2);
		console.log(">> attempting to write age (37) via proxy using func2...");
		await proxyRouter.setUintValue("age", 37);
		let ageValue3 = await proxyRouter.getUintValue("age");
		console.log(">> reading age from proxy using func2 (should return 38)...");
		console.log(">> returned value is: " + ageValue3);

		console.log("+++++++++++++++++++++++++++++");


		// DEPLOYING FUNC3 THAT HAS AN ADDITIONAL METHOD
		// it also has new owner parameter

		let account2 = accounts[1];
		console.log(">> deploying new func3 using new owner parameter: ");	
		await deployer.deploy(Functionality3, {from:account2});
		// get address of deployed contract
		let func3 = await Functionality3.deployed();
		// the newly added init function requires a new proxy router
		console.log(">> functionality3 deployed: " + func3.address);
		console.log(">> deployed functionality3 using new owner: " + account2);

		console.log("+++++++++++++++++++++++++++++");

		// checking proxy parameters, before update
		let funcAddress2 = await proxy.getFuncAddress();
		let ownerAddress2 = await proxy.getOwner();
		console.log(">> before func3 update, func address in proxy: " + funcAddress2);
		console.log(">> running update to func3... ");	
		await proxy.upgrade(func3.address);
		let newFuncAddress2 = await proxy.getFuncAddress();		
		console.log(">> checking that func in proxy changed... " + newFuncAddress2);
		console.log(">> checking that owner in proxy left unchanged: " + ownerAddress2);

		// new router address for Truffle
		let proxyRouter2 = await Functionality3.at(proxy.address);

		console.log(">> before running init, try updating age to 39 + 1... ");
		await proxyRouter2.setUintValue("age", 39, {from: account1});
		console.log(">> before running init, updating age using account1 should work...");
		let ageValue4 = await proxyRouter2.getUintValue("age");
		console.log(">> the age value is... " + ageValue4);

		await proxyRouter2.init(account2, {from:account2});
		console.log(">> running func3.init via proxy... ");

		console.log(">> it should set owner var in proxy to: " + account2);
		console.log(">> checking that owner in proxy changed... ");
		let newOwnerAddress2 = await proxy.getOwner();	
		console.log(">> owner in proxy changed to: " + newOwnerAddress2);
		console.log(">> checking that updating age (to 40 + 1) reverts when using account1... ");
		//await proxyRouter2.setUintValue("age", 40, {from: account1});
		console.log(">> checking that updating age (to 40 + 1) passes when using account2... ");
		await proxyRouter2.setUintValue("age", 40, {from: account2});
		let ageValue5 = await proxyRouter2.getUintValue("age");
		console.log(">> the age value is... " + ageValue5);
		// essentially we were able to change the owner in proxy using init method in func2
		// note that if we try running that method again it will fail
		// that is to ensure that it is able to run only once.
		// await proxyRouter2.init(account1, {from:account1});

		// note: 
		// that func can not have any variables that isn't part of storage 
		// as calling a method that tries to update that vairable via proxy
		// will be updating the variable within the scope of proxy
		// as a result we may overwrite something and break the contract



};
