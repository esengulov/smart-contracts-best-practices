pragma solidity 0.5.8;


contract Pauseable {

	//users
	mapping (address => uint) balances;
	
	address public owner;
	address public beneficiary;

	bool private contractPaused;

	modifier isNotPaused() { 
		require (contractPaused == false); 
		_; 
	}

	modifier isPaused() { 
		require (contractPaused == true); 
		_; 
	}

	modifier isAdmin() { 
		require (msg.sender == owner); 
		_; 
	}

	modifier isAuthorized() { 
		require (msg.sender == beneficiary); 
		_; 
	}	

	constructor() public {
		contractPaused = false;
		owner = msg.sender;
		// set beneficiary or provide method to select one
	}



	// REGULAR STATE
	// public access
    
    function withdrawFunds(uint _value) isNotPaused public {
        // public user withdraw method
    }
    


    // pause / unpause
    // admin

    function pause() isAdmin isNotPaused public {
    	contractPaused = true;
    	assert (contractPaused == true);
    }

    function unPause() isAdmin isPaused public {
    	contractPaused = false;
    	assert (contractPaused == false);
    }   

    // authorized individuals
    function emergencyWithdrawal() isPaused isAuthorized public {
    	// send funds to beneficiary
    }
    
    

    
}