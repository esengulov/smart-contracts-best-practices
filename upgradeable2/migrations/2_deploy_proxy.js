
const FunctionalityContract = artifacts.require("Functionality1");
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
  	proxyRouter.setUintValue("age", 36);
  	console.log("> wrote to proxy age var is 36");
  	console.log("> attempting to read from Proxy");
  	let ageValue = await proxyRouter.getUintValue("age");
  	console.log("value is: "+ageValue);



};
