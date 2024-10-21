"use client";

import React from "react";
import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";
import { Button } from "@nextui-org/button";

function Footer() {
  return (
    <footer className="py-12">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Project Information */}
          <div>
            <h2 className="text-lg font-semibold">About the Project</h2>
            <p className="mt-4 text-sm text-gray-400">
              This project is an open-source initiative under{" "}
              <strong>OSS-AI</strong>, sponsored by <strong>OpenEdu</strong>,
              aimed at fostering collaboration and innovation in open-source
              development.
            </p>
            <p className="mt-2 text-sm text-gray-400">
              Contributions are welcome. Let&apos;s build a more inclusive and
              open future for AI development together.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h2 className="text-lg font-semibold">Explore</h2>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/docs" className="text-gray-400 hover:text-white">
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/contribute"
                  className="text-gray-400 hover:text-white"
                >
                  How to Contribute
                </Link>
              </li>
              <li>
                <Link
                  href="/community"
                  className="text-gray-400 hover:text-white"
                >
                  Community Forum
                </Link>
              </li>
              <li>
                <Link
                  href="/sponsor"
                  className="text-gray-400 hover:text-white"
                >
                  Sponsor Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Get Involved & Social Links */}
          <div>
            <h2 className="text-lg font-semibold">Get Involved</h2>
            <p className="mt-4 text-sm text-gray-400">
              Join the community on GitHub and stay updated on our latest
              developments and releases.
            </p>
            <form className="mt-4">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded border  focus:outline-none focus:ring-2 focus:ring-indigo-600 w-full"
              />
              <Button className="p-[1px] relative" as={Link} href="">
                Subscribe to Newsletter
              </Button>
            </form>

            <div className="flex mt-6 space-x-4">
              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <Github size={24} />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <Twitter size={24} />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <Linkedin size={24} />
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>
            &copy; 2024 OSS-AI. Sponsored by <strong>OpenEdu</strong>. All
            rights reserved.
          </p>
          <div className="mt-4">
            <Link href="/terms" className="text-gray-400 hover:text-white mx-4">
              Terms of Use
            </Link>
            <Link
              href="/privacy"
              className="text-gray-400 hover:text-white mx-4"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
