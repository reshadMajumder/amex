
"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ChevronRight, Box, Truck, Package, Thermometer, Pill, Globe, Building, Warehouse, Cpu, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


const individualServicesGrid = [
  {
    icon: Box,
    title: "SF Rush",
    description: ["Dedicated Courier", "Delivery Within Hours"],
    consult: false,
  },
  {
    icon: Truck,
    title: "Express Delivery",
    description: ["Short Transit Time", "Worry-free Delivery", "Warm and Caring"],
    consult: false,
  },
  {
    icon: Package,
    title: "Large Item Shipping",
    description: ["Over 20kg", "Stable Transit Time", "Delivery Upstairs/Installation"],
    consult: false,
  },
  {
    icon: Thermometer,
    title: "Cold Chain Shipping",
    description: ["Food Temperature Control", "Whole Process Cold Chain"],
    consult: false,
  },
  {
    icon: Pill,
    title: "Pharmaceutical Shipping",
    description: ["Precise Temperature Control", "GSP Certified"],
    consult: false,
  },
  {
    icon: Globe,
    title: "International Shipping",
    description: ["Stable Transit Time", "Effective Customs Clearance"],
    consult: false,
  },
];

const enterpriseServicesGrid = [
    {
        icon: Building,
        title: "Logistics Services",
        description: "Provide warm and caring high-quality door-to-door integrated logistics service with short transit time, worry-free delivery, satisfying diversified demands of enterprises and individuals",
        subServices: [
            "Express Delivery Services",
            "Large Item Services",
            "Cold Chain Services",
            "Pharmaceutical Services",
            "International Services",
        ]
    },
    {
        icon: Warehouse,
        title: "Warehousing Services",
        description: "Provide professional integrated warehousing and distribution services for e-commerce, pharmaceutical, cold chain and overseas customers based on strong transportation network, highly efficient operation capability and intelligent system support",
        subServices: [
            "E-commerce Warehouse",
            "Cold Chain Warehouse",
            "Pharmaceutical Warehouse",
            "Overseas Warehouse",
        ]
    },
    {
        icon: Cpu,
        title: "Technology Services",
        description: "Based on the unique features of various industry scenarios, conduct digital intelligence transformation across the entire supply chain—from production to sales—through the use of smart supply chain products, smart express delivery products, etc.",
        subServices: [
            "Smart Express Delivery Software",
            "Smart Life Software",
            "Smart Business Software",
            "Smart Supply Chain Software",
            "Smart Hardware",
        ]
    }
];

