"use client"

import React from 'react'
import {  Navbar,   NavbarBrand,   NavbarContent,   NavbarItem,   NavbarMenuToggle,  NavbarMenu,  NavbarMenuItem} from "@nextui-org/navbar";
import {Button} from "@nextui-org/button";
import Link  from 'next/link';
import {MoonIcon} from "./ui/MoonIcon";
import {SunIcon} from "./ui/SunIcon";
import { Switch } from '@nextui-org/switch';


function Navigationbar() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const menuItems = [
        "Homepage",
        "About Us",
        "Contact Us"
    ];
  return (
        <div className=''>
            <Navbar onMenuOpenChange={setIsMenuOpen} isBordered>
                <NavbarContent justify='start'>
                    <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                    />
                    <NavbarBrand>
                    <p className="font-bold text-inherit">NoterAi</p>
                    </NavbarBrand>
                </NavbarContent>

                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                    <NavbarItem>
                    <Link color="foreground" href="/">
                        Homepage
                    </Link>
                    </NavbarItem>

                    <NavbarItem isActive>
                    <Link href="/about" aria-current="page">
                        About Us
                    </Link>
                    </NavbarItem>

                    <NavbarItem>
                    <Link color="foreground" href="/contact">
                        Contact Us
                    </Link>
                    </NavbarItem>

                </NavbarContent>

                <NavbarContent justify="end">
                    <NavbarItem className="hidden lg:flex">
                    <Link href="#">Login</Link>
                    </NavbarItem>
                    <NavbarItem>
                    <Button as={Link} color="primary" href="/register" variant="flat" className='bg-blue-100 text-blue-600'>
                        Sign Up
                    </Button>
                    </NavbarItem>
                </NavbarContent>

                <NavbarMenu>
                    {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                        color={
                            index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                        }
                        className="w-full"
                        href="#"
                        >
                        {item}
                        </Link>
                    </NavbarMenuItem>
                    ))}
                </NavbarMenu>
            </Navbar>
        </div>
  )
}

export default Navigationbar