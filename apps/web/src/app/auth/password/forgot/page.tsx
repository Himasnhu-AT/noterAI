"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoaderIcon } from "lucide-react";

const forgotFormSchema = z.object({
  email: z
    .string({
      required_error: "Please enter your email.",
    })
    .email("Invalid email address."),
});

type ForgotFormValues = z.infer<typeof forgotFormSchema>;

export default function ForgotForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const form = useForm<ForgotFormValues>({
    resolver: zodResolver(forgotFormSchema),
    mode: "onChange",
  });

  async function onSubmit(data: ForgotFormValues) {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${apiBaseUrl}/auth/password/forgot?email=${data.email}`,
        {
          method: "GET",
        },
      );

      if (response.ok) {
        router.push(`/auth/password/forgot/change?email=${data.email}`);
      } else {
        toast({
          title: "Error",
          description: "Email not found. Please check your credentials.",
          type: "foreground",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fetching API", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        type: "foreground",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <CardHeader className="space-y-1">
          <CardTitle className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
            Recover your password
          </CardTitle>
          <CardDescription className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
            to continue to your NoterAi account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-center items-center">
                <Button
                  type="submit"
                  className="text-md w-2/3"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <p className="animate-spin">
                      <LoaderIcon />
                    </p>
                  ) : (
                    <p>Send Verification Code &rarr;</p>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col justify-start items-start">
          <div>
            <p>
              Don&apos;t have an account?
              <Button variant={"link"} className="text-[16px]">
                {" "}
                <Link href={"/signup"}>Register</Link>
              </Button>
            </p>
          </div>
          <div>
            <p>
              <Button variant={"link"} className="text-[16px]">
                <Link href={"/auth/login"}>Back to Login</Link>
              </Button>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
