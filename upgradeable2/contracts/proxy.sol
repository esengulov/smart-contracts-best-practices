pragma solidity 0.5.8;

import "./storage.sol";

contract Proxy is Storage {


	address private functionalityContract;

	modifier onlyOwner() {
			require(msg.sender == owner);
			_;
	}

	constructor(address _functionalityContract) public {
		require (_functionalityContract != address(0));
		functionalityContract = _functionalityContract;
		owner = msg.sender;
	}

	function upgrade (address _newFunctionalityContract) public onlyOwner returns(bool) {
		functionalityContract = _newFunctionalityContract;
		return true;
	}

	function getFuncAddress() public view returns(address) {
		return functionalityContract;
	}

	function getOwner() public view returns(address) {
		return owner;
	}

	//FALLBACK FUNCTION to pass all calls to functionality contract
	function () payable external {

		address implementation = functionalityContract;
		require(functionalityContract != address(0));
		bytes memory data = msg.data;

		//DELEGATECALL EVERY FUNCTION CALL
		assembly {
			let result := delegatecall(gas, implementation, add(data, 0x20), mload(data), 0, 0)
			let size := returndatasize
			let ptr := mload(0x40)
			returndatacopy(ptr, 0, size)
			switch result
			case 0 {revert(ptr, size)}
			default {return(ptr, size)}
		}

	}



}
