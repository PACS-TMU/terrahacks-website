"use client";

import { useState, useEffect, useRef } from "react";
import { Spin as Hamburger } from "hamburger-react";
import { useClickAway } from "react-use";
import NavbarLogo from "./navbar-logo";
import PortalBtn from "./portal-btn";
import Link from "next/link";

// Define the type for navigation items
interface NavItem {
    id: number;
    label: string;
    sectionId: string;
}

// Static navigation data - no need to fetch from JSON
const navItems: NavItem[] = [
    { id: 1, label: "About", sectionId: "about" },
    { id: 2, label: "Sponsors", sectionId: "sponsors" },
    { id: 3, label: "FAQ", sectionId: "faq" },
    { id: 4, label: "Team", sectionId: "team" },
    { id: 5, label: "Contact", sectionId: "contact" },
];

export default function Navbar() {
    const [isExpandedMobile, setIsExpandedMobile] = useState<boolean>(false);
    const ref = useRef<HTMLElement>(null);

    useClickAway(ref, () => {
        setIsExpandedMobile(false);
    });

    useEffect(() => {
        if (isExpandedMobile) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
    }, [isExpandedMobile]);

    return (
        <>
            {/* Desktop Navbar */}
            <nav className="hidden lg:flex flex-row w-full bg-transparent backdrop-blur-laptop text-[#5D2A15] font-bold px-10 py-3 fixed justify-between z-50">
                <div className="flex flex-row">
                    <ul className="flex justify-center w-full items-center gap-12 2xl:gap-16 ml-4">
                        <li>
                            <NavbarLogo />
                        </li>
                        {navItems.map((item) => (
                            <li
                                key={item.id}
                                className="text-md lg:text-xl xl:text-2xl 2xl:text-2xl hover:opacity-80 transition-colors duration-300"
                            >
                                <Link
                                    href={`#${item.sectionId}`}
                                    className=""
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="mr-30">
                    <PortalBtn />
                </div>
            </nav>

            {/* Mobile Navbar */}
            <nav
                ref={ref}
                className="flex lg:hidden flex-row w-full backdrop-blur-mobile text-[#5D2A15] font-bold px-5 py-3 fixed justify-between h-16 z-50"
            >
                <NavbarLogo />
                <button
                    onClick={() => setIsExpandedMobile(!isExpandedMobile)}
                    aria-label={isExpandedMobile ? "Close menu" : "Open menu"}
                >
                    <Hamburger
                        toggled={isExpandedMobile}
                        toggle={setIsExpandedMobile}
                        duration={0.5}
                        rounded
                        color="#5D2A15"
                        size={28}
                    />
                </button>

                {isExpandedMobile && (
                    <div className="flex flex-col w-full absolute top-0 right-0 h-screen items-center mt-16 pt-8 bg-background z-40 space-y-4 gap-4">
                        <PortalBtn />
                        <hr className="w-full border-t border-brown-300" />
                        {navItems.map((item) => (
                            <div key={item.id} className="w-full text-xl hover:text-brown-300 transition-colors duration-300">
                                <Link
                                    href={`#${item.sectionId}`}
                                    onClick={() => setIsExpandedMobile(false)}
                                    className="w-full text-center flex items-center justify-center py-2 px-4 hover:bg-brown-100 rounded-md"
                                >
                                    {item.label}
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </nav>
        </>
    );
}
