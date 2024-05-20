"use client";
import { Me } from "@/components/me";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { BACKEND_URL } from "@/lib/config";
import { useRecoilState, useRecoilValue } from "recoil";
import { taskState, tokenState } from "@/recoil/atom";
import { Task } from "@/lib/type";
import { useState } from "react";
import TakeVote from "@/components/takeVote";

export default function Home() {
  const token = useRecoilValue(tokenState);
  const [taskData, setTaskData] = useRecoilState(taskState);
  const [loading, setLoading] = useState(false);
  const [showStart, setShowStart] = useState(true);
  async function getNExtTask() {
    setShowStart(false);
    setLoading(true);
    const response = await axios.get(`${BACKEND_URL}/nextTask`, {
      headers: {
        token,
      },
    });
    if (response.data) {
      let data: Task = {
        id: response.data.tasks.id,
        title: response.data.tasks.title,
        options: response.data.tasks.options,
      };
      setTaskData(data);
      setLoading(false);
    }
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          <code className="font-mono font-bold">OpenPolls🚀</code>
        </p>
      </div>

      <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        {showStart && <Button onClick={getNExtTask}>Start Task</Button>}
        {loading && (
          <div className="font-mono text-2xl font-bold">Loading...</div>
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
