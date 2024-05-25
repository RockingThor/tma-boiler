"use client";
import { Me } from "@/components/me";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { BACKEND_URL } from "@/lib/config";
import { useRecoilState, useRecoilValue } from "recoil";
import { noTaskState, taskState, tokenState } from "@/recoil/atom";
import { Task } from "@/lib/type";
import { useState } from "react";
import TakeVote from "@/components/takeVote";
import { Loader } from "@/components/loader";
import { retrieveLaunchParams } from "@tma.js/sdk";
import { generateRandomString } from "@/lib/utils";
import { GiftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
    const [token, setToken] = useRecoilState(tokenState);
    const [taskData, setTaskData] = useRecoilState(taskState);
    const [loading, setLoading] = useState(false);
    const [showStart, setShowStart] = useState(true);
    const [noTask, setNoTask] = useRecoilState(noTaskState);
    const { initData: data } = retrieveLaunchParams();
    // const [testData, setTestData] = useState("Hello ji");
    const router = useRouter();

    async function getNExtTask() {
        setShowStart(false);
        setLoading(true);
        const tokenResponse = await axios.post(`${BACKEND_URL}/signin`, {
            telegram: data?.user?.username,
            wallet: generateRandomString(16),
        });
        // if (tokenResponse) setTestData("Hi ji test was successfull ji");
        if (tokenResponse.data.token) {
            localStorage.setItem("token", tokenResponse.data.token);
            setToken(tokenResponse.data.token);
        }
        const response = await axios.get(`${BACKEND_URL}/nextTask`, {
            headers: {
                authorization: localStorage.getItem("token"),
            },
        });
        if (response.data?.tasks) {
            let data: Task = {
                id: response.data.tasks.id,
                title: response.data.tasks.title,
                options: response.data.tasks.options,
            };
            setTaskData(data);
            setLoading(false);
        } else {
            setLoading(false);
            setNoTask(true);
        }
        setLoading(false);
    }
    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            <div className="z-10 w-full max-w-5xl relative flex items-center justify-between font-mono text-sm">
                <div className="flex w-full justify-between items-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                    <div className="absolute left-1/2 transform -translate-x-1/2">
                        <code className="font-mono font-bold">OpenPolls🚀</code>
                    </div>
                    <div
                        className="ml-auto m-2 cursor-pointer"
                        onClick={() => {
                            router.push("/payout");
                        }}
                    >
                        <GiftIcon />
                    </div>
                </div>
            </div>

            <div className="mt-15">
                {showStart && <Button onClick={getNExtTask}>Start Task</Button>}
                {loading && (
                    <>
                        <Loader />
                    </>
                )}
                {!loading && !showStart && <TakeVote />}
            </div>

            <div className="h-14 border-t w-full grid place-items-center">
                <div className="">
                    <Me />
                </div>
            </div>
        </main>
    );
}
