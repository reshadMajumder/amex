
"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { Truck, Plane, Network, Waypoints, Building2 } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const stats = [
    { 
        id: "vehicles",
        value: "120,000+", 
        label: "Service Vehicles", 
        icon: Truck,
        imageId: "stat-vehicles"
    },
    { 
        id: "routes",
        value: "2,500+", 
        label: "Number of Routes", 
        icon: Waypoints,
        imageId: "stat-routes"
    },
    { 
        id: "aircraft",
        value: "117", 
        label: "All-cargo Aircraft", 
        icon: Plane,
        imageId: "stat-aircraft"
    },
    { 
        id: "flights",
        value: "2,000+", 
        label: "Flights per day", 
        icon: Network,
        imageId: "stat-flights"
    },
    { 
        id: "points",
        value: "200,000+", 
        label: "Service points", 
        icon: Building2,
        imageId: "stat-points"
    },
];

export function BusinessStrength() {
    const [hoveredStat, setHoveredStat] = useState<string | null>(stats[0].id);

    return (
        <section className="bg-[#1a1a1a] text-white py-20 relative overflow-hidden">
            <div className="absolute inset-0">
                {stats.map(stat => {
                    const bgImage = PlaceHolderImages.find((img) => img.id === stat.imageId);
                    return bgImage ? (
                        <Image
                            key={stat.id}
                            src={bgImage.imageUrl}
                            alt={bgImage.description}
                            fill
                            className={cn(
                                "object-cover transition-opacity duration-500 ease-in-out",
                                hoveredStat === stat.id ? "opacity-30" : "opacity-0"
                            )}
                            data-ai-hint={bgImage.imageHint}
                        />
                    ) : null;
                })}
                <div className="absolute inset-0 bg-black/60"></div>
            </div>
            
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-semibold mb-2">Business Strength</h2>
                    <p className="text-gray-400">We deliver as promised</p>
                </div>
                
                <div 
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-white/10 rounded-xl overflow-hidden"
                    onMouseLeave={() => setHoveredStat(null)}
                >
                    {stats.map(stat => (
                        <div
                            key={stat.id}
                            onMouseEnter={() => setHoveredStat(stat.id)}
                            className={cn(
                                "p-8 flex flex-col items-center justify-center text-center transition-all duration-300 cursor-pointer bg-white/5",
                                hoveredStat === stat.id ? "bg-white/10 scale-105" : "hover:bg-white/10"
                            )}
                        >
                            <stat.icon className={cn(
                                "w-10 h-10 mb-4 transition-colors duration-300",
                                hoveredStat === stat.id ? "text-red-500" : "text-gray-400"
                            )} />
                            <p className={cn(
                                "text-4xl font-bold transition-colors duration-300",
                                hoveredStat === stat.id ? "text-red-500" : "text-white"
                            )}>
                                {stat.value}
                            </p>
                            <p className="text-gray-300 mt-1">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
