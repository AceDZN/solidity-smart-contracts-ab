// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@animoca/ethereum-contracts/contracts/security/TokenRecovery.sol";
import "@animoca/ethereum-contracts/contracts/access/ContractOwnership.sol";

/**
 * @title OpenCampusRevShare
 * @dev A contract that allows users to send revenue shares to creators, co-publishers, and a governance vault using ERC20 tokens.
 */
contract OpenCampusRevShare is ContractOwnership, TokenRecovery, ReentrancyGuard {
    IERC20 private _eduToken;
    address[] private _collectionsList;
    address private _governanceVault;
    uint256 private _transferAmount;
    uint256 private _creatorPercentage;
    uint256 private _coPublisherPercentage;
    uint256 private _vaultFeePercentage;
    uint256 private _vaultFee;
    uint256 private _netAmount;
    uint256 private _creatorAmount;
    uint256 private _coPublisherAmount;

    event sendRevShareToCreator(address indexed user, address indexed creator, uint256 indexed amount);
    event sendRevShareToPublisher(address indexed user, address indexed coPublisher, uint256 indexed coPublisherAmount);
    event sendRevShareToVault(address indexed user, address indexed _governanceVault, uint256 indexed vaultFeeAmount);
    event setCollectionsList(address indexed user, address []  indexed collections);
    event addCollectionToList(address indexed user, address indexed collection);
    event setRevshareAmount(address indexed user, uint256 indexed oldTransferAmount,uint256 indexed newTransferAmount);
    event CreatorPercentageUpdated(address indexed user, uint256 oldCreatorPercentage, uint256 newCreatorPercentage);
    event CoPublisherPercentageUpdated(address indexed user, uint256 oldCoPublisherPercentage, uint256 newCoPublisherPercentage);
    event VaultFeePercentageUpdated(address indexed user, uint256 oldVaultFeePercentage, uint256 newVaultFeePercentage);
    event VaultAddressUpdated(address indexed user, address oldVaultAddress,address newVaultAddress);
    

    /**
     * @dev Modifier that checks if the caller is the owner.
     */
    modifier isOwner() {
        require(msg.sender == owner(), "Caller is not owner");
        require(owner() != address(0), "Owner cannot be the zero address");
        _;
    }

    /**
     * @dev Constructor to initialize the contract with initial values.
     * @param eduTokenAddress The address of the ERC20 token.
     * @param collectionsList The initial list of supported ERC721 collections.
     * @param governanceVaultAddress The address of the governance vault.
     * @param transferAmount The amount of tokens to transfer for each revenue share.
     * @param creatorPercentage The percentage of the revenue share to be sent to the creator.
     * @param coPublisherPercentage The percentage of the revenue share to be sent to the co-publisher.
     * @param vaultFeePercentage The percentage of the revenue share to be sent to the governance vault.
     */
    constructor(
        address eduTokenAddress,
        address[] memory collectionsList,
        address governanceVaultAddress,
        uint256 transferAmount,
        uint256 creatorPercentage,
        uint256 coPublisherPercentage,
        uint256 vaultFeePercentage
    ) ContractOwnership(msg.sender) {
        
        require(eduTokenAddress != address(0), "ERC20 Address cannot be zero");
        _eduToken = IERC20(eduTokenAddress);
        
        for (uint256 i = 0; i < collectionsList.length; i++) {
            require(collectionsList[i] != address(0), "Address in collectionsList cannot be zero");
        }
        _collectionsList = collectionsList;

        require(governanceVaultAddress != address(0), "Governance vault Address cannot be zero");
        _governanceVault = governanceVaultAddress;
        require(creatorPercentage >= 0 && creatorPercentage <= 100, "Invalid creator percentage");
        _transferAmount = transferAmount;
        
        require(creatorPercentage >= 0 && creatorPercentage <= 100, "Invalid creator percentage");
        _creatorPercentage = creatorPercentage;
        
        require(coPublisherPercentage >= 0 && coPublisherPercentage <= 100, "Invalid publisher percentage");
        _coPublisherPercentage = coPublisherPercentage;
        
        require(vaultFeePercentage >= 0 && vaultFeePercentage <= 100, "Invalid vault fee percentage");
        _vaultFeePercentage = vaultFeePercentage;

        _vaultFee = (_transferAmount * _vaultFeePercentage) / 100;
        _netAmount = _transferAmount - _vaultFee;
        _creatorAmount = (_netAmount * _creatorPercentage) /100;
        _coPublisherAmount = (_netAmount * _coPublisherPercentage) /100;

    }

    /**
     * @dev Transfers the revenue share to the creator.
     * @param creator The address of the creator to send the revenue share.
    */
    function transferRevShare(address creator) external payable nonReentrant {
        

        require(
            _eduToken.allowance(msg.sender, address(this)) >= _transferAmount,
            "Caller must approve the contract to spend tokens"
        );

        require(
            _eduToken.balanceOf(msg.sender) >= _transferAmount,
            "Caller must hold enough tokens"
        );

        _eduToken.transferFrom(msg.sender, _governanceVault, _vaultFee);
        emit sendRevShareToVault(msg.sender, _governanceVault, _vaultFee);

        _eduToken.transferFrom(msg.sender, creator, _netAmount);

        emit sendRevShareToCreator(msg.sender, creator, _netAmount);
    }

    /**
     * @dev Transfers the revenue share to the creator and co-publisher.
     * @param creator The address of the creator to send the revenue share.
     * @param coPublisher The address of the co-publisher to send the revenue share.
     */
    function transferRevShare(address creator,address coPublisher) external payable nonReentrant {
        bool hasCollection = false;
        for (uint i = 0; i < _collectionsList.length; i++) {
            address collectionAddress = _collectionsList[i];
            IERC721 collection = IERC721(collectionAddress);
            if (collection.balanceOf(coPublisher) > 0) {
                hasCollection = true;
                break;
            }
        }
        require(hasCollection, "coPublisher must hold a token from a supported collections.");

        require(
            _eduToken.allowance(msg.sender, address(this)) >= _transferAmount,
            "Caller must approve the contract to spend tokens"
        );

        require(
            _eduToken.balanceOf(msg.sender) >= _transferAmount,
            "Caller must hold enough tokens"
        );

        _eduToken.transferFrom(msg.sender, _governanceVault, _vaultFee);
        emit sendRevShareToVault(msg.sender, _governanceVault, _vaultFee);

        _eduToken.transferFrom(msg.sender, creator, _creatorAmount);
        emit sendRevShareToCreator(msg.sender, creator, _creatorAmount);

        _eduToken.transferFrom(msg.sender, coPublisher, _coPublisherAmount);
        emit sendRevShareToPublisher(msg.sender, coPublisher,_coPublisherAmount);
    }

    /**
     * @dev Sets the supported ERC721 collections.
     * @param collectionsAddresses The list of supported collection addresses.
     */
    function setCollections(address[] memory collectionsAddresses) external isOwner {
        require(collectionsAddresses.length > 0, "Collections list cannot be empty");
        for (uint256 i = 0; i < collectionsAddresses.length; i++) {
            require(collectionsAddresses[i] != address(0), "Address in collectionsList cannot be zero");
        }
        _collectionsList = collectionsAddresses;
        emit setCollectionsList(msg.sender, _collectionsList);
    }

    /**
     * @dev Adds a collection to the list of supported collections.
     * @param collectionAddress The address of the collection to be added.
     */
    function addCollection(address collectionAddress) external isOwner {
        require(collectionAddress != address(0), "Address to addCollection cannot be zero");
        _collectionsList.push(collectionAddress);
        emit addCollectionToList(msg.sender, collectionAddress);
        
    }

    /**
     * @dev Sets the transfer amount for the revenue share.
     * @param newTransferAmount The new transfer amount.
     */
    function setTransferAmount(uint256 newTransferAmount) public isOwner {
        emit setRevshareAmount(msg.sender, _transferAmount, newTransferAmount);
        _transferAmount = newTransferAmount;
        updateAmounts();

    }


    /**
     * @dev Sets the creator percentage for the revenue share.
     * @param newCreatorPercentage The new creator percentage.
     */
    function setCreatorPercentage(uint256 newCreatorPercentage) external isOwner {
        require(newCreatorPercentage >= 0 && newCreatorPercentage <= 100, "Invalid creator percentage");
        emit CreatorPercentageUpdated(msg.sender, _creatorPercentage, newCreatorPercentage);
        _creatorPercentage = newCreatorPercentage;
        updateAmounts();
    }

    /**
     * @dev Sets the co-publisher percentage for the revenue share.
     * @param newCoPublisherPercentage The new co-publisher percentage.
     */
    function setCoPublisherPercentage(uint256 newCoPublisherPercentage) external isOwner {
        require(newCoPublisherPercentage >= 0 && newCoPublisherPercentage <= 100, "Invalid co-publisher percentage");
        emit CoPublisherPercentageUpdated(msg.sender, _coPublisherPercentage, newCoPublisherPercentage);
        _coPublisherPercentage = newCoPublisherPercentage;
        updateAmounts();
    }

    /**
     * @dev Sets the governance vault fee percentage for the revenue share.
     * @param newVaultFeePercentage The new governance vault fee percentage.
     */
    function setVaultFeePercentage(uint256 newVaultFeePercentage) external isOwner {
        require(newVaultFeePercentage >= 0 && newVaultFeePercentage <= 100, "Invalid vault fee percentage");
        emit VaultFeePercentageUpdated(msg.sender, _vaultFeePercentage, newVaultFeePercentage);
        _vaultFeePercentage = newVaultFeePercentage;
        updateAmounts();
    }

    /**
     * @dev Updates the amounts of tokens for creator, co-publisher, and governance vault fees based on the updated percentages.
     */
    function updateAmounts() internal {
        _vaultFee = (_transferAmount * _vaultFeePercentage) / 100;
        _netAmount = _transferAmount - _vaultFee;
        _creatorAmount = (_netAmount * _creatorPercentage) / 100;
        _coPublisherAmount = (_netAmount * _coPublisherPercentage) / 100;
    }


    /**
     * @dev Sets the governance vault address.
     * @param newVaultAddress The new governance address to use.
     */
    function setVaultAddress(address newVaultAddress) external isOwner {
        require(newVaultAddress != address(0), "Governance vault Address cannot be zero");
        emit VaultAddressUpdated(msg.sender, _governanceVault, newVaultAddress);
        _governanceVault = newVaultAddress;
    }


    /**
     * @dev Returns the address of the EDU token.
     * @return eduTokenAddress The address of the EDU token.
     */
    function getEduTokenAddress() public view returns (address eduTokenAddress) {
        return address(_eduToken);
    }

    /**
     * @dev Returns the list of supported ERC721 collections.
     * @return collectionsList An array of addresses representing the supported collections.
     */
    function getCollectionsList() public view returns (address[] memory collectionsList) {
        return _collectionsList;
    }

    /**
     * @dev Returns the address of the governance vault.
     * @return governanceVaultAddress The address of the governance vault.
     */
    function getGovernanceVaultAddress() public view returns (address governanceVaultAddress) {
        return _governanceVault;
    }

    /**
     * @dev Returns the transfer amount for the revenue share.
     * @return transferAmount The transfer amount for the revenue share.
     */
    function getTransferAmount() public view returns (uint256 transferAmount) {
        return _transferAmount;
    }

    /**
     * @dev Returns the creator percentage for the revenue share.
     * @return creatorPercentage The creator percentage for the revenue share.
     */
    function getCreatorPercentage() public view returns (uint256 creatorPercentage) {
        return _creatorPercentage;
    }

    /**
     * @dev Returns the co-publisher percentage for the revenue share.
     * @return coPublisherPercentage The co-publisher percentage for the revenue share.
     */
    function getCoPublisherPercentage() public view returns (uint256 coPublisherPercentage) {
        return _coPublisherPercentage;
    }

    /**
     * @dev Returns the vault fee percentage for the revenue share.
     * @return vaultFeePercentage The vault fee percentage for the revenue share.
     */
    function getVaultFeePercentage() public view returns (uint256 vaultFeePercentage) {
        return _vaultFeePercentage;
    }

    /**
     * @dev Returns the vault fee for the revenue share.
     * @return vaultFee The vault fee for the revenue share.
     */
    function getVaultFee() public view returns (uint256 vaultFee) {
        return _vaultFee;
    }

    /**
     * @dev Returns the net amount for the revenue share.
     * @return netAmount The net amount for the revenue share.
     */
    function getNetAmount() public view returns (uint256 netAmount) {
        return _netAmount;
    }

    /**
     * @dev Returns the creator amount for the revenue share.
     * @return creatorAmount The creator amount for the revenue share.
     */
    function getCreatorAmount() public view returns (uint256 creatorAmount) {
        return _creatorAmount;
    }

    /**
     * @dev Returns the co-publisher amount for the revenue share.
     * @return coPublisherAmount The co-publisher amount for the revenue share.
     */
    function getCoPublisherAmount() public view returns (uint256 coPublisherAmount) {
        return _coPublisherAmount;
    }
}