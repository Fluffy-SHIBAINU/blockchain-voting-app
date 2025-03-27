import { Voted as VotedEvent } from "../generated/Voting/Voting";
import { Proposal, Vote } from "../generated/schema";

export function handleVoted(event: VotedEvent): void {
  let vote = new Vote(event.transaction.hash.toHex());
  vote.voter = event.params.voter.toHex();
  vote.proposal = event.params.proposalIndex.toString();
  vote.save();
}
