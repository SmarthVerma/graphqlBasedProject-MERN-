import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const getApiHost = () => {
  if (window.location.hostname === "localhost") {
    // Web dev environment
    return "localhost";
  } else if (window.location.hostname === "10.0.2.2") {
    // Android emulator
    return "10.0.2.2";
  } else {
    // Production
    return window.location.hostname; // This will be '59.178.196.155' or your domain
  }
};

const client = new ApolloClient({
  uri: `http://${getApiHost()}/graphql`,
  cache: new InMemoryCache(),
  credentials: "include",
});

console.log("this is the apiHostName", getApiHost());

createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
