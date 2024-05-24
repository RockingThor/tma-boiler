"use client";

import { balanceState, tokenState } from "@/recoil/atom";
import { retrieveLaunchParams } from "@tma.js/sdk";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import { BACKEND_URL } from "@/lib/config";
import { Wallet } from "lucide-react";
import { generateRandomString } from "@/lib/utils";
import { getBalance } from "@/recoil/selector";

export function Me() {
    const { initData: data } = retrieveLaunchParams();
    const user = data?.user;
    const [token, setToken] = useRecoilState(tokenState);
    const [balance, setBalance] = useRecoilState(balanceState);
    const [loadedInitialState, setLoadedInitialState] = useState(false);

    async function getWorkerToken() {
        const response = await axios.post(`${BACKEND_URL}/signin`, {
            telegram: data?.user?.username,
            Wallet: generateRandomString(16),
        });
        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
            setToken(response.data.token);
        }
    }

    async function getBalance() {
        if (localStorage.getItem("token")) {
            const response = await axios.get(`${BACKEND_URL}/balance`, {
                headers: {
                    authorization: localStorage.getItem("token"),
                },
            });
            if (response.data.balance) setBalance(response.data.balance);
        }
    }

    useState(() => {
        if (loadedInitialState) return;
        getWorkerToken().then(() => {
            getBalance().then(() => {
                setLoadedInitialState(true);
            });
        });

        //@ts-ignore
    }, [data?.user?.username]);

    if (!user) {
        return null;
    }

    return (
        <div className="text-sm flex items-center justify-between">
            <div className="p-2">
                <code>Welcome back </code>
                <code className="font-mono font-bold">@{user.username}</code>
            </div>
            <div className="p-2">
                <p className="font-mono">
                    {`Balance: ${balance / 1000000000} SOL`}{" "}
                </p>
            </div>
        </div>
    );
}
