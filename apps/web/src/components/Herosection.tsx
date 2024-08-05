"use client";
import Link from "next/link";
import { HeroHighlight, Highlight } from "./ui/hero-highlight";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import {Button} from "@nextui-org/button";

export function Herosection() {
    const words="All your notes, synced on all your devices. Get Simplenote now for iOS, Android, Desktop or in your browser."
  return (
    <HeroHighlight>
      <h1
        className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
      >
           Experience the Future of Note-Taking.  Where AI Meets Your Ideas
        {" "}
        <Highlight className="text-black dark:text-white">
         for Ultimate Clarity
        </Highlight>
      </h1>
      <TextGenerateEffect words={words} className="text-1xl"/> 
      <div className="flex justify-center mt-10">
        <Button className="p-[1px] relative" as={Link} href="/auth/register">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
          <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
            Start for free
          </div>
        </Button>
      </div>
    </HeroHighlight>
  );
}
