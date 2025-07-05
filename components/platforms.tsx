import Image from "next/image";

export default function Platforms({
  imageUrl,
  moleImageUrl,
  position = "left",
  alt = "Decorative platforms image",
  customMoleClasses = ""
}: {
  imageUrl: string;
  moleImageUrl?: string;
  position?: "left" | "right";
  alt?: string;
  customMoleClasses?: string;
}) {
  if (!imageUrl) return null;

  const molePositionClasses = position === "left" 
    ? "left-[15%]" 
    : "right-[15%]";

  const finalMoleClasses = customMoleClasses || `absolute top-[20%] ${molePositionClasses} z-10 w-[12%] h-auto`;

  return (
    <div className="relative w-full overflow-hidden mt-8">
      <Image
        src={imageUrl}
        alt={alt}
        width={1920}
        height={1080}
        priority={true}
        className="w-full h-auto transition-opacity duration-1000"
      />
      {moleImageUrl && (
        <Image
          src={moleImageUrl}
          alt="Mole character"
          width={200}
          height={200}
          className={finalMoleClasses}
        />
      )}
    </div>
  );
}
