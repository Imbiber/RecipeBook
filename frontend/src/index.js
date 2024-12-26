import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ApolloProvider } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { SnackbarProvider } from "notistack";
import { UserProvider } from "./providers/UserProvider";
import { HelmetProvider } from "react-helmet-async";

const serverURI = 'https://recipebook-backend-2.onrender.com/graphql' || 'http://localhost:4000/graphql';

const client = new ApolloClient({
  uri: serverURI,
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <UserProvider>
        <SnackbarProvider maxSnack={3}>
          <ApolloProvider client={client}>
            <App />
          </ApolloProvider>
        </SnackbarProvider>
      </UserProvider>
    </HelmetProvider>
  </React.StrictMode>
);

console.log("Server URI:", serverURI);
console.log("Environment Variables:", 'https://recipebook-backend-2.onrender.com/graphql');


