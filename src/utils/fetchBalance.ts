import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import TokenNode from "../interfaces/tokenNode";
import { ApiPromise, WsProvider } from "@polkadot/api";
import CuratedToken from "../interfaces/curatedToken";

export async function fetchKARBalance(address: string) {
  const wsProvider = new WsProvider("wss://karura-rpc-3.aca-api.network/ws");
  const api = await ApiPromise.create({ provider: wsProvider });

  const { data: balance } = await api.query.system.account(address);
  return Number(balance.free);
}
export async function fetchKARPrice() {
  const client = new ApolloClient({
    uri: "https://api.polkawallet.io/acala-subql",
    cache: new InMemoryCache(),
  });
  const TOKEN_QUERY = gql`
    query {
      token(id: "KAR") {
        price
      }
    }
  `;
  const tokenQuery = await Promise.resolve(
    client.query({ query: TOKEN_QUERY })
  );
  return await Promise.resolve(tokenQuery.data.token.price);
}
export async function getTokenBalances(
  address: string
): Promise<CuratedToken[] | undefined> {
  // We'll be using a different endpoint since the official one isn't working rn
  const client = new ApolloClient({
    uri: "https://api.polkawallet.io/acala-subql",
    cache: new InMemoryCache(),
  });
  const wsProvider = new WsProvider("wss://karura-rpc-3.aca-api.network/ws");
  const api = await ApiPromise.create({ provider: wsProvider });
  const TOKEN_QUERY = gql`
    query {
      tokens {
        nodes {
          name
          price
          decimal
        }
      }
    }
  `;
  const tokenQuery = await Promise.resolve(
    client.query({ query: TOKEN_QUERY })
  );

  const curatedList: Array<CuratedToken> = await tokenQuery.data.tokens.nodes
    .filter((info: TokenNode) => {
      return info.name.includes("/") === false;
    })
    .map(async (info: TokenNode): Promise<CuratedToken> => {
      const tokenData = await api.query.tokens.accounts(address, {
        Token: info.name,
      });
      const fData = await tokenData.toJSON();
      return await {
        name: info.name,
        balance: fData!.free,
        price: info.price,
        decimal: info.decimal,
      };
    });

  return await Promise.all(curatedList);
}