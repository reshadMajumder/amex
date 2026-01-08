
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AmexLogo } from "@/components/icons/amex-logo";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Package, Users, Settings, User } from "lucide-react";
import { Button } from "./ui/button";

const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/shipments", label: "Shipments", icon: Package },
  { href: "/dashboard/destinations", label: "Destinations", icon: Users },
  { href: "/dashboard/profile", label: "Profile", icon: User },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex-col hidden md:flex">
      <div className="h-20 flex items-center px-6 border-b">
        <Link href="/">
          <AmexLogo className="text-primary" />
        </Link>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navLinks.map((link) => {
          const isActive = pathname.startsWith(link.href) && (link.href === "/dashboard" ? pathname === link.href : true);
          return (
            <Link key={link.href} href={link.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  isActive && "font-bold"
                )}
              >
                <link.icon className="mr-3 h-5 w-5" />
                {link.label}
              </Button>
            </Link>
          );
        })}
      </nav>
      <div className="px-4 pb-6">
        <Button variant="outline" className="w-full">
            Log Out
        </Button>
      </div>
    </aside>
  );
}
