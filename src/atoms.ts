import { atom } from "recoil";

export const userAddressState = atom<string>({
  key: "userAddress",
  default: localStorage.getItem("address") ?? "",
});

export const userVaultsBalanceState = atom<number>({
  key: "userVaultsBalance",
  default: 0,
});
export const userKarFreeState = atom<number>({
  key: "userKarFree",
  default: 0,
});
export const userKarLockedState = atom<number>({
  key: "userKarLocked",
  default: 0,
});
export const userTokensBalanceState = atom<number>({
  key: "userTokensBalance",
  default: 0,
});
