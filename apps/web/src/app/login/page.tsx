"use client"

import React, { useState } from 'react'
import { motion } from "framer-motion";
import { AuroraBackground } from "@/components/ui/aurora-background";
import Image from "next/image";
import {Input} from "@nextui-org/input";
import {MailIcon} from '@/components/ui/MailIcon';
import { EyeSlashFilledIcon } from '@/components/ui/EyeSlashFilledIcon';
import { EyeFilledIcon } from '@/components/ui/EyeFilledIcon';
import {Button} from "@nextui-org/react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function Loginpage() {

  const router=useRouter()
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [email, setEmail] = useState("")
  const [password,setPass]=useState("");

  const validateEmail = (value: string) => value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

  const isInvalid = React.useMemo(() => {
    if (email === "") return false;

    return validateEmail(email) ? false : true;
  }, [email]);

  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try{
      const response = await fetch(`${apiBaseUrl}/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({email,password})
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Verification successful", data);
        router.push("/dashboard")

      } else {
        console.error("Verification failed", data);
      }
    } catch (error) {
      console.error("Error verifying email", error);
    }
  }

  return (
    <div >
      <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
      >
        <div className='flex flex-col justify-center items-center min-h-screen'>
          <Image
            src={'/images/logo.png'}
            alt="summarization"
            height="100"
            width="100"
            className="object-contain mt-3 bg-transparent"
          />
          <h1 className='font-bold text-2xl text-neutral-800 dark:text-neutral-200 mt-5'>Sign in</h1>
          <p className='text-sm text-neutral-800 dark:text-neutral-200 '>to continue to your noterAi account</p>
          <form className="flex flex-col w-full flex-wrap md:flex-nowrap gap-4 mt-10 my-8" onSubmit={handleSubmit}>
            <Input
              isClearable
              type="email" 
              variant='bordered' 
              size='md' 
              label="Email"
              value={email}
              placeholder="Enter your email"
              isInvalid={isInvalid}
              color={isInvalid ? "danger" : "success"}
              onValueChange={setEmail}
              errorMessage="Please enter a valid email"
              startContent={
                <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              className='w-96'
            />
            <Input
              label="Password"
              variant="bordered"
              placeholder="Enter your password"
              endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                  {isVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
              className="w-96"
              value={password}
              onValueChange={setPass}
            />
            <Button color="primary" variant='faded' type='submit'>
              Log in &rarr;
            </Button> 
          </form>
        </div>  
        
      </motion.div>
    </AuroraBackground>
    </div>
  )}
export default Loginpage
