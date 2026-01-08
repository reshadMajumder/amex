
"use client";

import Image from "next/image";
import Link from "next/link";
import { Award, Globe, Cpu, Users } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const whyChooseUsCards = [
    {
        id: "reliability",
        title: "Unmatched Reliability",
        subtitle: "99.8% on-time delivery rate",
        icon: Award,
        imageId: "why-reliability",
        className: "col-span-2 row-span-2",
        imgClassName: "object-cover"
    },
    {
        id: "technology",
        title: "Advanced Technology",
        subtitle: "Real-time tracking and optimization",
        icon: Cpu,
        imageId: "why-technology",
        className: "col-span-3 row-span-1",
        imgClassName: "object-cover"
    },
    {
        id: "customer-service",
        title: "Dedicated Support",
        subtitle: "24/7 customer service",
        icon: Users,
        imageId: "why-support",
        className: "col-span-1 row-span-1",
        imgClassName: "object-cover"
    },
    {
        id: "global-reach",
        title: "Global Reach",
        subtitle: "Connecting over 200 countries",
        icon: Globe,
        imageId: "why-global",
        className: "col-span-2 row-span-1 bg-primary text-white",
        imgClassName: "object-cover"
    }
];


export function WhyChooseUsSection() {
    return (
        <section className="py-20 bg-[#f7f7f7]">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="pr-8">
                        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Why Choose Amex</h2>
                        <p className="text-gray-600 leading-relaxed">
                            We are more than just a logistics company. We are a team of experts dedicated to providing you with the most reliable, efficient, and technologically advanced solutions for your shipping needs. Our commitment to excellence ensures your promises are delivered.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-3 grid-rows-2 gap-6 h-[60vh]">
                        {whyChooseUsCards.map(card => {
                            const cardImage = PlaceHolderImages.find(img => img.id === card.imageId);
                            return (
                                <Card key={card.id} className={cn("relative overflow-hidden group transform hover:-translate-y-2 transition-transform duration-300 shadow-lg hover:shadow-2xl", card.className)}>
                                    {cardImage && (
                                        <Image 
                                            src={cardImage.imageUrl} 
                                            alt={cardImage.description} 
                                            fill 
                                            className={cn("absolute inset-0 w-full h-full transition-transform duration-500 group-hover:scale-110", card.imgClassName)} 
                                            data-ai-hint={cardImage.imageHint}
                                        />
                                    )}
                                    <div className={cn("absolute inset-0 w-full h-full", card.id === 'global-reach' ? "bg-primary/60" : "bg-black/40")}></div>

                                    <div className="relative flex flex-col justify-between h-full p-6">
                                        <div className="flex justify-end">
                                            <card.icon className="w-6 h-6 text-white/80" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white">{card.title}</h3>
                                            <p className="text-white/90 text-sm">{card.subtitle}</p>
                                        </div>
                                    </div>
                                    <Link href="#" className="absolute inset-0" aria-label={card.title}></Link>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}
