"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { Add, Explore, Discord } from "@/components/icons";
import { data } from "@/data";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const active = pathname.split("/")[1];

  return (
    <html lang="en">
      <body className="flex h-screen font-sans text-gray-100">
        <div className="space-y-2 overflow-y-scroll bg-gray-900 p-3">
          <NavLink href="/">
            <Discord className="h-5 w-7" />
          </NavLink>

          <hr className="mx-2 rounded border-t-2 border-t-white/[.06]" />

          {data.map((server) => (
            <NavLink
              key={server.id}
              href={`/servers/${server.id}/channels/${server.categories?.[0]?.channels?.[0]?.id}`}
              active={active === server.id.toString()}
            >
              <Image src={server.img} width={256} height={256} alt="" />
            </NavLink>
          ))}

          <NavLink href="/add">
            <Add className="h-6 w-6" />
          </NavLink>

          <NavLink href="/explore">
            <Explore className="h-6 w-6 text-white" />
          </NavLink>
        </div>

        {children}
      </body>
    </html>
  );
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active?: boolean;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isAddorExplore = href === "/add" || href === "/explore";
  active ||= pathname === href;

  return (
    <Link href={href} className="group relative block">
      <div className="absolute -left-3 flex h-full items-center">
        <div
          className={`${active ? "h-10" : "h-5 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100"} w-1 origin-left rounded-r bg-white transition-all duration-200`}
        ></div>
      </div>

      <div className="group-active:translate-y-px">
        <div
          className={`flex h-12 w-12 items-center justify-center overflow-hidden transition-all duration-200 ${active ? `rounded-2xl ${isAddorExplore ? "bg-green-500" : "bg-brand"} ` : `rounded-3xl bg-gray-700 ${isAddorExplore ? "text-green-500 group-hover:bg-green-500" : "group-hover:bg-brand"} text-gray-100 group-hover:rounded-2xl group-hover:text-white`}`}
        >
          {children}
        </div>
      </div>
    </Link>
  );
}
