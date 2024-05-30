import { FaRegEnvelope, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { RiDiscordLine, RiTiktokLine } from "react-icons/ri";
import { SiLinktree } from "react-icons/si";

export default function Footer() {
    return (
        <>
            <footer className="bg-[#0B0507] text-white py-12">
                <div className="main flex flex-col items-center justify-center space-y-6">
                    <div id="terrahacks-links" className="flex flex-row items-center justify-between w-[75%] md:w-[60%] lg:w-[40%] 2xl:w-[35%] text-white  pt-2 mt-2 xl:mt-6 3xl:pt-4 3xl:mt-6">
                        <a href="mailto:contact@terrahacks.ca" target="_blank" className="hover:text-gray-300 ease-in-out duration-300">
                            <FaRegEnvelope className="w-8 lg:w-10 xl:w-12 h-auto" />
                        </a>
                        <a href="https://www.instagram.com/terrahacks.tmu" target="_blank" className="hover:text-gray-300 ease-in-out duration-300">
                            <FaInstagram className="w-8 lg:w-10 xl:w-12 h-auto" />
                        </a>
                        <a href="https://discord.gg/8hA54AGmZB" target="_blank" className="hover:text-gray-300 ease-in-out duration-300">
                            <RiDiscordLine className="w-8 lg:w-10 xl:w-12 h-auto" />
                        </a>
                        <a href="https://www.linkedin.com/company/terrahacks" target="_blank" className="hover:text-gray-300 ease-in-out duration-300">
                            <FaLinkedinIn className="w-8 lg:w-10 xl:w-12 h-auto" />
                        </a>
                        <a href="https://www.tiktok.com/@terrahacks" target="_blank" className="hover:text-gray-300 ease-in-out duration-300">
                            <RiTiktokLine className="w-8 lg:w-10 xl:w-12 h-auto" />
                        </a>
                        <a href="https://linktr.ee/terrahacks" target="_blank" className="hover:text-gray-300 ease-in-out duration-300">
                            <SiLinktree className="w-8 lg:w-10 xl:w-12 h-auto" />
                        </a>
                    </div>
                    <div className="space-x-6 lg:space-x-12">
                        <a href="/assets/mlh-conduct.pdf" target="_blank" className="md:text-lg lg:text-xl xl:text-2xl hover:text-gray-300 ease-in-out duration-300 underline">MLH Code of Conduct</a>
                        <a href="LINK TO SPONSORHIP PACKAGE" target="_blank" className="md:text-lg lg:text-xl xl:text-2xl hover:text-gray-300 ease-in-out duration-300 underline">Become a Sponsor</a>
                    </div>
                    <p className="md:text-lg lg:text-xl xl:text-2xl font-medium py-4 lg:py-8">Copyright © 2024 TerraHacks</p>
                </div>
            </footer>
        </>
    );
}