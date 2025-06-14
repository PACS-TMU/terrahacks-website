"use client";
import Image from 'next/image';
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from 'next/link';

export default function NavbarLogo() {
    const [imageUrl, setImageUrl] = useState(""); // Remove <string> type annotation

    useEffect(() => {
        const supabase = createClient();

        // Get the team image URL
        const imageData = supabase.storage
            .from("main")
            .getPublicUrl("square_logo.png");
        setImageUrl(imageData.data.publicUrl);
    }, []);

    return (
        <button
            aria-label='TerraHacks Logo Button - Redirects to Home'
            onClick={() => {
                if (document.scrollingElement) {
                    document.scrollingElement.scrollTo({ top: 0, behavior: "smooth" });
                }
            }}
            className='self-start group'
        >
            {imageUrl && (
                <Link href="/" className="hidden lg:block hover:animate-spin-slow">
                    <Image
                        src={imageUrl}
                        alt="TerraHacks Logo - Redirects to Home"
                        width={1000}
                        height={1000}
                        priority={true}
                        className="w-10 h-10 lg:w-16 lg:h-16 2xl:w-18 2xl:h-18"
                    />
                </Link>
            )}
        </button>
    )
}