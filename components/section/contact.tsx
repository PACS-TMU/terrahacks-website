"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { FaRegEnvelope, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { RiDiscordLine, RiTiktokLine } from "react-icons/ri";
import { SiLinktree } from "react-icons/si";

export default function Contact() {
    const supabase = createClient();
    const [beforeImageUrl, setBeforeImageUrl] = useState<string>("");
    const [afterImageUrl, setAfterImageUrl] = useState<string>("");
    const [showAfterImage, setShowAfterImage] = useState(false);
    const [copied, setCopied] = useState(false);
    const imageContainerRef = useRef<HTMLDivElement>(null);
    const hasTriggeredRef = useRef(false);

    const handleCopy = () => {
        navigator.clipboard
            .writeText("contact@terrahacks.ca")
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            })
            .catch((err) => {
                console.error("Failed to copy: ", err);
            });
    };

    useEffect(() => {
        const beforeData = supabase.storage
            .from("main")
            .getPublicUrl("contact_before.png");
        setBeforeImageUrl(beforeData.data.publicUrl);

        const afterData = supabase.storage
            .from("main")
            .getPublicUrl("contact_after.png");
        setAfterImageUrl(afterData.data.publicUrl);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasTriggeredRef.current) {
                        hasTriggeredRef.current = true;
                        setShowAfterImage(true);
                    }
                });
            },
            {
                threshold: 0.9,
                rootMargin: "0px",
            }
        );

        if (imageContainerRef.current) {
            observer.observe(imageContainerRef.current);
        }

        return () => {
            if (imageContainerRef.current) {
                observer.unobserve(imageContainerRef.current);
            }
        };
    }, []);

    return (
        <section id="contact" className="main min-h-screen flex flex-col py-16 md:py-24 items-end">
            {/* Header */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 text-right">
                CONTACT US
            </h2>

            {/* Content */}
            <div className="max-w-4xl text-right mb-12">

                {/* Reach Out Box */}
                <div className="bg-gray-100 border border-gray-300 rounded-lg px-6 py-6 md:px-10 md:py-8 shadow-md text-left">
                    <p className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-800 font-medium mb-4 leading-relaxed">
                        Reach out to{" "}
                        <span
                            onClick={handleCopy}
                            className="font-semibold underline text-blue-600 hover:text-blue-400 cursor-pointer transition"
                        >
                            contact@terrahacks.ca
                        </span>
                        <span className="hidden md:inline"> for any help or support</span>, and{" "}
                        <span className="hidden md:inline">please be sure to </span>
                        join the <span className="font-semibold">TerraHacks Discord</span> community!
                    </p>

                    {/* Toast Feedback */}
                    <div
                        className={`text-sm px-4 py-2 rounded-md bg-green-600 text-white shadow transition-opacity duration-500 mb-4 ${copied ? "opacity-100" : "opacity-0"
                            }`}
                    >
                        Email copied to clipboard!
                    </div>

                    {/* Social Icons */}
                    <div className="flex justify-evenly flex-wrap gap-6 mt-4 text-gray-700">
                        <a aria-label="Email" href="mailto:contact@terrahacks.ca" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 duration-300 transition">
                            <FaRegEnvelope className="w-6 h-6 md:w-8 md:h-8 lg:w-12 lg:h-12" />
                        </a>
                        <a aria-label="Instagram" href="https://www.instagram.com/terrahacks.tmu" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition">
                            <FaInstagram className="w-6 h-6 md:w-8 md:h-8 lg:w-12 lg:h-12" />
                        </a>
                        <a aria-label="Discord" href="https://discord.gg/982AkBQea7" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-500 duration-300 transition">
                            <RiDiscordLine className="w-6 h-6 md:w-8 md:h-8 lg:w-12 lg:h-12" />
                        </a>
                        <a aria-label="LinkedIn" href="https://www.linkedin.com/company/terrahacks" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 duration-300 transition">
                            <FaLinkedinIn className="w-6 h-6 md:w-8 md:h-8 lg:w-12 lg:h-12" />
                        </a>
                        <a aria-label="TikTok" href="https://www.tiktok.com/@terrahacks" target="_blank" rel="noopener noreferrer" className="hover:text-black transition">
                            <RiTiktokLine className="w-6 h-6 md:w-8 md:h-8 lg:w-12 lg:h-12" />
                        </a>
                        <a aria-label="Linktree" href="https://linktr.ee/terrahacks" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 duration-300 transition">
                            <SiLinktree className="w-6 h-6 md:w-8 md:h-8 lg:w-12 lg:h-12" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Image section */}
            <div
                ref={imageContainerRef}
                className="w-full h-[400px] md:h-[500px] relative overflow-hidden mt-12"
            >
                {/* Before image */}
                {beforeImageUrl && (
                    <img
                        src={beforeImageUrl}
                        alt="Contact - Before"
                        className={`absolute top-0 left-0 w-full h-auto transition-opacity duration-1000 ease-in-out ${showAfterImage ? "opacity-0" : "opacity-100"
                            }`}
                    />
                )}

                {/* After image */}
                {afterImageUrl && (
                    <img
                        src={afterImageUrl}
                        alt="Contact - After"
                        className={`absolute top-0 left-0 w-full h-auto transition-opacity duration-1000 ease-in-out ${showAfterImage ? "opacity-100" : "opacity-0"
                            }`}
                    />
                )}
            </div>
        </section>
    );
}
