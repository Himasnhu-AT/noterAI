"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import {Input} from "@nextui-org/input";
import { EyeSlashFilledIcon } from '@/components/ui/EyeSlashFilledIcon';
import { EyeFilledIcon } from '@/components/ui/EyeFilledIcon';

export function ForgotChangeForm() {
    const [token,setToken]=useState('')
    const searchParams = useSearchParams();
    const email = searchParams.get('email');

    const router=useRouter()
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    const [newPassword,setPass]=useState("");

    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        setToken(e.target.value)
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try{
        const response = await fetch(`${apiBaseUrl}/auth/password/forgot/change`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({email,token,newPassword})
        });
        
        const data = await response.json();
        
        if (response.ok) {
            router.push('/auth/login')
        } else {
            console.error("Verification failed", data);
        }
        } catch (error) {
        console.error("Error verifying email", error);
        }
    };
    return (
        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
            Update your password
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
            Choose your new password for {email}
        </p>

        <form className="my-8" onSubmit={handleSubmit}>

            <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
                label="Password"
                variant="bordered"
                placeholder="Enter New password"
                endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                    {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                    </button>
                }
                className="w-96"
                value={newPassword}
                onValueChange={setPass}
                />
            </LabelInputContainer>

            <LabelInputContainer className="mb-4">
                <Label htmlFor="token">Verification code</Label>
                <Input
                id="token"
                name="token"
                placeholder="••••••••"
                type="text"
                value={token}
                onChange={handleChange}
                />
            </LabelInputContainer>
            <div>
            
            </div>

            <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
            >
            Update password &rarr;
            <BottomGradient />
            </button>

            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
            
        </form>
        </div>
    );
    }

    const BottomGradient = () => {
    return (
        <>
        <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
        <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
    };

    const LabelInputContainer = ({
    children,
    className,
    }: {
    children: React.ReactNode;
    className?: string;
    }) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
        {children}
        </div>
    );
};
