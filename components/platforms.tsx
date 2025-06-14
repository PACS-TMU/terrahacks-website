import Image from "next/image";

export default function Platforms({
  imageUrl,
  alt = "Decorative platforms image"
}: {
  imageUrl: string;
  alt?: string;
}) {
  if (!imageUrl) return null;

  return (
    <div className="relative w-full overflow-hidden mt-8">
      <Image
        src={imageUrl}
        alt={alt}
        width={1920}
        height={1080}
        className="w-full h-auto transition-opacity duration-1000"
      />
    </div>
  );
}
