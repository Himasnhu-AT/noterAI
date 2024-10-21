"use client";
import React from "react";
import { BackgroundGradient } from "./ui/background-gradient";
import Image from "next/image";

function Usecases() {
  return (
    <div>
      <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-center mt-10">
        Powerfully Comprehensive,
      </h1>
      <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-center mt-3">
        Effortlessly Simple
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-center ml-20 mr-20 mt-6">
        <div className="flex justify-center">
          <BackgroundGradient className="flex flex-col rounded-[22px] bg-white dark:bg-zinc-900 overflow-hidden h-full max-w-64 items-center">
            <Image
              src={"/images/summarization.png"}
              alt="summarization"
              height="100"
              width="100"
              className="object-contain mt-3"
            />
            <div className="p-4 sm:p-6 flex flex-col items-center text-center flex-grow">
              <p className="text-lg sm:text-xl text-black mt-3 mb-2 dark:text-neutral-200">
                Summarization
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 flex-grow">
                Instantly condense your notes into concise summaries using AI,
                so you can focus on what truly matters.
              </p>
            </div>
          </BackgroundGradient>
        </div>
        <div className="flex justify-center">
          <BackgroundGradient className="flex flex-col rounded-[22px] bg-white dark:bg-zinc-900 overflow-hidden h-full max-w-64 items-center">
            <Image
              src={"/images/summarization.png"}
              alt="summarization"
              height="100"
              width="100"
              className="object-contain mt-3"
            />
            <div className="p-4 sm:p-6 flex flex-col items-center text-center flex-grow">
              <p className="text-lg sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
                Quizzes
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 flex-grow">
                Transform your notes into dynamic quizzes to supercharge your
                learning and retention.
              </p>
            </div>
          </BackgroundGradient>
        </div>
        <div className="flex justify-center">
          <BackgroundGradient className="flex flex-col rounded-[22px] bg-white dark:bg-zinc-900 overflow-hidden h-full max-w-64 items-center">
            <Image
              src={"/images/summarization.png"}
              alt="summarization"
              height="100"
              width="100"
              className="object-contain mt-3"
            />
            <div className="p-4 sm:p-6 flex flex-col items-center text-center flex-grow">
              <p className="text-lg sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
                Q&A
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 flex-grow">
                Get AI-powered answers directly from your notes, helping you
                learn faster and with greater clarity.
              </p>
            </div>
          </BackgroundGradient>
        </div>
        <div className="flex justify-center">
          <BackgroundGradient className="flex flex-col rounded-[22px] bg-white dark:bg-zinc-900 overflow-hidden h-full max-w-64 items-center">
            <Image
              src={"/images/summarization.png"}
              alt="summarization"
              height="100"
              width="100"
              className="object-contain mt-3"
            />
            <div className="p-4 sm:p-6 flex flex-col items-center text-center flex-grow">
              <p className="text-lg sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
                Strange Facts
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 flex-grow">
                Discover fascinating and motivational facts related to your
                studies, sparking curiosity and engagement.
              </p>
            </div>
          </BackgroundGradient>
        </div>
      </div>
      <hr className="border-t-3 border-neutral-400 mt-20 mx-auto w-1/2" />
    </div>
  );
}

export default Usecases;
