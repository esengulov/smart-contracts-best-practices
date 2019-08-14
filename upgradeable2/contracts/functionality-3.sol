pragma solidity 0.5.8;

import "./storage.sol";
import "./functionality-2.sol";

// this contract will have to update the owner functionality in proxy
// also introduces the init() method that can handle storage updates in proxy
// init method should be called once

contract Functionality3 is Functionality2 {


	constructor() public {
		init(msg.sender);
	}


	function init(address payable _owner) public {
		require(_initialized == false);
		owner = _owner;
		_initialized = true;
	}

}
