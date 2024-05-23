import { selector } from "recoil";
import { balanceState } from "./atom";

export const getBalance = selector({
    key: "getBalance", // unique ID (with respect to other atoms/selectors)
    get: ({ get }) => {
        const balance = get(balanceState);

        return balance;
    },
});
