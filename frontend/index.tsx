import { useQuery, gql } from "@apollo/client";
import { ethers } from "ethers";
import Web3Modal from "web3modal";

const VOTE_QUERY = gql`
  {
    proposals {
      id
      name
      voteCount
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(VOTE_QUERY);

  const vote = async (proposalId) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      "YOUR_CONTRACT_ADDRESS",
      ["function vote(uint proposalIndex) public"],
      signer
    );
    await contract.vote(proposalId);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div>
      <h1>Blockchain Voting</h1>
      {data.proposals.map((proposal) => (
        <div key={proposal.id}>
          <p>{proposal.name} - Votes: {proposal.voteCount}</p>
          <button onClick={() => vote(proposal.id)}>Vote</button>
        </div>
      ))}
    </div>
  );
}
