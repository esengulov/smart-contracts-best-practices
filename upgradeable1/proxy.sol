pragma solidity 0.5.1;

import "./storage.sol";


contract Proxy is Storage {
    
    address destination;
    address owner;
    
    constructor(address _destination) public {
        
        destination = _destination;
        owner = msg.sender;
        znumber = 1;
        
    }
    
    function upgrade (address _newDestination) public {
        require(owner == msg.sender);
        destination = _newDestination;
    }
    
    function showDestination () public view returns(address) {
        return destination;
    }    
    
    
    
    function setMyNumber(uint _value) public returns(bool) {
        (bool res, bytes memory data) = destination.delegatecall(abi.encodePacked(bytes4(keccak256("setMyNumber(uint256)")), _value));
        return res;
    }
    
    
    function getMyNumber() public returns(bool, bytes memory) {
        (bool res, bytes memory data) = destination.delegatecall(abi.encodePacked(bytes4(keccak256("getMyNumber()"))));
        return (res, data);
    }
    
    
    
    
}