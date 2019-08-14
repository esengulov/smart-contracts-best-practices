pragma solidity 0.5.8;

import "./storage.sol";

// this contract will have to update the owner functionality in proxy
// also introduces the init() method that can handle storage updates in proxy
// init method should be called once

contract Functionality3 is Storage {

	modifier onlyOwner() {
			require(msg.sender == owner);
			_;
	}

	constructor() public {
		init(msg.sender);
	}


	function init(address payable _owner) public {
		require(_initialized == false);
		owner = _owner;
		_initialized = true;
	}


	function getUintValue(string memory _uintVariableName) public view returns(uint256) {
			return uintStorage[_uintVariableName];
	}

	function setUintValue(string memory _uintVariableName, uint256 _value) public onlyOwner {
			uintStorage[_uintVariableName] = _value;
	}




}
