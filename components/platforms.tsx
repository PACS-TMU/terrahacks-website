import Image from "next/image";

export default function Platforms({
    beforeImageUrl,
    afterImageUrl,
    showAfterImage,
    ref,
    alt = "Decorative platforms image"
}: {
    beforeImageUrl: string;
    afterImageUrl: string;
    showAfterImage: boolean;
    ref: React.Ref<HTMLDivElement>;
    alt?: string;
}) {
    return (
        <div ref={ref} className="relative w-full overflow-hidden mt-8">
            {beforeImageUrl && (
                <Image
                    src={beforeImageUrl}
                    alt={alt}
                    width={1920}
                    height={1080}
                    className={`w-full h-auto transition-opacity duration-1000 ${showAfterImage ? "opacity-0" : "opacity-100"
                        }`}
                />
            )}
            {afterImageUrl && (
                <Image
                    src={afterImageUrl}
                    alt={alt}
                    width={1920}
                    height={1080}
                    className={`w-full h-auto absolute top-0 left-0 transition-opacity duration-1000 ${showAfterImage ? "opacity-100" : "opacity-0"
                        }`}
                />
            )}
        </div>
    );
}
