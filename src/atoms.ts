import { atom } from "recoil";

export const userAddressState = atom<string>({
  key: "userAddress",
  default: localStorage.getItem("address") ?? "",
});
