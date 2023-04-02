// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import {IForwarderRegistry} from "@animoca/ethereum-contracts/contracts/metatx/interfaces/IForwarderRegistry.sol";
import {ERC20Mintable} from "@animoca/ethereum-contracts/contracts/token/ERC20/ERC20Mintable.sol";
import {Context} from "@openzeppelin/contracts/utils/Context.sol";
import {EDuCoin} from "./EDuCoin.sol";

contract EDuCoinMock is EDuCoin, ERC20Mintable {
    constructor(
        string memory tokenName,
        string memory tokenSymbol,
        uint8 tokenDecimals,
        address[] memory recipients,
        uint256[] memory amounts,
        IForwarderRegistry forwarderRegistry
    ) EDuCoin(tokenName, tokenSymbol, tokenDecimals, recipients, amounts, forwarderRegistry) {}

    /// @inheritdoc EDuCoin
    function _msgSender() internal view virtual override(Context, EDuCoin) returns (address) {
        return EDuCoin._msgSender();
    }

    /// @inheritdoc EDuCoin
    function _msgData() internal view virtual override(Context, EDuCoin) returns (bytes calldata) {
        return EDuCoin._msgData();
    }

    function __msgData() external view returns (bytes calldata) {
        return _msgData();
    }
}
