import { ethers } from "ethers";

// Your contract address (Replace with actual deployed address)
const contractAddress = "0xf0B03990F3Ed0baa07053a069bC59cebD3C49Ea2";

// Your contract ABI (Copy from artifacts)
const contractABI = [
  {
    "inputs": [{ "internalType": "string", "name": "_message", "type": "string" }],
    "name": "submitFeedback",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllFeedback",
    "outputs": [
      { "internalType": "struct FeedbackDApp.Feedback[]", "name": "", "type": "tuple[]" }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

export const getContract = async () => {
    if (!window.ethereum) {
        alert("Please install MetaMask!");
        return null;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // Request access to accounts
    await window.ethereum.request({ method: "eth_requestAccounts" });

    const signer = provider.getSigner();

    // Ensure the connected network is Sepolia
    const { chainId } = await provider.getNetwork();
    if (chainId !== 11155111) { // Sepolia chain ID
        alert("Please switch to the Sepolia network in MetaMask!");
        return null;
    }


    
    return new ethers.Contract(contractAddress, contractABI, signer);
};
