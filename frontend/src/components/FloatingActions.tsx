
"use client";

import { Button } from "@/components/ui/button";
import { Phone, Briefcase, ArrowUp } from "lucide-react";
import { useState, useEffect } from 'react';

export function FloatingActions() {
    const [isVisible, setIsVisible] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);

        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    return (
        <div className="fixed top-1/2 -translate-y-1/2 right-0 z-40 hidden md:block">
            <div className="flex flex-col items-center gap-px overflow-hidden rounded-l-lg bg-white/50 border border-r-0 border-gray-200 shadow-lg backdrop-blur-sm">
                <Button variant="ghost" className="bg-transparent hover:bg-white/80 rounded-none flex flex-col items-center justify-center h-24 w-24 p-2 text-xs font-medium">
                    <Phone className="h-6 w-6 text-gray-700 mb-1" />
                    <span className="text-center whitespace-pre-wrap leading-tight text-gray-600">Online Customer Service</span>
                </Button>
                <div className="w-full h-px bg-gray-200"></div>
                <Button variant="ghost" className="bg-transparent hover:bg-white/80 rounded-none flex flex-col items-center justify-center h-24 w-24 p-2 text-xs font-medium">
                    <Briefcase className="h-6 w-6 text-gray-700 mb-1" />
                    <span className="text-center whitespace-pre-wrap leading-tight text-gray-600">Cooperation Inquiry</span>
                </Button>
                 {isVisible && (
                    <>
                        <div className="w-full h-px bg-gray-200"></div>
                        <Button onClick={scrollToTop} variant="ghost" className="bg-transparent hover:bg-white/80 rounded-none flex flex-col items-center justify-center h-24 w-24 p-2 text-xs font-medium">
                            <ArrowUp className="h-6 w-6 text-gray-700 mb-1" />
                            <span className="text-center whitespace-pre-wrap leading-tight text-gray-600">Top</span>
                        </Button>
                    </>
                )}
            </div>
        </div>
    )
}
