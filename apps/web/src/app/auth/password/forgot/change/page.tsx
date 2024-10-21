"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
import Link from "next/link";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const changePasswordSchema = z
  .object({
    email: z
      .string({
        required_error: "Email is required.",
      })
      .email("Invalid email address."),
    otp: z.string().length(6, {
      message: "OTP must be exactly 6 digits.",
    }),
    password: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters.",
      })
      .max(30, {
        message: "Password must not be longer than 30 characters.",
      }),
    confirmPassword: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters.",
      })
      .max(30, {
        message: "Password must not be longer than 30 characters.",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

type ChangePasswordValues = z.infer<typeof changePasswordSchema>;

export default function ChangeForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const searchParams = useSearchParams();
  const email = searchParams?.get("email");

  const form = useForm<ChangePasswordValues>({
    resolver: zodResolver(changePasswordSchema),
    mode: "onChange",
    defaultValues: {
      email: email || "",
    },
  });

  async function onSubmit(data: ChangePasswordValues) {
    setIsLoading(true);
    try {
      const response = await fetch(`${apiBaseUrl}/auth/password/change`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, otp }),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Password changed successfully.",
        });
        router.push("/login");
      } else {
        toast({
          title: "Error",
          description: "Failed to change password. Please try again.",
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

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !emailRegex.test(email)) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
          <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
            Email not found
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm mt-2">
            The email address you are trying to verify is not valid.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <CardHeader className="space-y-1">
          <CardTitle className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
            Change your password
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
                      <Input type="email" {...field} readOnly />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>OTP / Token</FormLabel>
                    <FormControl>
                      <InputOTP
                        maxLength={6}
                        value={field.value}
                        onChange={(value) => form.setValue("otp", value)}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
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
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
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
                    <p>Change Password</p>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col justify-start items-start">
          <div>
            <p>
              Remembered your password?
              <Button variant={"link"} className="text-[16px]">
                {" "}
                <Link href={"/auth/login"}>Back to Login</Link>
              </Button>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

// "use client";

// import React, { useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { toast } from "@/hooks/use-toast";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { LoaderIcon } from "lucide-react";
// import Link from "next/link";

// const changePasswordSchema = z
//   .object({
//     email: z
//       .string({
//         required_error: "Email is required.",
//       })
//       .email("Invalid email address."),
//     otp: z.number().positive().min(000000,  {
//       message: "OTP must be 6 digits.",
//     }).max(999999,  {
//       message: "OTP must be 6 digits.",
//     }),
//     password: z
//       .string()
//       .min(8, {
//         message: "Password must be at least 8 characters.",
//       })
//       .max(30, {
//         message: "Password must not be longer than 30 characters.",
//       }),
//     confirmPassword: z
//       .string()
//       .min(8, {
//         message: "Password must be at least 8 characters.",
//       })
//       .max(30, {
//         message: "Password must not be longer than 30 characters.",
//       }),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords do not match.",
//     path: ["confirmPassword"],
//   });

// type ChangePasswordValues = z.infer<typeof changePasswordSchema>;

// export default function ChangeForm() {
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();
//   const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

//   const searchParams = useSearchParams();
//   const email = searchParams?.get("email");

//   const form = useForm<ChangePasswordValues>({
//     resolver: zodResolver(changePasswordSchema),
//     mode: "onChange",
//   });

//   async function onSubmit(data: ChangePasswordValues) {
//     setIsLoading(true);
//     try {
//       const response = await fetch(`${apiBaseUrl}/auth/password/change`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });

//       if (response.ok) {
//         toast({
//           title: "Success",
//           description: "Password changed successfully.",
//         });
//         router.push("/login");
//       } else {
//         toast({
//           title: "Error",
//           description: "Failed to change password. Please try again.",
//           type: "foreground",
//           variant: "destructive",
//         });
//       }
//     } catch (error) {
//       console.error("Error fetching API", error);
//       toast({
//         title: "Error",
//         description: "Something went wrong. Please try again later.",
//         type: "foreground",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//   if (!email || !emailRegex.test(email)) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
//           <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
//             Email not found
//           </h2>
//           <p className="text-neutral-600 dark:text-neutral-400 text-sm mt-2">
//             The email address you are trying to verify is not valid.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <Card className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
//         <CardHeader className="space-y-1">
//           <CardTitle className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
//             Change your password
//           </CardTitle>
//           <CardDescription className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
//             to continue to your NoterAi account.
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="grid gap-4">
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//               <FormField
//                 control={form.control}
//                 name="email"
//                 render={() => (
//                   <FormItem>
//                     <FormLabel>Email Address</FormLabel>
//                     <FormControl>
//                       <Input type="email" value={email} readOnly />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="otp"
//                 render={() => (
//                   <FormItem>
//                     <FormLabel>OTP / Token</FormLabel>
//                     <FormControl>
//                     <InputOTP maxLength={6}>
//                           <InputOTPGroup>
//                             <InputOTPSlot index={0} />
//                             <InputOTPSlot index={1} />
//                             <InputOTPSlot index={2} />
//                           </InputOTPGroup>
//                           <InputOTPSeparator />
//                           <InputOTPGroup>
//                             <InputOTPSlot index={3} />
//                             <InputOTPSlot index={4} />
//                             <InputOTPSlot index={5} />
//                           </InputOTPGroup>
//                         </InputOTP>
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="password"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>New Password</FormLabel>
//                     <FormControl>
//                       <Input
//                         type="password"
//                         placeholder="••••••••"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="confirmPassword"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Confirm New Password</FormLabel>
//                     <FormControl>
//                       <Input
//                         type="password"
//                         placeholder="••••••••"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <div className="flex justify-center items-center">
//                 <Button
//                   type="submit"
//                   className="text-md w-2/3"
//                   disabled={isLoading}
//                 >
//                   {isLoading ? (
//                     <p className="animate-spin">
//                       <LoaderIcon />
//                     </p>
//                   ) : (
//                     <p>Change Password</p>
//                   )}
//                 </Button>
//               </div>
//             </form>
//           </Form>
//         </CardContent>
//         <CardFooter className="flex flex-col justify-start items-start">
//           <div>
//             <p>
//               Remembered your password?
//               <Button variant={"link"} className="text-[16px]">
//                 {" "}
//                 <Link href={"/login"}>Back to Login</Link>
//               </Button>
//             </p>
//           </div>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// }
