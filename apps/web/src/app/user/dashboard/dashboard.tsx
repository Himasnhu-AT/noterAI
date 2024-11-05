"use client";
import React, { useState } from "react";
import { FeaturedBooks } from "./featuredbooks"
import Link from "next/link";
import { Tasks } from "./tasks";
export function Dashboardpage() {
  return(
    <div>
      <p className="text-msm md:text-medium lg:text-1xl font-medium ml-6 text-gray-400" >Ready to take notes?</p>
      <p className="text-medium md:text-1xl lg:text-2xl font-semibold ml-6" >Sample&apos;s Home</p>
      <div className="lg:flex lg:flex-row justify-around">
        <div className="max-w-fit">
          <div className="flex flex-row justify-between">
            <p className="text-sm md:text-medium lg:text-1xl font-medium mt-7 md:mt-10 lg:mt-16 text-slate-800" >Books</p>
            <Link href="/user/books" className="text-sm md:text-medium lg:text-1xl font-medium mt-7 md:mt-10 lg:mt-16 text-slate-600 text-end" >see all</Link>
          </div>
          <FeaturedBooks />
        </div>
        <div className="">
          <div className="flex flex-row justify-between mb-10">
            <p className="text-sm md:text-medium lg:text-1xl font-medium mt-7 md:mt-10 lg:mt-16 text-slate-800" >Tasks</p>
            <Link href="/user/tasks" className="text-sm md:text-medium lg:text-1xl font-medium mt-7 md:mt-10 lg:mt-16 text-slate-600 text-end" >see all</Link>
          </div>
          <Tasks />
        </div> 
      </div>
      

    </div>
  );
}
