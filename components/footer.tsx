"use client";
import { FaRegEnvelope, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { RiDiscordLine, RiTiktokLine } from "react-icons/ri";
import { SiLinktree } from "react-icons/si";
import React from "react";

export default function Footer() {
    return (
        <footer id="footer" className="bg-transparent text-background pt-12">
            <div className="main flex flex-col items-center justify-center space-y-6">
                <div id="terrahacks-links" className="flex flex-row items-center justify-between w-[90%] md:w-[60%] lg:w-[40%] 2xl:w-[35%] text-background pt-2 mt-2 xl:mt-6 3xl:pt-4 3xl:mt-6">
                    <a
                        aria-label="Link to Email"
                        rel="noopener noreferrer"
                        href="mailto:contact@terrahacks.ca"
                        target="_blank"
                        className="hover:text-blue-600 ease-in-out duration-300"
                    >
                        <FaRegEnvelope className="w-8 md:w-10 xl:w-12 h-auto" />
                    </a>
                    <a
                        aria-label="Link to Instagram"
                        rel="noopener noreferrer"
                        href="https://www.instagram.com/terrahacks.tmu"
                        target="_blank"
                        className="hover:text-pink-600 ease-in-out duration-300"
                    >
                        <FaInstagram className="w-8 md:w-10 xl:w-12 h-auto" />
                    </a>
                    <a
                        aria-label="Link to Discord"
                        rel="noopener noreferrer"
                        href="https://discord.gg/982AkBQea7"
                        target="_blank"
                        className="hover:text-blue-600 ease-in-out duration-300"
                    >
                        <RiDiscordLine className="w-8 md:w-10 xl:w-12 h-auto" />
                    </a>
                    <a
                        aria-label="Link to LinkedIn"
                        rel="noopener noreferrer"
                        href="https://www.linkedin.com/company/terrahacks"
                        target="_blank"
                        className="hover:text-blue-500 ease-in-out duration-300"
                    >
                        <FaLinkedinIn className="w-8 md:w-10 xl:w-12 h-auto" />
                    </a>
                    <a
                        aria-label="Link to TikTok"
                        rel="noopener noreferrer"
                        href="https://www.tiktok.com/@terrahacks"
                        target="_blank"
                        className="hover:text-black ease-in-out duration-300"
                    >
                        <RiTiktokLine className="w-8 md:w-10 xl:w-12 h-auto" />
                    </a>
                    <a
                        aria-label="Link to Linktree"
                        rel="noopener noreferrer"
                        href="https://linktr.ee/terrahacks"
                        target="_blank"
                        className="hover:text-green-400 ease-in-out duration-300"
                    >
                        <SiLinktree className="w-8 md:w-10 xl:w-12 h-auto" />
                    </a>
                </div>
                <div className="flex flex-col lg:flex-row items-center justify-center space-y-4 lg:space-y-0 lg:space-x-12">
                    <a
                        aria-label="Link to MLH Code of Conduct"
                        rel="noopener noreferrer"
                        href="https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md"
                        target="_blank"
                        className="md:text-lg lg:text-xl xl:text-2xl hover:text-gray-300 ease-in-out duration-300 underline"
                    >
                        MLH Code of Conduct
                    </a>
                    <a
                        aria-label="Link to Sponsorship Package"
                        rel="noopener noreferrer"
                        href="https://drive.google.com/file/d/1yZpr0HeziOeStxhHxH8ggwjn_QF1lFSw/view?usp=sharing"
                        target="_blank"
                        className="md:text-lg lg:text-xl xl:text-2xl hover:text-gray-300 ease-in-out duration-300 underline"
                    >
                        Become a Sponsor!
                    </a>
                </div>
                <p className="md:text-lg lg:text-xl xl:text-2xl font-medium py-4 lg:py-8">
                    Copyright © 2025 TerraHacks
                </p>
            </div>
        </footer>
    );
};