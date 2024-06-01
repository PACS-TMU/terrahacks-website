"use client";
import Header from "@/components/header";
import { FaRegEnvelope, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { RiDiscordLine, RiTiktokLine } from "react-icons/ri";
import { SiLinktree } from "react-icons/si";
import { useRef, useEffect } from "react";

export default function Contact() {
    const contentRef = useRef(null);

    useEffect(() => {
        const currentContentRef = contentRef.current;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    contentRef.current.classList.add('float-in-section-visible');
                }
                else {
                    contentRef.current.classList.remove('float-in-section-visible');
                }
            },
            {
                threshold: 0.2, // Trigger when 10% of the section is visible
            }
        );

        if (currentContentRef) {
            observer.observe(currentContentRef);
        }

        return () => {
            if (currentContentRef) {
                observer.unobserve(currentContentRef);
            }
        };
    }, []);

    return (
        <div id="contact" ref={contentRef} className="flex flex-col justify-center items-center absolute top-[74.5%] lg:top-[60%] xl:top-[71%] 2xl:top-[71.8%] pl-[35%] pr-[13%] lg:pl-[39%] lg:pr-[21%] 2xl:pl-[42%] 2xl:pr-[27.5%] mx-auto w-full h-[5.5%] lg:h-[8%] float-in-section">
            <Header title="Contact Us" />
            <p
                className={`pt-2 md:pt-4 lg:pt-8 2xl:pt-12 text-xs md:text-sm lg:text-lg xl:text-xl 3xl:text-3xl text-white`}
            >
                Reach out to <b>contact@terrahacks.ca</b> for any help or support,
                and please be sure to join the <b>TerraHacks Discord</b> community!
            </p>
            <div id="terrahacks-links" className="flex flex-row items-center justify-between w-full md:w-3/4 lg:w-full text-white pt-2 mt-2 xl:mt-6 3xl:pt-4 3xl:mt-6">
                <a href="mailto:contact@terrahacks.ca" target="_blank" className="hover:text-gray-300 ease-in-out duration-300">
                    <FaRegEnvelope className="w-6 md:w-8 lg:w-12 3xl:w-16 h-auto" />
                </a>
                <a href="https://www.instagram.com/terrahacks.tmu" target="_blank" className="hover:text-gray-300 ease-in-out duration-300">
                    <FaInstagram className="w-6 md:w-8 lg:w-12 3xl:w-16 h-auto" />
                </a>
                <a href="https://discord.gg/982AkBQea7" target="_blank" className="hover:text-gray-300 ease-in-out duration-300">
                    <RiDiscordLine className="w-6 md:w-8 lg:w-12 3xl:w-16 h-auto" />
                </a>
                <a href="https://www.linkedin.com/company/terrahacks" target="_blank" className="hover:text-gray-300 ease-in-out duration-300">
                    <FaLinkedinIn className="w-6 md:w-8 lg:w-12 3xl:w-16 h-auto" />
                </a>
                <a href="https://www.tiktok.com/@terrahacks" target="_blank" className="hover:text-gray-300 ease-in-out duration-300">
                    <RiTiktokLine className="w-6 md:w-8 lg:w-12 3xl:w-16 h-auto" />
                </a>
                <a href="https://linktr.ee/terrahacks" target="_blank" className="hover:text-gray-300 ease-in-out duration-300">
                    <SiLinktree className="w-6 md:w-8 lg:w-12 3xl:w-16 h-auto" />
                </a>
            </div>
        </div>
    );
}