// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SeedBatchTracker {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    struct SeedBatch {
        uint256 batchId;
        string name;
        uint256 quantity;
        string origin;
        string mfgDate;
        string expDate;
        uint256 price;
        address currentOwner;
        uint256 ownershipTimestamp;
    }

    struct OwnershipRecord {
        address owner;
        uint256 timestamp;
    }

    mapping(uint256 => SeedBatch) public seedBatches;
    mapping(uint256 => OwnershipRecord[]) public ownershipHistory;
    uint256[] public allBatchIds;

    modifier onlyOwner(uint256 _batchId) {
        require(seedBatches[_batchId].currentOwner == msg.sender, "Not the batch owner");
        _;
    }

    event SeedBatchDefined(
        uint256 batchId, string name, uint256 quantity, string origin, string mfgDate, string expDate, address owner
    );
    event SeedBatchTransferred(uint256 batchId, address from, address to);

    function addProduct(
        uint256 _batchId,
        string memory _name,
        uint256 _quantity,
        string memory _origin,
        uint256 _price,
        string memory _mfgDate,
        string memory _expDate
    ) public {
        require(seedBatches[_batchId].batchId == 0, "Batch ID already exists");

        seedBatches[_batchId] = SeedBatch({
            batchId: _batchId,
            name: _name,
            quantity: _quantity,
            origin: _origin,
            mfgDate: _mfgDate,
            expDate: _expDate,
            price: _price,
            currentOwner: msg.sender,
            ownershipTimestamp: block.timestamp
        });

        ownershipHistory[_batchId].push(OwnershipRecord({owner: msg.sender, timestamp: block.timestamp}));

        allBatchIds.push(_batchId);

        emit SeedBatchDefined(_batchId, _name, _quantity, _origin, _mfgDate, _expDate, msg.sender);
    }

    function viewSeedBatch(uint256 _batchId) public view returns (SeedBatch memory) {
        require(seedBatches[_batchId].batchId != 0, "Batch not found");
        return seedBatches[_batchId];
    }

    function transferSeedBatch(uint256 _batchId, address _newOwner) public onlyOwner(_batchId) {
        require(_newOwner != address(0), "Invalid new owner");

        seedBatches[_batchId].currentOwner = _newOwner;
        seedBatches[_batchId].ownershipTimestamp = block.timestamp;

        ownershipHistory[_batchId].push(OwnershipRecord({owner: _newOwner, timestamp: block.timestamp}));

        emit SeedBatchTransferred(_batchId, msg.sender, _newOwner);
    }

    function getOwnershipHistory(uint256 _batchId) public view returns (OwnershipRecord[] memory) {
        return ownershipHistory[_batchId];
    }

    function getAllBatchIds() public view returns (uint256[] memory) {
        return allBatchIds;
    }
}
