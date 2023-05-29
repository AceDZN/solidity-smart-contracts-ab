// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import {IForwarderRegistry} from "@animoca/ethereum-contracts/contracts/metatx/interfaces/IForwarderRegistry.sol";
import {Context} from "@openzeppelin/contracts/utils/Context.sol";
import {OpenCampusGasStation} from "./OpenCampusGasStation.sol";

contract OpenCampusGasStationMock is OpenCampusGasStation {
    constructor(
        address payable[] memory gasPumps
    ) OpenCampusGasStation(gasPumps) {}

    function __msgData() external view returns (bytes calldata) {
        return _msgData();
    }
}
