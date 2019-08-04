pragma solidity 0.5.1;

import "./storage.sol";


contract Functionality1 is Storage {
    
    function setMyNumber(uint _value) public {
        Storage.setNumber(_value + 1);
    }
    
    
    function getMyNumber() public view returns(uint) {
        return Storage.getNumber();
    }
    
}