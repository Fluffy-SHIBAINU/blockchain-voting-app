// src/config.js
export const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;
export const GRAPHQL_API = import.meta.env.VITE_GRAPHQL_API;

console.log("📌 Loaded Config:");
console.log("Contract Address:", CONTRACT_ADDRESS);
console.log("GraphQL API:", GRAPHQL_API);
