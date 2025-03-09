import React, { useState, useEffect } from "react";
import { getContract } from "./contract";

function App() {
  const [feedback, setFeedback] = useState([]);
  const [message, setMessage] = useState("");
  const [walletConnected, setWalletConnected] = useState(false);

  // Connect Wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      setWalletConnected(true);
    } else {
      alert("MetaMask not found!");
    }
  };

  // Fetch feedback from smart contract
  const fetchFeedback = async () => {
    const contract = await getContract();
    if (!contract) return;

    const feedbackList = await contract.getAllFeedback();
    setFeedback(feedbackList);
  };

  // Submit feedback to blockchain
  const submitFeedback = async () => {
    if (!message.trim()) {
      alert("Feedback cannot be empty!");
      return;
    }

    const contract = await getContract();
    if (!contract) return;

    const tx = await contract.submitFeedback(message);
    await tx.wait(); // Wait for transaction to complete
    setMessage("");
    fetchFeedback(); // Refresh feedback list
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Feedback DApp</h2>

      {!walletConnected ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <p>Wallet Connected ✅</p>
      )}

      <div>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your feedback..."
          rows="4"
          cols="50"
        />
        <br />
        <button onClick={submitFeedback}>Submit Feedback</button>
      </div>

      <h3>Feedback from users:</h3>
      {feedback.length === 0 ? (
        <p>No feedback yet.</p>
      ) : (
        <ul>
          {feedback.map((fb, index) => (
            <li key={index}>
              <strong>{fb.user}</strong>: {fb.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
