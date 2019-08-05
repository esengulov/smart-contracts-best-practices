
const FunctionalityContract = artifacts.require("Functionality1");
const FunctionalityContract_2 = artifacts.require("Functionality2");
const ProxyContract = artifacts.require("Proxy");

module.exports = async function(deployer) {
	

	// deploy contract
	let functionality = await FunctionalityContract.new();
  	console.log("> functionality deployed: "); 
  	console.log(functionality.address);


  	let proxy = await ProxyContract.new(functionality.address);
  	console.log("> proxy deployed");
  	console.log(proxy.address);

  	// need to fool truffle, else it will complain that no such function
  	let proxyRouter = await FunctionalityContract.at(proxy.address);

  	console.log("> func address in proxy set to:");
	let funcAddress = await proxy.getFuncAddress();
  	console.log(funcAddress);

  	proxyRouter.setUintValue("age", 36);
  	console.log("> attempting to write to proxy age var 36");
  	console.log("> attempting to read age var from Proxy");
  	let ageValue = await proxyRouter.getUintValue("age");
  	console.log("value is: "+ageValue);

  	console.log("----------------------------");
  	console.log("deploying functionality2");
	let functionality2 = await FunctionalityContract_2.new();
  	console.log("> functionality2 deployed: "); 
  	console.log(functionality2.address);
  	console.log("> checking owner in proxy: ");
  	let theOwner = await proxy.getOwner();
  	console.log(theOwner);
  	console.log("> the address of the user attmepting to upgrade proxy:");
  	let accounts = await web3.eth.getAccounts();
  	console.log(accounts[0]);
  	console.log("Attempting to upgrade functionality address in proxy");
  	await proxy.upgrade(functionality2.address, {from:accounts[0]});
	console.log("> checking the new func address in proxy: ");
	let newFuncAddress = await proxy.getFuncAddress();
  	console.log("it is now set to: "+newFuncAddress);
  	console.log("should be: "+functionality2.address);
  	console.log("previous was: " + funcAddress);
};
