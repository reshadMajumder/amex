
import Link from "next/link";
import { MessageCircle, Phone, Headphones, HeartHandshake } from "lucide-react";
import Image from "next/image";
import { AmexLogo } from "./icons/amex-logo";

const footerLinks = [
    {
        title: "Express Delivery",
        links: ["Instant Delivery", "Express Service", "Freight Service", "Cold Chain Service", "Pharmaceutical Service", "International Service"]
    },
    {
        title: "Service & Support",
        links: ["Shipping", "Track", "Service inquiry", "Membership Privileges"]
    },
    {
        title: "Sustainability",
        links: ["Governance", "Zero Carbon Future", "Talents & Partnership", "Social Care", "Reports and Policies"]
    },
    {
        title: "Investor Relations",
        links: ["Overview", "Announcements", "Periodical Reports", "Stock Information", "Earnings Results", "Corporate Governance", "IR Contact"]
    },
    {
        title: "About",
        links: ["About Amex", "News", "Service Notice", "Career", "Group Procurement", "Cooperation Inquiry", "I want to report"]
    }
];

export function Footer() {
    return (
        <footer className="bg-black text-gray-300 pt-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
                    <div className="md:col-span-1">
                        <AmexLogo className="text-white" />
                        <p className="text-sm mt-4">We deliver as promised</p>
                    </div>

                    {footerLinks.map((column) => (
                        <div key={column.title}>
                            <h3 className="text-white font-semibold flex items-center">
                               <span className="h-1.5 w-1.5 bg-red-500 rounded-full mr-2"></span> 
                               {column.title}
                            </h3>
                            <ul className="mt-4 space-y-3">
                                {column.links.map(link => (
                                    <li key={link}>
                                        <Link href="#" className="text-sm text-gray-400 hover:text-white hover:underline">
                                            {link}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <hr className="border-gray-800 my-10" />

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div className="flex items-center gap-4">
                       <p className="text-white">Contact Us Now</p>
                       <div className="flex items-center gap-3">
                           <Link href="#" className="text-gray-400 hover:text-white"><MessageCircle className="h-6 w-6" /></Link>
                           <Link href="#" className="text-gray-400 hover:text-white"><Phone className="h-6 w-6" /></Link>
                           <Link href="#" className="text-gray-400 hover:text-white"><Headphones className="h-6 w-6" /></Link>
                           <Link href="#" className="text-gray-400 hover:text-white"><HeartHandshake className="h-6 w-6" /></Link>
                       </div>
                    </div>
                </div>
            </div>
            
            <div className="bg-[#111111] mt-10 py-4">
                <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                    <div className="flex flex-wrap gap-x-4 gap-y-2">
                        <Link href="#" className="hover:text-white">Terms of Use</Link>
                        <Link href="#" className="hover:text-white">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white">Service Clause</Link>
                        <Link href="#" className="hover:text-white">Brand materials</Link>
                    </div>
                     <div className="flex flex-col md:flex-row items-center gap-4 mt-4 md:mt-0">
                        <p>Copyright © 2024 Amex International Logistics. All rights reserved</p>
                        <div className="flex items-center gap-2">
                            <Image src="https://placehold.co/80x30/333/fff?text=Cert1" alt="Certification 1" width={80} height={30} />
                            <Image src="https://placehold.co/80x30/333/fff?text=Cert2" alt="Certification 2" width={80} height={30} />
                            <Image src="https://placehold.co/30x30/333/fff?text=C3" alt="Certification 3" width={30} height={30} />
                            <Image src="https://placehold.co/30x30/333/fff?text=C4" alt="Certification 4" width={30} height={30} />
                             <Image src="https://placehold.co/30x30/333/fff?text=C5" alt="Certification 5" width={30} height={30} />
                        </div>
                    </div>
                </div>
            </div>

        </footer>
    );
}
