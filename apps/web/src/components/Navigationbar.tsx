"use client";

import React, { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import Link from "next/link";
import { Button } from "./ui/button";

function Navigationbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [currentPath, setCurrentPath] = useState("");

  const menuItems = [
    { name: "Homepage", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
  ];

  // Ensure the pathname is set on the client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  return (
    <div>
      <Navbar
        onMenuOpenChange={setIsMenuOpen}
        isBordered
        className=" dark:bg-black text-gray-800 dark:text-white px-4 py-2 sm:py-4"
      >
        {/* Left Section: Brand & Menu Toggle */}
        <NavbarContent justify="start">
          <NavbarBrand className=" font-bold">
            <Link href="/" className="text-2xl">
              NoterAi
            </Link>
          </NavbarBrand>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden ml-auto"
          />
        </NavbarContent>

        {/* Center Section: Links (Hidden on small screens) */}
        <NavbarContent className="hidden sm:flex gap-6" justify="center">
          {menuItems.map((item, index) => (
            <NavbarItem key={index} isActive={item.href === currentPath}>
              <Link
                href={item.href}
                className={`${
                  item.href === currentPath
                    ? "text-blue-600"
                    : "text-gray-800 dark:text-gray-300"
                } hover:text-blue-600 transition-all`}
              >
                {item.name}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>

        {/* Right Section: Login & Sign Up */}
        <NavbarContent justify="end">
          <NavbarItem>
            <Link href="/auth/login">
              <Button variant="secondary">Login</Button>
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/auth/signup">
              <Button variant="default">Sign Up</Button>
            </Link>
          </NavbarItem>
        </NavbarContent>

        {/* Mobile Menu */}
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item.name}-${index}`}>
              <Link
                href={item.href}
                className="w-full text-gray-800 dark:text-gray-300 hover:text-blue-600 transition-all"
              >
                {item.name}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </div>
  );
}

export default Navigationbar;
