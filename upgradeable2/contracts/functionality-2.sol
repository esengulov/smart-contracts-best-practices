pragma solidity 0.5.8;

import "./storage.sol";

contract Functionality2 is Storage {


	//  INHERITED FROM STORAGE
	// 	------------------------------------------
	//  mapping (string => uint) uintStorage;
	//  mapping (string => address) addressStorage;
	//  mapping (string => string) stringStorage;
	//  mapping (string => bool) boolStorage;
	//  address public owner;
	//  bool public _initialized;



	constructor() public {
		owner = msg.sender;
	}


  	function getUintValue(string memory _uintVariableName) public view returns(uint256) {
  		return uintStorage[_uintVariableName];
	}

  	function setUintValue(string memory _uintVariableName, uint256 _value) public {
  		uintStorage[_uintVariableName] = _value + 1;
	}



}	