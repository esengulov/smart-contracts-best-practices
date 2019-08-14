pragma solidity 0.5.8;

import "./storage.sol";

contract Functionality1 is Storage {

	modifier onlyOwner() {
			require(msg.sender == owner);
			_;
	}

	constructor() public {
		//owner = msg.sender;
	}


  function getUintValue(string memory _uintVariableName) public view returns(uint256) {
  		return uintStorage[_uintVariableName];
	}

  function setUintValue(string memory _uintVariableName, uint256 _value) public onlyOwner {
  		uintStorage[_uintVariableName] = _value;
	}



}
