"use client";

import { Tooltip } from "@nextui-org/react";
import {
  IconBrowserCheck,
  IconCalendarMonth,
  IconCertificate,
  IconFolder,
  IconLayoutDashboard,
  IconLogout2,
  IconSquareRoundedChevronLeftFilled,
  IconSquareRoundedChevronRightFilled,
  IconUsers,
} from "@tabler/icons-react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useState } from "react";
import { logout } from "~/lib/auth";

interface NavItem {
  title: string;
  icon: JSX.Element;
  href: string;
}

const navItems: NavItem[] = [
  { title: "Dashboard", icon: <IconLayoutDashboard size={24} />, href: "/dashboard" },
  { title: "Calendar of Events", icon: <IconCalendarMonth size={24} />, href: "/calendar" },
  { title: "Mass Reservation", icon: <IconBrowserCheck size={24} />, href: "/massreservation" },
  { title: "Certificates", icon: <IconCertificate size={24} />, href: "/certificates" },
  { title: "Deceased Inventory", icon: <IconFolder size={24} />, href: "/deceasedinventory" },
  { title: "Priests", icon: <IconUsers size={24} />, href: "/priests" },
];

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const pathname = usePathname();

  return (
    <nav
      className={
        "relative min-h-screen overflow-y-clip bg-gray-50 pb-16 pt-2 text-gray-700 transition-all" +
        (expanded ? " w-60" : " w-20")
      }
    >
      <div
        className="group absolute right-0 h-full cursor-pointer border-r-8 border-gray-50 transition-all hover:border-indigo-50"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? (
          <IconSquareRoundedChevronLeftFilled
            fill="currentColor"
            className="absolute -left-2 top-6 z-10 text-indigo-500 transition-all hover:text-indigo-400 group-hover:scale-105"
            size={36}
          />
        ) : (
          <IconSquareRoundedChevronRightFilled
            fill="currentColor"
            className="absolute -left-2 top-6 z-10 text-indigo-500 transition-all hover:text-indigo-400 group-hover:scale-105"
            size={36}
          />
        )}
      </div>
      <div className="absolute left-0 h-full border-l-8 border-gray-50"></div>
      <div className="flex h-full w-full flex-col flex-wrap gap-8 overflow-hidden">
        <div className="flex items-center">
          <div className="inline-flex h-20 w-20 items-center justify-center">
            <Image src="/logo.png" alt="Saint Michael Parish Church" width={42} height={42} />
          </div>
          <h1 className={"w-36 text-lg font-bold transition-all" + (expanded ? "" : " opacity-0")}>
            Saint Michael Parish Church
          </h1>
        </div>
        <div className="flex flex-1 flex-col justify-between">
          <ul className="flex flex-col">
            {navItems.map((item) => (
              <li key={item.href}>
                <Tooltip
                  placement="right"
                  content={item.title}
                  offset={-156}
                  delay={400}
                  closeDelay={0}
                  isDisabled={expanded}
                >
                  <Link
                    className={
                      "group flex items-center transition-colors focus-visible:outline-none" +
                      (pathname.startsWith(item.href) ? " pointer-events-none text-gray-50" : "")
                    }
                    href={item.href}
                  >
                    <div
                      className={
                        "absolute left-3 right-3 h-14 rounded-2xl transition-all group-hover:bg-indigo-100" +
                        (expanded ? " w-54" : " w-14") +
                        (pathname.startsWith(item.href) ? " bg-indigo-500" : "")
                      }
                    ></div>
                    <div className="z-10 inline-flex h-16 w-20 items-center justify-center">
                      {item.icon}
                    </div>
                    <span
                      className={
                        "z-10 -ml-4 w-40 font-bold transition-opacity" +
                        (expanded ? "" : " opacity-0")
                      }
                    >
                      {item.title}
                    </span>
                  </Link>
                </Tooltip>
              </li>
            ))}
          </ul>
          <Tooltip
            placement="right"
            content="Logout"
            offset={-156}
            delay={400}
            closeDelay={0}
            isDisabled={expanded}
          >
            <form action={logout}>
              <button
                type="submit"
                className="flex cursor-pointer items-center transition-colors hover:text-indigo-600 focus-visible:outline-none"
              >
                <div className="inline-flex h-16 w-20 items-center justify-center">
                  <IconLogout2 size={24} />
                </div>
                <span
                  className={
                    "-ml-4 w-40 text-start font-bold transition-all" +
                    (expanded ? "" : " opacity-0")
                  }
                >
                  Logout
                </span>
              </button>
            </form>
          </Tooltip>
        </div>
      </div>
    </nav>
  );
}
