import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandX,
  IconBrandLinkedin,
  IconHome,
} from "@tabler/icons-react";

export function FloatingDockDemo() {
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/", // Link to the homepage
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://github.com/", // Link to GitHub
    },
    {
      title: "X (formerly Twitter)",
      icon: (
        <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://x.com/", // Link to X (Twitter)
    },
    {
      title: "LinkedIn",
      icon: (
        <IconBrandLinkedin className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://linkedin.com/", // Link to LinkedIn
    },
  ];

  return (
    <footer className="w-full bg-black text-white">
      {/* Line above footer */}
      <div className="h-[2px] bg-neutral-600 w-full" />

      {/* Footer content */}
      <div className="flex justify-between items-center p-4">
        {/* Left Half */}
        <div className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
          Made by Amartya
        </div>

        {/* Right Half */}
        <div className="flex justify-end">
          <FloatingDock
            mobileClassName="translate-y-0"
            items={links}
            className="text-white"
          />
        </div>
      </div>
    </footer>
  );
}
