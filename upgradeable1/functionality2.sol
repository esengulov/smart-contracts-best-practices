pragma solidity 0.5.1;

import "./storage.sol";


contract Functionality2 is Storage {
    
    function setMyNumber(uint _value) public {
        Storage.setNumber(_value);
    }
    
    
    function getMyNumber() public view returns(uint) {
        return Storage.getNumber();
    }
    
}