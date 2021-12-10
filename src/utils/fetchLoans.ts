import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import CuratedLoanPosition from "../interfaces/curatedLoan";
import LoanPositionNode from "../interfaces/loanPositionNode";
import TokenNode from "../interfaces/tokenNode";
import { LoanPositionFilter } from "../types/loanPositionFilter";
export async function fetchLoans(address: string) {
  const client = new ApolloClient({
    uri: "https://api.polkawallet.io/acala-subql",
    cache: new InMemoryCache(),
  });
  const LOANS_QUERY = gql`
    query ($filter: LoanPositionFilter) {
      tokens {
        nodes {
          name
          price
          decimal
        }
      }
      loanPositions(filter: $filter) {
        nodes {
          id
          debitAmount
          collateralAmount
          collateralId
          ownerId
        }
      }
    }
  `;
  // Fetch prices & Loans avalaible
  const loansQuery = await Promise.resolve(
    client.query({
      query: LOANS_QUERY,
      variables: {
        filter: {
          ownerId: {
            equalTo: address,
          },
        },
      },
    })
  );

  const loanPositions: CuratedLoanPosition[] =
    loansQuery.data.loanPositions.nodes
      .filter((pos: LoanPositionNode) => pos.collateralAmount !== "0")
      .map(async (pos: LoanPositionNode): Promise<CuratedLoanPosition> => {
        const token = loansQuery.data.tokens.nodes.find(
          (token: TokenNode) => token.name == pos.collateralId
        );
        return await {
          collateralPrice: Number(token.price) / Math.pow(10, token.decimal),
          collateralAmount:
            Number(pos.collateralAmount) / Math.pow(10, token.decimal),
          collateralId: pos.collateralId,
          debitAmount: Number(pos.debitAmount) / Math.pow(10, token.decimal),
        };
      });
  return await Promise.all(loanPositions);
}
