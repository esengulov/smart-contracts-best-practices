pragma solidity 0.5.8;


contract Storage {

    mapping (string => uint) uintStorage;
    mapping (string => address) addressStorage;
    mapping (string => string) stringStorage;
    mapping (string => bool) boolStorage;

    address payable public owner;
  	bool public _initialized;

}
