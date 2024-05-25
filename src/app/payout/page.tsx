"use client";
import { Me } from "@/components/me";
import { Input } from "@/components/ui/input";
import { getBalance } from "@/recoil/selector";
import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import axios from "axios";
import { BACKEND_URL } from "@/lib/config";
import { balanceState } from "@/recoil/atom";
import { useRouter } from "next/navigation";
import { headers } from "next/headers";

const formSchema = z.object({
    address: z.string().min(2, {
        message: "Address must be at least 2 characters.",
    }),
});

const Page = () => {
    const balance = useRecoilValue(getBalance);
    const [balanceNow, setBalanceNow] = useRecoilState(balanceState);
    const [signature, setSignature] = useState("");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            address: "",
        },
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [amount, setAmount] = useState(0);
    const router = useRouter();

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(localStorage.getItem("token"));
        const response = await axios.post(
            `${BACKEND_URL}/payout`,
            {
                wallet: values.address,
            },
            {
                headers: {
                    authorization: localStorage.getItem("token"),
                },
            }
        );

        if (response.data.signature) {
            setSignature(response.data.signature);
            setAmount(Number(response.data.amount));
        }

        setBalanceNow(0);

        setIsSubmitted(true);
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-between">
            <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
                <p className=" left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                    <code className="font-mono font-bold">OpenPolls🚀</code>
                </p>
            </div>
            {!isSubmitted && (
                <div className="mt-15 items-center justify-center">
                    <div className="p-4 flex items-center justify-center">
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className=""
                            >
                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Enter your Solana Wallet Address
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter your Solana address here..."
                                                    {...field}
                                                    className=""
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    type="submit"
                                    className="flex items-center justify-center mt-4"
                                >
                                    Submit
                                </Button>
                            </form>
                        </Form>
                    </div>
                    <div className="flex items-center justify-center font-mono ">
                        Available balance: {balance / 1000000000}
                    </div>
                    <p className="font-mono flex items-center justify-center mt-4 text-sm">
                        {"Transaction fees are on us🚀"}
                    </p>
                </div>
            )}
            {isSubmitted && (
                <div className="mt-20 flex items-center justify-center">
                    {signature.length > 0 && (
                        <p className="font-mono">
                            {`We have received your payout request of ${
                                amount / 1000000000
                            }.It will be transferred to your account within 30 mins. Here is your signature: ${signature}`}
                        </p>
                    )}
                    {signature.length === 0 && (
                        <p className="font-mono">
                            {
                                "We have received your payout request. Please keep an eye on your transaction."
                            }
                        </p>
                    )}
                    <div className="p-4">
                        <Button
                            onClick={() => {
                                router.push("/");
                            }}
                        >
                            HomePage
                        </Button>
                    </div>
                </div>
            )}

            <div className="h-14 border-t w-full grid place-items-center">
                <div className="">
                    <Me />
                </div>
            </div>
        </div>
    );
};

export default Page;
