# blockchain-voting-app
<img width="866" alt="image" src="https://github.com/user-attachments/assets/31bdfa76-ca39-4936-b1e5-3286f5e21817" />
# Blockchain Voting DApp

A decentralized voting application built on Ethereum with a React frontend and The Graph for indexing smart contract events.

## 🚀 Features

- Smart contract-based voting system
- MetaMask integration for user authentication
- Live candidate list with real-time vote updates
- The Graph integration for efficient data querying
- Fully responsive and modern UI

## 🛠 Tech Stack

- **Smart Contract**: Solidity, Hardhat
- **Frontend**: React, Vite, Ethers.js, Apollo Client
- **Blockchain**: Ethereum, MetaMask
- **Data Indexing**: The Graph
- **Deployment**: Vercel (Frontend), Infura/Alchemy (Ethereum RPC)

## 📦 Installation

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/yourusername/blockchain-voting-app.git
cd blockchain-voting-app
```

### 2️⃣ Install Dependencies

```sh
cd smart-contracts
npm install
```

### 3️⃣ Start Hardhat Local Node

```sh
npx hardhat node
```

### 4️⃣ Deploy Smart Contract

```sh
npx hardhat run scripts/deploy.js --network localhost
```

*This will deploy the contract and return the contract address.*

### 5️⃣ Set Up The Graph

```sh
cd subgraph
npm install
```

*Initialize and configure the subgraph:*

```sh
graph codegen
graph build
graph create voting-subgraph --node http://localhost:8020/
graph deploy voting-subgraph --node http://localhost:8020/ --ipfs http://localhost:5001/
```

### 6️⃣ Configure Frontend

```sh
cd frontend
npm install
```

*Update the **`.env`** file with the contract address and GraphQL API URL:*

```sh
VITE_CONTRACT_ADDRESS=0xYourDeployedContractAddress
VITE_GRAPHQL_API=http://localhost:8000/subgraphs/name/voting-subgraph
```

### 7️⃣ Run Frontend

```sh
npm run dev
```

*Visit **`http://localhost:5173`** to interact with the DApp.*

## 🎯 Smart Contract Functions

### ✅ `getCandidatesCount()`

Returns the total number of candidates.

### ✅ `getCandidate(uint256 index)`

Returns candidate details by index.

### ✅ `vote(uint256 candidateId)`

Allows a user to vote for a specific candidate.

## 🏗 Future Enhancements

- ✅ Mobile responsiveness improvements
- ✅ Smart contract security audit
- ✅ Multi-network support (Ethereum, Polygon, etc.)
- ✅ UI animations and real-time vote updates
- ✅ Deploy to a public testnet (Goerli, Sepolia)

## 📜 License

This project is licensed under the MIT License.

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## 📞 Contact

For questions or collaboration, reach out to `your.email@example.com` or create an issue on GitHub.

