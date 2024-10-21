"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { storeValues } from "@/scripts/check-user-auth";
import { LoaderIcon } from "lucide-react";
import { useState } from "react";
import { UserProfile } from "@/types/user";
import { toast } from "@/hooks/use-toast";

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  bio: z.string().max(160).min(4),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .max(30, {
      message: "Password must not be longer than 30 characters.",
    })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.",
    ),
  confirmPassword: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .max(30, {
      message: "Password must not be longer than 30 characters.",
    })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.",
    ),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface SignUpResponse {
  status: number;
  message: string;
  data: UserProfile;
}
const SignUp = () => {
  const [isloading, setisLoading] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: "onChange",
  });

  async function onSubmit(data: ProfileFormValues) {
    try {
      setisLoading(true);
      if (data.confirmPassword !== data.password) {
        toast({
          title: "Error",
          type: "foreground",
          variant: "destructive",
          description: "Passwords do not match",
        });
        return;
      } else {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/signup`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: "include",
          },
        );

        const response: SignUpResponse = await res.json();

        if (response.status == 403 || response.status == 500) {
          toast({
            title: response.status.toString(),
            description: response.message,
            type: "foreground",
            variant: "destructive",
          });
          return;
        } else if (response.status == 200) {
          const user: UserProfile = response.data;

          if (process.browser) {
            const valueStored = storeValues(user, false);
            if (valueStored) {
              window.location.href = `${process.env.NEXT_PUBLIC_CLIENT_URL}/signup/verify/`;
            } else {
              toast({
                title: "Error",
                description: "Unable to store values",
              });
              return;
            }
            toast({
              title: response.message,
            });
          }
        }
      }
    } catch {
      setisLoading(false);
      toast({
        title: "ERROR: 500",
        description: "Something Went Wrong. Try again later",
      });
    } finally {
      setisLoading(false);
    }
  }

  return (
    <div className=" flex justify-center items-center h-screen">
      <Card className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <CardHeader className="space-y-1">
          <CardTitle className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
            Welcome to NoterAi
          </CardTitle>
          <CardDescription className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
            Sign in to NoterAi for better services
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
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="OpenEdu@Example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className=" flex justify-center items-center">
                <Button
                  type="submit"
                  className=" text-md w-2/3"
                  disabled={isloading}
                >
                  {isloading ? (
                    <p className=" animate-spin">
                      <LoaderIcon />
                    </p>
                  ) : (
                    <p>Sign IN</p>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col justify-start items-start">
          <div>
            <p>
              Don&apos;t have an account.
              <Button variant={"link"} className=" text-[16px]">
                {" "}
                <Link href={"/signup"}>Register</Link>
              </Button>
            </p>
          </div>
          <div>
            <p>
              <Button variant={"link"} className=" text-[16px]">
                <Link href={"/forgotpassword"}> Forgot Your Password?</Link>
              </Button>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;
