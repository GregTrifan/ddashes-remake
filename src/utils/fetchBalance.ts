import { ApiPromise, WsProvider } from "@polkadot/api";

export async function fetchKARBalance(address: string) {
  const wsProvider = new WsProvider("wss://karura-rpc-3.aca-api.network/ws");
  const api = await ApiPromise.create({ provider: wsProvider });

  const { data: balance } = await api.query.system.account(address);
  return normalize(Number(balance.free));
}

function normalize(value: number) {
  let val = value / 10e11;

  return val.toFixed(2);
}
