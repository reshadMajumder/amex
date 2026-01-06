import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const trackingLinks = [
  { name: "Ship Now", href: "#" },
  { name: "Service Outlets", href: "#" },
  { name: "Rates & Transit Time", href: "#" },
  { name: "Service Coverage", href: "#" },
];

export function TrackingBar() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 -translate-y-1/2">
      <div className="bg-black/80 backdrop-blur-sm rounded-full p-2 md:p-3 shadow-2xl flex items-center gap-4">
        <div className="flex items-center flex-1">
          <Input
            type="text"
            placeholder="Enter your tracking number(s)"
            className="bg-transparent border-0 text-white placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 w-full !text-sm md:!text-base pl-4"
          />
          <Button
            type="submit"
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold rounded-full px-6 -ml-16 shrink-0"
          >
            Track
          </Button>
        </div>
        <Separator orientation="vertical" className="hidden md:block h-6 bg-gray-600" />
        <nav className="hidden md:flex items-center gap-x-4">
            <div className="flex items-center gap-x-4">
                <Link href="#" className="text-gray-300 hover:text-white transition-colors text-xs whitespace-nowrap">Ship Now</Link>
                <Link href="#" className="text-gray-300 hover:text-white transition-colors text-xs whitespace-nowrap">Service Outlets</Link>
                <Link href="#" className="text-gray-300 hover:text-white transition-colors text-xs whitespace-nowrap">Rates & Transit Time</Link>
            </div>
            <div className="flex items-center">
                 <Link href="#" className="text-gray-300 hover:text-white transition-colors text-xs whitespace-nowrap">Service Coverage</Link>
            </div>
        </nav>
      </div>
    </div>
  );
}
