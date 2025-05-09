import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: `http://${window.location.hostname === 'localhost' ? 'localhost' : '10.0.2.2'}:4000/graphql`,
  cache: new InMemoryCache(),
  credentials: "include", // This tells Appolo client to send cookies along with every request to the server
});

createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
      <App />
  </ApolloProvider>
);
