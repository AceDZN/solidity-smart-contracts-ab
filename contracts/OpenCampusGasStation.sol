// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;
// ["0x617F2E2fD72FD9D5503197092aC168c91465E7f2","0x17F6AD8Ef982297579C203069C1DbfFE4348c372"]
// ["0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB","0xdD870fA1b7C4700F2BD7f44238821C26f7392148", "0x583031D1113aD414F02576BD6afaBfb302140225", "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2","0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db"]
//["0x9972eaec34Aa23f8fF2606A42f490224e0d81807","0x1833915321D30afD05Fcc7EE334bFdf6D15D9b3f"]

import {TokenRecovery} from "@animoca/ethereum-contracts/contracts/security/TokenRecovery.sol";
import {ContractOwnership} from "@animoca/ethereum-contracts/contracts/access/ContractOwnership.sol";


contract OpenCampusGasStation  is TokenRecovery {
    
    //address private owner;
    address payable[] public pumps;
    mapping(address => address payable) isPump;
    uint total_value;
    
    // event for EVM logging
    event OwnerSet(address indexed oldOwner, address indexed newOwner);
    event GasPumpsSet(address payable[] indexed oldGasPumps, address payable[] indexed newGasPumps);
    event AddGasPump(address payable[] indexed oldGasPumps, address payable indexed newGasPump);
    
    
    // modifier to check if the caller is owner
    
    modifier isOwner() {
        require(msg.sender == owner(), "Caller is not owner");
        _;
    }

    modifier vaultHasFunds() {
        require(total_value > 0, "Not enough funds in vault");
        _;
    }

    // modifier to check if there are gas pumps
    modifier hasGasPumps() {
        require(pumps.length > 0, "No gas pumps");
        _;
    }
    
    constructor(address payable[] memory gasPumps) ContractOwnership(msg.sender) payable {
        setGasPumps(gasPumps);
        total_value = msg.value;  // msg.value is the ethers of the transaction
    }
    
    // Set gas pumps
    function setGasPumps(address payable[] memory _gasPumps) public isOwner {
        emit GasPumpsSet(pumps, _gasPumps);
        for (uint i=0; i < _gasPumps.length; i++) {
            isPump[pumps[i]] = _gasPumps[i];
        }
        pumps = _gasPumps; 
    }
    // Add single gas pump
    function addGasPump(address payable newGasPump) public isOwner {
        require(newGasPump != isPump[newGasPump] , "Gas pump is already part of the station");
        emit AddGasPump(pumps, newGasPump);
        pumps.push(newGasPump);
        isPump[newGasPump] = newGasPump;
    }
    
    // Get list of gas pumps
    function getGasPumps() external view returns (address payable[] memory) {
        return pumps;
    }


    // Fund total_value then charge all gas pumps
    function chargeAllPumps() payable public hasGasPumps {
        total_value += msg.value;
        uint256 pricePerPump = total_value / pumps.length;
        chargeGasPumps(pumps, pricePerPump);
    }
    
    // Fund total_value then charge selected gas pumps
    function chargePumps(address payable[] memory addrs) payable public hasGasPumps {
        total_value += msg.value;
        uint256 pricePerPump = total_value / addrs.length;
        chargeGasPumps(addrs, pricePerPump);
    }
    // Charge gas pumps in list
    function chargeGasPumps(address payable[] memory gasPumps, uint256 pricePerPump) private vaultHasFunds {
        require(pricePerPump > 10000000000000000, "Minimum 0.1 eth per wallet");
        for (uint i=0; i < gasPumps.length; i++) {
            withdraw(gasPumps[i], pricePerPump);
        }
    }

    function withdraw(address payable receiverAddr, uint receiverAmnt) private {
        require(isPump[receiverAddr] == receiverAddr, "Undefined pump");
        total_value -= receiverAmnt;
        receiverAddr.transfer(receiverAmnt);
    }
    
}

