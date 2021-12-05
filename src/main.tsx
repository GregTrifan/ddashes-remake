import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { RecoilRoot } from "recoil";

const client = new ApolloClient({
  uri: "https://api.subquery.network/sq/AcalaNetwork/karura",
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RecoilRoot>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </RecoilRoot>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
