# OpenCampusRevShare Contract Specification

## Overview

OpenCampusRevShare is a smart contract that allows users to send revenue shares to creators, co-publishers, and a governance vault using ERC20 tokens.

## Features

1. Transfer revenue shares to creators, co-publishers, and governance vault using an ERC20 token.
2. Set and update the list of supported ERC721 collections.
3. Calculate revenue share amounts and fees.

## Contract Structure

```
OpenCampusRevShare
├── ContractOwnership
└── TokenRecovery
```

## Constructor

The constructor initializes the contract with the following parameters:

- `eduTokenAddress`: The address of the ERC20 token.
- `collectionsList`: The initial list of supported ERC721 collections.
- `governanceVaultAddress`: The address of the governance vault.
- `transferAmount`: The amount of tokens to transfer for each revenue share.
- `creatorPercentage`: The percentage of the revenue share to be sent to the creator.
- `coPublisherPercentage`: The percentage of the revenue share to be sent to the co-publisher.
- `vaultFeePercentage`: The percentage of the revenue share to be sent to the governance vault.

## Functions

### transferRevShare

Transfers the revenue share to the creator.

- `creator`: The address of the creator to send the revenue share.

### transferRevShare

Transfers the revenue share to the creator and co-publisher.

- `creator`: The address of the creator to send the revenue share.
- `coPublisher`: The address of the co-publisher to send the revenue share.

### setCollections

Sets the supported ERC721 collections.

- `collectionsAddresses`: The list of supported collection addresses.

### addCollection

Adds a collection to the list of supported collections.

- `collectionAddress`: The address of the collection to be added.

### setTransferAmount

Sets the transfer amount for the revenue share.

- `newTransferAmount`: The new transfer amount.

## Events

- `sendRevShareToCreator`: Emitted when a revenue share is sent to the creator.
- `sendRevShareToPublisher`: Emitted when a revenue share is sent to the co-publisher.
- `sendRevShareToVault`: Emitted when a revenue share is sent to the governance vault.
- `setCollectionsList`: Emitted when the list of supported collections is updated.
- `addCollectionToList`: Emitted when a new collection is added to the list of supported collections.
- `setRevshareAmount`: Emitted when the transfer amount for the revenue share is updated.

## Modifiers

### isOwner

A modifier that checks if the caller is the owner of the contract.

## Implementation

To interact with the `OpenCampusRevShare` contract, follow these general steps using a frontend or a script:

1. Deploy an instance of the `IERC20` token contract (e.g., an ERC20 token) and an instance of the `IERC721` token contract (e.g., an ERC721 collection) if you do not have existing contracts to work with.

2. Deploy the `OpenCampusRevShare` contract with the required constructor parameters, passing the addresses of the ERC20 token, the initial ERC721 collections list, the governance vault address, and the initial percentages and transfer amount for revenue shares.

3. Approve the `OpenCampusRevShare` contract to spend the required amount of ERC20 tokens on behalf of the users who want to send revenue shares.

4. Call the `transferRevShare` function to send revenue shares to creators. Listen for the `sendRevShareToCreator` and `sendRevShareToVault` events to confirm the transfers.

5. Call the `transferRevShare` function with an additional coPublisher parameter to send revenue shares to creators and co-publishers. Listen for the `sendRevShareToCreator`, `sendRevShareToPublisher`, and `sendRevShareToVault` events to confirm the transfers.

6. If needed, update the list of supported ERC721 collections using the `setCollections` function or add a new collection using the `addCollection` function. Listen for the `setCollectionsList` or `addCollectionToList` events to confirm the updates.

7. If needed, update the transfer amount for the revenue share using the `setTransferAmount` function. Listen for the `setRevshareAmount` event to confirm the update.

By following these steps, you can effectively deploy, interact with, and manage the `OpenCampusRevShare` contract. The emitted events will provide real-time updates on the contract state and allow for efficient monitoring of revenue share transfers and contract updates.
