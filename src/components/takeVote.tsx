import { taskState } from "@/recoil/atom";
import React from "react";
import { useRecoilValue } from "recoil";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

const TakeVote = () => {
  const taskData = useRecoilValue(taskState);
  async function handleImageClick(optionId: number) {}
  return (
    <div className="">
      <div className="font-mono text-lg font-bold p-2">{taskData?.title}</div>
      <div className="p-1">
        {taskData?.options.map((option) => (
          <div className="p-1" key={option.id}>
            <Card>
              <CardContent>
                <Image
                  src={option.image_url}
                  alt={option.id.toString()}
                  height={200}
                  width={200}
                  onClick={() => {
                    handleImageClick(option.id);
                  }}
                />
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TakeVote;
