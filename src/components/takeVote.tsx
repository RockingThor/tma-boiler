"use client";
import { balanceState, noTaskState, taskState } from "@/recoil/atom";
import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import Image from "next/image";
import axios from "axios";
import { BACKEND_URL } from "@/lib/config";
import { Task } from "@/lib/type";
import NoTask from "./noTask";

const TakeVote = () => {
    const taskData = useRecoilValue(taskState);
    const [task, setTask] = useRecoilState(taskState);
    const [loading, setLoading] = useState(false);
    const [noTask, setNoTask] = useRecoilState(noTaskState);
    const [balance, setBalance] = useRecoilState(balanceState);

    async function handleImageClick(optionId: number) {
        setLoading(true);
        const response = await axios.post(
            `${BACKEND_URL}/submission`,
            {
                taskId: taskData?.id.toString(),
                selection: optionId.toString(),
            },
            {
                headers: {
                    authorization: localStorage.getItem("token"),
                },
            }
        );
        const curBalance = await axios.get(`${BACKEND_URL}/balance`, {
            headers: {
                authorization: localStorage.getItem("token"),
            },
        });
        if (curBalance) {
            console.log(curBalance.data);
            setBalance(Number(curBalance.data.balance));
        }
        if (response) {
            const nextTask = await axios.get(`${BACKEND_URL}/nextTask`, {
                headers: {
                    authorization: localStorage.getItem("token"),
                },
            });
            if (!nextTask.data?.tasks) {
                setNoTask(true);
            } else {
                let data: Task = {
                    id: nextTask.data.tasks.id,
                    title: nextTask.data.tasks.title,
                    options: nextTask.data.tasks.options,
                };
                setTask(data);
            }
        }
        setLoading(false);
    }
    return (
        <>
            <div className="mt-4 items-center">
                {!loading && !noTask && (
                    <div className="">
                        <div className="font-mono text-lg font-bold p-2">
                            {taskData?.title}
                        </div>
                        <div className="p-1">
                            {taskData?.options.map((option) => (
                                <div
                                    className="p-1"
                                    key={option.id}
                                >
                                    <Image
                                        src={option.image_url}
                                        alt={option.id.toString()}
                                        height={400}
                                        width={400}
                                        onClick={() => {
                                            handleImageClick(option.id);
                                        }}
                                        className="cursor-pointer border-black rounded m-2"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {loading && !noTask && (
                    <div className="font-mono text-2xl font-bold">
                        Loading...
                    </div>
                )}
                {noTask && !loading && <NoTask />}
            </div>
        </>
    );
};

export default TakeVote;
