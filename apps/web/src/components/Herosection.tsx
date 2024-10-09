"use client";

import Link from "next/link";
import { HeroHighlight, Highlight } from "./ui/hero-highlight";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import { Button } from "@nextui-org/button";
import Image from "next/image";

export function Herosection() {
  const words =
    "Your notes, ideas, and inspiration. Seamlessly synced across all your devices. Experience Simplenote on iOS, Android, Desktop, or your favorite browser.";

  return (
    <HeroHighlight className="flex flex-col items-center py-10">
      <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto">
        {/* Image Section - Now above the text on small screens */}
        <div className="mt-10 md:mt-0 md:w-1/2">
          <Image
            src="/images/notes.png"
            width={500}
            height={500}
            alt="Note-taking illustration"
            className="w-full"
          />
        </div>

        {/* Text Section */}
        <div className="flex flex-col md:w-1/2 pt-4 md:pt-0">
          <h1 className="text-lg md:text-2xl lg:text-3xl font-bold text-neutral-700 dark:text-white leading-relaxed lg:leading-snug">
            Revolutionize Your Note-Taking. Where{" "}
            <Highlight className="text-black dark:text-white">
              Ideas Evolve into Insights, Powered by AI.
            </Highlight>{" "}
            Transform thoughts into action like never before.
          </h1>
          <TextGenerateEffect
            words={words}
            className="text-sm md:text-base mt-2"
          />
          <div className="flex justify-center mt-6">
            <Button
              className="p-[1px] relative"
              as={Link}
              href="/auth/register"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
              <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
                Start Free and Unlock Your Potential
              </div>
            </Button>
          </div>
        </div>
      </div>
    </HeroHighlight>
  );
}
