import TokenNode from "./tokenNode";

export default interface CuratedToken extends TokenNode {
  name: string;
  price: number;
  decimal: number;
  balance: number;
}
