
"use client";
import { useState } from "react";
import {
  Smartphone,
  UtensilsCrossed,
  Home,
  Watch,
  ShoppingCart,
  HeartPulse,
  Recycle,
  Car,
  Landmark,
  Briefcase,
  ChevronRight
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Link from "next/link";
import { Card } from "@/components/ui/card";

const solutions = [
  {
    id: "telecom",
    title: "Telecommunications & High-Tech",
    icon: Smartphone,
    description: "End-to-end supply chain solutions for the fast-paced tech industry, ensuring secure and timely delivery of high-value electronics.",
    imageId: "supply-chain-telecom"
  },
  {
    id: "fresh-food",
    title: "Fresh Food",
    icon: UtensilsCrossed,
    description: "Relying on strong transportation networks, high-quality warehousing service, multiple warehouse management systems, professional temperature control technologies, and advanced system management, we provide...",
    imageId: "supply-chain-fresh-food"
  },
  {
    id: "household",
    title: "Household Appliances",
    icon: Home,
    description: "Integrated logistics for large and small household appliances, from warehousing and distribution to final-mile delivery and installation.",
    imageId: "supply-chain-household"
  },
  {
    id: "garment",
    title: "Garment, Headwear and Shoes",
    icon: Watch,
    description: "Flexible and agile supply chain services for the fashion industry, supporting everything from raw material sourcing to retail distribution.",
    imageId: "supply-chain-garment"
  },
  {
    id: "consumer",
    title: "Consumer Goods",
    icon: ShoppingCart,
    description: "Comprehensive solutions for the FMCG sector, optimizing inventory management and ensuring products reach shelves efficiently.",
    imageId: "supply-chain-consumer"
  },
  {
    id: "health",
    title: "Health Care",
    icon: HeartPulse,
    description: "Specialized, compliant logistics for pharmaceuticals and medical devices, with strict temperature control and handling protocols.",
    imageId: "supply-chain-health"
  },
  {
    id: "ecommerce",
    title: "E-commerce and Circulation",
    icon: Recycle,
    description: "Scalable fulfillment and distribution services tailored for e-commerce businesses, including warehousing, order processing, and returns management.",
    imageId: "supply-chain-ecommerce"
  },
  {
    id: "auto",
    title: "Automobile",
    icon: Car,
    description: "Dedicated automotive logistics for parts and finished vehicles, ensuring just-in-time delivery and streamlined assembly line feeding.",
    imageId: "supply-chain-auto"
  },
  {
    id: "finance",
    title: "Finance and Insurance",
    icon: Landmark,
    description: "Secure and confidential logistics for sensitive documents, cards, and materials for the financial and insurance industries.",
    imageId: "supply-chain-finance"
  },
  {
    id: "gov",
    title: "Government and Enterprise Services",
    icon: Briefcase,
    description: "Tailored logistics and supply chain solutions for public sector and large corporate projects, ensuring reliability and security.",
    imageId: "supply-chain-gov"
  },
];

export function SupplyChainSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(solutions[1].id);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">
          Industry-specific Supply Chain Solutions
        </h2>

        {/* Mobile View */}
        <div className="grid grid-cols-2 gap-4 md:hidden">
          {solutions.map((solution) => {
            const bgImage = PlaceHolderImages.find((img) => img.id === solution.imageId);
            return (
              <Link href="#" key={solution.id}>
                <Card className="relative rounded-lg shadow-md overflow-hidden h-32 group">
                   {bgImage && (
                    <Image
                      src={bgImage.imageUrl}
                      alt={bgImage.description}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint={bgImage.imageHint}
                    />
                  )}
                  <div className="absolute inset-0 bg-black/50"></div>
                  <div className="relative z-10 flex flex-col justify-end h-full p-3 text-white">
                     <solution.icon className="h-6 w-6 mb-2" />
                    <h3 className="font-semibold text-sm leading-tight">{solution.title}</h3>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
        
        {/* Desktop View */}
        <div className="hidden md:block relative rounded-2xl shadow-lg overflow-hidden h-[65vh] bg-gray-800">
          <div className="absolute inset-0">
            {solutions.map((solution) => {
              const bgImage = PlaceHolderImages.find((img) => img.id === solution.imageId);
              return bgImage ? (
                <Image
                  key={solution.id}
                  src={bgImage.imageUrl}
                  alt={bgImage.description}
                  fill
                  className={cn(
                    "object-cover transition-opacity duration-500 ease-in-out",
                    hoveredId === solution.id ? "opacity-100" : "opacity-0"
                  )}
                  data-ai-hint={bgImage.imageHint}
                />
              ) : null;
            })}
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          </div>
          
          <div className="relative z-10 grid grid-cols-5 h-full">
            {solutions.map((solution) => (
              <Link
                href="#"
                key={solution.id}
                onMouseEnter={() => setHoveredId(solution.id)}
                className={cn(
                  "relative p-6 flex flex-col justify-end items-center text-white border-r border-b border-white/10 cursor-pointer transition-all duration-300 ease-in-out group text-center",
                )}
              >
                <div className="flex flex-col items-center gap-4 w-full">
                  <solution.icon className={cn("h-8 w-8 shrink-0 transition-all", hoveredId === solution.id ? 'h-10 w-10 text-accent' : 'text-white')} />
                  <h3 className={cn("font-semibold text-base transition-all", hoveredId === solution.id ? 'text-lg text-accent' : '')}>{solution.title}</h3>
                </div>
                
                <div 
                  className={cn(
                    "transition-all duration-300 ease-in-out overflow-hidden max-h-0 opacity-0",
                    {"max-h-40 opacity-100 mt-4": hoveredId === solution.id}
                  )}
                >
                  <p className="text-white/90 text-sm mb-4">
                    {solution.description}
                  </p>
                   <div className="flex items-center justify-center gap-2 text-sm font-semibold text-accent hover:text-accent/80">
                    View More <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
                <div className={cn("absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors", {"bg-black/50": hoveredId === solution.id})}></div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
