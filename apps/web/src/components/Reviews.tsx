"use client";

import React from "react";
import { CardStack } from "./ui/card-stack";
import { cn } from "@/lib/utils";
// import { motion } from "framer-motion";
// import { AuroraBackground } from "./ui/aurora-background";

function Reviews() {
  return (
    <div className="mt-20">
      <div className="h-[50rem] w-full dark:bg-black bg-white  dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative flex items-center justify-center">
        <div className="mt-14 flex flex-col justify-center">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-center">
            What our users are saying
          </h1>
          <div className="flex flex-col justify-center items-center mt-20">
            <CardStack items={CARDS} />
          </div>
        </div>
      </div>
    </div>
  );
}

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-700/[0.2] dark:text-emerald-500 px-1 py-0.5",
        className,
      )}
    >
      {children}
    </span>
  );
};

const CARDS = [
  {
    id: 0,
    name: "Jane Doe",
    designation: "Software Engineer",
    content: (
      <p>
        The features offered here are incredibly helpful, and{" "}
        <Highlight>I’m amazed at how seamless the integration is</Highlight>. I
        use them every day to improve my productivity.
      </p>
    ),
  },
  {
    id: 1,
    name: "John Smith",
    designation: "Project Manager",
    content: (
      <p>
        This platform has streamlined our workflows significantly.{" "}
        <Highlight>The ease of use is unmatched</Highlight>, and it's been a
        game changer for our team.
      </p>
    ),
  },
  {
    id: 2,
    name: "Alice Johnson",
    designation: "Data Scientist",
    content: (
      <p>
        I’ve never encountered such a comprehensive set of tools that are also
        <Highlight>so intuitive and user-friendly</Highlight>. It has made my
        job much easier and more efficient.
      </p>
    ),
  },
];

export default Reviews;
