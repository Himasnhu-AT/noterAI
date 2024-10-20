"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";
import { IconEyeOff, IconEye } from "@tabler/icons-react";
import { useState } from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const radius = 100; // change this to increase the rdaius of the hover effect
    const [visible, setVisible] = React.useState(false);
    const [isVisible, setIsVisible] = React.useState(false);
    const [visIcon, setVisIcon] = useState(<IconEyeOff />);
    const [passtype, setPasstype] = React.useState("password");
    const toggleVisibility = () => {
      setIsVisible(!isVisible);
      isVisible ? visibilityOn() : visibilityOff();
    };

    function visibilityOn() {
      setPasstype("text");
      setVisIcon(<IconEye />);
    }

    function visibilityOff() {
      setPasstype("password");
      setVisIcon(<IconEyeOff />);
    }

    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: any) {
      let { left, top } = currentTarget.getBoundingClientRect();

      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }
    return (
      <motion.div
        style={{
          background: useMotionTemplate`
        radial-gradient(
          ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
          var(--blue-500),
          transparent 80%
        )
      `,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="p-[2px] rounded-lg transition duration-300 group/input flex flex-row"
      >
        <input
          type={passtype}
          className={cn(
            `flex h-10 w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm  file:border-0 file:bg-transparent 
          file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600 
          focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600
           disabled:cursor-not-allowed disabled:opacity-50
           dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
           group-hover/input:shadow-none transition duration-400
           `,
            className
          )}
          ref={ref}
          {...props}
        />
        <button onClick={toggleVisibility} className="p-1">
          {visIcon}
        </button>
      </motion.div>
    );
  }
);
PasswordInput.displayName = "Input";

export { PasswordInput };
