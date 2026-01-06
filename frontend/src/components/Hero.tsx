
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function Hero() {
  const bgImage = PlaceHolderImages.find((img) => img.id === "hero-background");

  return (
    <section className="relative h-[90vh] w-full overflow-hidden bg-black">
      {bgImage && (
        <Image
          src={bgImage.imageUrl}
          alt={bgImage.description}
          fill
          priority
          className="object-cover"
          data-ai-hint={bgImage.imageHint}
        />
      )}
    </section>
  );
}
