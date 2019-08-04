pragma solidity 0.5.1;


contract Storage {

    uint znumber;
    
    
    function setNumber(uint _value) internal {
        znumber = _value;
    }
    
    
    function getNumber() internal view returns(uint) {
        return znumber;
    }
    
    
    
}