"use client";

import { tokenState } from "@/recoil/atom";
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
    const balance = useRecoilValue(getBalance);
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

    useState(() => {
        if (loadedInitialState) return;
        getWorkerToken().then(() => setLoadedInitialState(true));

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
