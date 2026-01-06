"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Globe, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AmexLogo } from "@/components/icons/amex-logo";

const mainNavLinks = [
  { name: "Home", href: "#" },
  { name: "Services & Solutions", href: "#" },
  { name: "Supply Chain Solutions", href: "#" },
  { name: "Service & Support", href: "#" },
];

const secondaryNavLinks = [
  { name: "About", href: "#" },
  { name: "Log In", href: "#" },
  { name: "Register", href: "#" },
];


export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navClasses = cn(
    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
    scrolled
      ? "bg-background/80 backdrop-blur-md shadow-lg"
      : "bg-transparent"
  );

  const linkColorClass = scrolled ? "text-foreground" : "text-white";
  const hoverBgClass = scrolled ? "hover:bg-accent/10" : "hover:bg-white/10";
  const allNavLinks = [...mainNavLinks, ...secondaryNavLinks];

  return (
    <header className={navClasses}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-8">
            <Link href="/" aria-label="Home">
              <AmexLogo className={linkColorClass} />
            </Link>
            <div className="hidden md:flex items-center space-x-2">
              {mainNavLinks.map((link) => (
                <Button
                  key={link.name}
                  variant="ghost"
                  className={cn(linkColorClass, hoverBgClass)}
                  asChild
                >
                  <Link href={link.href}>{link.name}</Link>
                </Button>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-2">
             {secondaryNavLinks.map((link: any) => {
                if (link.dropdown) {
                  return (
                    <DropdownMenu key={link.name}>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className={cn(linkColorClass, hoverBgClass)}
                        >
                          {link.name}
                          <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>English</DropdownMenuItem>
                        <DropdownMenuItem>Español</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )
                }
                if (link.variant === 'outline') {
                    return (
                        <Button
                            key={link.name}
                            variant="outline"
                             className={cn(scrolled ? 'border-primary text-primary hover:bg-primary/10' : 'border-white text-white hover:bg-white/10', 'transition-colors')}
                            asChild
                        >
                            <Link href={link.href}>{link.name}</Link>
                        </Button>
                    )
                }
                return (
                   <Button
                    key={link.name}
                    variant="ghost"
                    className={cn(linkColorClass, hoverBgClass)}
                    asChild
                  >
                    <Link href={link.href}>
                      {link.name}
                    </Link>
                  </Button>
                )
             })}
          </div>

          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className={linkColorClass}>
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background w-full">
                <div className="flex flex-col h-full p-4">
                  <div className="flex justify-between items-center mb-8">
                     <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                        <AmexLogo className="text-foreground" />
                     </Link>
                     <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                        <X className="h-6 w-6" />
                        <span className="sr-only">Close menu</span>
                     </Button>
                  </div>
                  <div className="flex flex-col space-y-4">
                    {allNavLinks.map((link) => (
                       <Button
                        key={link.name}
                        variant={'ghost'}
                        className="justify-start text-lg p-4 h-auto"
                        asChild
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Link href={link.href}>
                           {link.name}
                        </Link>
                      </Button>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
