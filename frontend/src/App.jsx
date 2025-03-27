import React, { useEffect, useState } from "react";
import getContract from "./utils/contract";

const App = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    const fetchAccount = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
          setSelectedAddress(accounts[0]);
        }
      }
    };
    fetchAccount();
    loadCandidates();
  }, []);

  const loadCandidates = async () => {
    setLoading(true);
    setError(null);

    const contract = await getContract();
    if (!contract) {
      setError("⚠️ Unable to connect to the smart contract. Please check MetaMask.");
      setLoading(false);
      return;
    }

    try {
      const count = await contract.getCandidatesCount();
      console.log("📌 Candidate Count:", count.toString());

      let candidatesArray = [];
      for (let i = 0; i < count; i++) {
        const [name, voteCount] = await contract.getCandidate(i);
        candidatesArray.push({ id: i, name, voteCount: Number(voteCount) });
      }

      setCandidates(candidatesArray);
    } catch (error) {
      console.error("❌ Failed to load candidates:", error);
      setError("⚠️ Failed to load candidates. Please try again.");
    }
    setLoading(false);
  };

  const handleVote = async (candidateId) => {
    setLoading(true);
    setError(null);

    const contract = await getContract();
    if (!contract) {
      setError("⚠️ Unable to connect to the smart contract.");
      setLoading(false);
      return;
    }

    try {
      const tx = await contract.vote(candidateId);
      console.log("📌 Voting transaction:", tx.hash);
      await tx.wait();
      console.log("✅ Vote successful for candidate:", candidateId);
      await loadCandidates();
    } catch (error) {
      console.error("❌ Voting failed:", error);
      setError(error.reason ? `⚠️ ${error.reason}` : "⚠️ Voting failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Blockchain Voting DApp</h1>
      <p style={styles.status}>
        {selectedAddress ? `Connected as ${selectedAddress}` : "🔴 Not connected to MetaMask"}
      </p>

      {loading && <p style={styles.loading}>⏳ Loading...</p>}
      {error && <p style={styles.error}>{error}</p>}

      <h2 style={styles.subtitle}>Candidates</h2>
      {candidates.length > 0 ? (
        <ul style={styles.list}>
          {candidates.map((candidate) => (
            <li key={candidate.id} style={styles.listItem}>
              <span style={styles.candidateName}>{candidate.name}</span>
              <span style={styles.voteCount}>Votes: {candidate.voteCount}</span>
              <button
                onClick={() => handleVote(candidate.id)}
                disabled={loading}
                style={styles.voteButton}
              >
                {loading ? "Processing..." : "Vote"}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p style={styles.noCandidates}>⚠️ No candidates available.</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "50px auto",
    padding: "20px",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    fontFamily: "'Arial', sans-serif",
    textAlign: "center",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#333",
  },
  status: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#007bff",
    marginBottom: "20px",
  },
  loading: {
    fontSize: "14px",
    color: "#ff9800",
    fontWeight: "bold",
  },
  error: {
    fontSize: "14px",
    color: "#d9534f",
    fontWeight: "bold",
    backgroundColor: "#f8d7da",
    padding: "8px",
    borderRadius: "5px",
  },
  subtitle: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "10px",
  },
  list: {
    listStyleType: "none",
    padding: 0,
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    marginBottom: "8px",
    backgroundColor: "#fff",
    borderRadius: "5px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  },
  candidateName: {
    fontWeight: "bold",
    color: "#555",
  },
  voteCount: {
    fontSize: "14px",
    color: "#007bff",
  },
  voteButton: {
    padding: "6px 12px",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  voteButtonHover: {
    backgroundColor: "#0056b3",
  },
  noCandidates: {
    fontSize: "14px",
    color: "#777",
  },
};

export default App;
