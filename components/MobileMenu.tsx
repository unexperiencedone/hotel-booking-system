"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function MobileMenu({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      id="hamburger-menu"
      className="flex justify-center items-center w-8"
      onClick={() => {
        setIsOpen(!isOpen);
      }}
    >
      <Image
        width={50}
        height={50}
        alt="hamburger-menu"
        src="/menu-bar.png"
      ></Image>
      {isOpen && (
        <div className="absolute top-0 left-0 w-[200px] bg-white border-b p-4 flex flex-col gap-4 shadow-lg min-[1024]:hidden">
          
          <div className="h-14 flex flex-row items-center gap-2">
            <Link href="/" className="text-xl font-bold text-blue-600">
            🏨 HotelNexus
          </Link>
            <Image
              width={20}
              height={20}
              alt="hamburger-menu"
              src="/menu-bar.png"
              className="object-contain"
            ></Image>
          </div>
          {children}
        </div>
      )}
    </div>
  );
}
