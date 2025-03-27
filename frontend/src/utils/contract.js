import {ethers} from "ethers";
import contractABI from "../contracts/Voting.json";
import { CONTRACT_ADDRESS } from "../config";

// Hardhat Local network details
const HARDHAT_NETWORK = {
  chainId: "0x7a69", // 31337 in hex
  chainName: "Hardhat Local",
  rpcUrls: ["http://127.0.0.1:8545"],
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  blockExplorerUrls: [], // None for local
};

const getContract = async () => {
  if (!window.ethereum) {
    alert("MetaMask가 설치되지 않았습니다! Please install MetaMask.");
    return null;
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const network = await provider.getNetwork();
    console.log("Current Network:", network.chainId, network.name);

    // Check if on Hardhat Local (chainId 31337)
    if (Number(network.chainId) !== 31337) {
      console.log("Wrong network detected! Attempting to switch to Hardhat Local...");

      try {
        // Try to switch to Hardhat Local
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: HARDHAT_NETWORK.chainId }],
        });
        console.log("Switched to Hardhat Local!");
      } catch (switchError) {
        // If network isn’t added (error code 4902), add it
        if (switchError.code === 4902) {
          console.log("Hardhat Local not found in MetaMask. Adding network...");
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [HARDHAT_NETWORK],
          });
          console.log("Hardhat Local added and switched!");
        } else {
          throw switchError; // Re-throw other errors (e.g., user rejected)
        }
      }

      // Refresh network info after switching
      const newNetwork = await provider.getNetwork();
      if (Number(newNetwork.chainId) !== 31337) {
        throw new Error("Failed to switch to Hardhat Local. Please switch manually.");
      }
    }

    const signer = await provider.getSigner();
    console.log("Signer:", await signer.getAddress());

    const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI.abi, signer);
    console.log("Contract address:", contract.address);

    const count = await contract.getCandidatesCount();
    console.log("Count:", count.toString());

    return contract;
  } catch (error) {
    console.error("❌ Error:", error.message || error);
    return null;
  }
};

export default getContract;