export function ServicesSection() {
    const individualBg = PlaceHolderImages.find((img) => img.id === "hero-person");
    const enterpriseBg = PlaceHolderImages.find((img) => img.id === "enterprise-bg");
    const [hoveredCard, setHoveredCard] = useState<"individual" | "enterprise" | null>(null);
    const [flippedCard, setFlippedCard] = useState<string | null>(null);

    const toggleFlip = (title: string) => {
        setFlippedCard(flippedCard === title ? null : title);
    };

  return (
    <section className="py-20 bg-gray-50/50">
      <div className="container mx-auto px-4">
        <div className="md:hidden">
            <Tabs defaultValue="individual" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-transparent p-0 mb-6">
                    <TabsTrigger value="individual" className="text-lg font-semibold data-[state=active]:text-red-600 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-red-600 rounded-none">Individual Services</TabsTrigger>
                    <TabsTrigger value="enterprise" className="text-lg font-semibold data-[state=active]:text-red-600 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-red-600 rounded-none">Enterprise Services</TabsTrigger>
                </TabsList>
                <TabsContent value="individual">
                    <div className="grid grid-cols-2 gap-4">
                        {individualServicesGrid.map((service) => (
                            <Card key={service.title} className="p-4">
                                <CardContent className="p-0 flex flex-col h-full">
                                    <h4 className="font-bold text-base mb-2">{service.title}</h4>
                                    <div className="text-xs text-gray-500 space-y-1 flex-grow">
                                        {service.description.map(d => <p key={d}>{d}</p>)}
                                    </div>
                                    <Link href="#" className="text-red-600 text-sm flex items-center mt-4 font-semibold">
                                       <div className="bg-red-600 rounded-full w-4 h-4 flex items-center justify-center mr-1">
                                            <ChevronRight className="w-3 h-3 text-white" />
                                       </div>
                                      More
                                    </Link>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="enterprise">
                     <div className="grid grid-cols-1 gap-4">
                        {enterpriseServicesGrid.map(service => (
                             <Card key={service.title} className="p-4">
                                <CardContent className="p-0">
                                    <div className="flex items-center gap-2 mb-3">
                                        <service.icon className="w-6 h-6 text-red-600" />
                                        <h4 className="font-bold text-base">{service.title}</h4>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                                    <Link href="#" className="text-red-600 text-sm flex items-center mt-4 font-semibold">
                                       <div className="bg-red-600 rounded-full w-4 h-4 flex items-center justify-center mr-1">
                                            <ChevronRight className="w-3 h-3 text-white" />
                                       </div>
                                      More
                                    </Link>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>

        <div className="hidden md:block">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">Integrated Logistics Supply Chain Service</h2>
            <div 
              className={cn(
                "grid grid-cols-1 md:grid-cols-2 gap-8 items-start transition-all duration-300",
                hoveredCard === 'individual' && 'md:grid-cols-[2fr_1fr]',
                hoveredCard === 'enterprise' && 'md:grid-cols-[1fr_2fr]'
              )}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Card 
                className={cn(
                  "rounded-2xl shadow-lg overflow-hidden bg-white group transition-all duration-500 ease-in-out",
                )}
                onMouseEnter={() => setHoveredCard('individual')}
              >
                <div className="relative h-auto md:h-[32rem] p-8 flex flex-col justify-start">
                    <div className="absolute inset-0">
                        {individualBg && 
                            <Image 
                                src={individualBg.imageUrl}
                                alt="Individual Services"
                                fill
                                className="object-cover"
                                style={{ objectPosition: 'right 30% top 40%'}}
                                data-ai-hint="delivery person"
                            />
                        }
                        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent"></div>
                    </div>
                    
                    <div className="relative z-10 w-full h-full">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">
                            Individual Services
                            <div className="w-10 h-0.5 bg-red-600 mt-2"></div>
                        </h3>

                        <div className="relative w-full h-[calc(100%-4rem)]">
                            {/* List View */}
                             <div className={cn("transition-opacity duration-300 md:group-hover:opacity-0 md:group-hover:-z-10")}>
                               <ul className="space-y-3 mt-4">
                                    {individualServicesGrid.map((service) => (
                                        <li key={service.title} className="flex items-center">
                                            <span className="h-2 w-2 bg-red-500 rounded-full mr-3"></span>
                                            <span className="text-gray-700">{service.title}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Grid View on Hover */}
                             <div className={cn("absolute inset-0 transition-opacity duration-300 opacity-0 -z-10 md:group-hover:opacity-100 md:group-hover:z-10")}>
                                <div className="p-1 grid grid-cols-2 lg:grid-cols-3 gap-4">
                                  {individualServicesGrid.map((service) => (
                                    <div key={service.title} className="p-3 rounded-lg border border-gray-200 bg-white/70 hover:shadow-md transition-shadow flex flex-col h-full">
                                      <div className="flex justify-between items-center mb-2">
                                        <div className="flex items-center gap-2">
                                          <service.icon className="w-5 h-5 text-red-600" />
                                          <h4 className="font-bold text-sm">{service.title}</h4>
                                        </div>
                                        <Link href="#" className="text-red-600 text-xs flex items-center">
                                          <ChevronRight className="w-3 h-3" />
                                        </Link>
                                      </div>
                                      <div className="text-xs text-gray-500 mb-3 space-y-1 flex-grow">
                                          {service.description.map(d => <p key={d}>{d}</p>)}
                                      </div>
                                      {service.consult && (
                                        <Button variant="outline" className="w-full h-7 text-xs text-red-600 border-red-600 hover:bg-red-50 hover:text-red-700 mt-auto">
                                          Consult
                                        </Button>
                                      )}
                                    </div>
                                  ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              </Card>

              <Card className={cn(
                  "rounded-2xl shadow-lg overflow-hidden bg-white group transition-all duration-500 ease-in-out",
                )}
                onMouseEnter={() => setHoveredCard('enterprise')}
                >
                 <div className="relative h-auto md:h-[32rem] flex flex-col justify-start">
                     <div className={cn("absolute inset-0 transition-opacity duration-500 opacity-0 md:group-hover:opacity-100")}>
                        <div className="relative h-28 bg-gray-800 rounded-t-2xl p-8 text-white overflow-hidden">
                            <Image src="https://www-static.sf-express.com/ssr2_blue/_next/static/media/business-expand-main.8872f5d4.png" alt="Enterprise services background" fill className="object-cover object-center" />
                            <div className="absolute inset-0 bg-black/30"></div>
                            <h3 className="relative z-10 text-2xl font-bold">Enterprise Services</h3>
                            <div className="relative z-10 w-10 h-0.5 bg-white/80 mt-2"></div>
                        </div>
                     </div>

                    {enterpriseBg && 
                        <Image 
                            src={enterpriseBg.imageUrl}
                            alt="Enterprise Services"
                            fill
                            className="object-cover rounded-2xl md:group-hover:opacity-0"
                             style={{ objectPosition: 'right 20% bottom 50%'}}
                            data-ai-hint="warehouse robot"
                        />
                    }
                    
                    <div className={cn("absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent md:group-hover:opacity-0")}></div>
                     <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent"></div>

                    <div className="relative z-10 p-8 h-full">
                        <div className={cn('md:group-hover:pt-28')}>
                            <div className={cn('md:group-hover:opacity-0 md:group-hover:-z-10 transition-opacity')}>
                                <div className="relative">
                                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                        Enterprise Services
                                        <div className="w-10 h-0.5 bg-red-600 mt-2"></div>
                                    </h3>
                                    <ul className="space-y-3 mt-4">
                                        {enterpriseServicesGrid.map((service) => (
                                            <li key={service.title} className="flex items-center">
                                                <span className="h-2 w-2 bg-red-500 rounded-full mr-3"></span>
                                                <span className="text-gray-700">{service.title}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                         <div className={cn("absolute inset-0 top-28 p-8 transition-opacity duration-300 opacity-0 -z-10 md:group-hover:opacity-100 md:group-hover:z-10")}>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
                                {enterpriseServicesGrid.map(service => (
                                    <div key={service.title} className="perspective">
                                        <div className={cn(
                                            "relative preserve-3d w-full h-full transition-transform duration-700",
                                            flippedCard === service.title ? 'rotate-y-180' : ''
                                        )}>
                                            {/* Front of the card */}
                                            <div className="absolute w-full h-full backface-hidden bg-white rounded-lg p-4 border border-gray-100 flex flex-col">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <service.icon className="w-6 h-6 text-red-600" />
                                                    <h4 className="font-bold text-base">{service.title}</h4>
                                                </div>
                                                <p className="text-xs text-gray-600 mb-4 flex-grow">{service.description}</p>
                                                
                                                <button onClick={() => toggleFlip(service.title)} className="text-xs text-red-600 hover:underline flex items-center gap-1 mb-3 self-start">
                                                    Learn More <ChevronRight className="w-4 h-4" />
                                                </button>
                                                <Button variant="outline" className="w-full h-8 text-xs text-red-600 border-red-600 hover:bg-red-50 hover:text-red-700 mt-auto">
                                                  Consult Now
                                                </Button>
                                            </div>

                                            {/* Back of the card */}
                                            <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-red-600 text-white rounded-lg p-4 border border-gray-100 flex flex-col">
                                                <button onClick={() => toggleFlip(service.title)} className="text-xs text-white hover:underline flex items-center gap-1 mb-3 self-start">
                                                    <ChevronLeft className="w-4 h-4" /> Back
                                                </button>
                                                <h4 className="font-bold text-base mb-3">{service.title}</h4>
                                                <div className="border-t border-white/30 pt-3 space-y-2 flex-grow">
                                                    {service.subServices.map(sub => (
                                                        <p key={sub} className="text-xs text-white/90">{sub}</p>
                                                    ))}
                                                </div>
                                                 <Button variant="outline" className="w-full h-8 text-xs text-white border-white hover:bg-white/20 hover:text-white mt-auto">
                                                  Consult Now
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
              </Card>
            </div>
        </div>
      </div>
    </section>
  );
}
