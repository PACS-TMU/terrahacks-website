"use client";
import { useState, useEffect, useRef } from "react";
import { Spin as Hamburger } from 'hamburger-react';
import { useClickAway } from 'react-use';
import NavbarLogo from "./navbar-logo";
import PortalBtn from "./portal-btn";
import { useRouter } from "next/navigation";

// Define the type for navigation items
interface NavItem {
    id: number;
    label: string;
    sectionId: string;
}

// Static navigation data - no need to fetch from JSON
const staticNavItems: NavItem[] = [
    {
        id: 1,
        label: "About",
        sectionId: "about"
    },
    {
        id: 2,
        label: "Sponsors",
        sectionId: "sponsors"
    },
    {
        id: 3,
        label: "FAQ",
        sectionId: "faq"
    },
    {
        id: 4,
        label: "Contact",
        sectionId: "contact"
    },
    {
        id: 5,
        label: "The Team",
        sectionId: "team"
    }
];

export default function Navbar() {
    const [navItems, setNavItems] = useState<NavItem[]>(staticNavItems);
    const [isExpandedMobile, setIsExpandedMobile] = useState<boolean>(false);
    const router = useRouter();

    // No need for useEffect to fetch data since we're using static data
    
    // For closing the dropdown menu when clicking outside of it
    const ref = useRef<HTMLElement>(null);
    useClickAway(ref, () => {
        setIsExpandedMobile(false);
    });

    // Lock body scroll when mobile nav is open
    useEffect(() => {
        if (typeof document !== 'undefined') {
            if (isExpandedMobile) {
                document.body.classList.add("overflow-hidden");
            } else {
                document.body.classList.remove("overflow-hidden");
            }
        }
    }, [isExpandedMobile]);

    return (
        <>
            <nav id="website-nav" className="hidden lg:flex flex-row w-full bg-transparent backdrop-blur-laptop text-black font-medium px-10 py-3 fixed justify-between z-50">
                <div id="nav-items" className="flex flex-row">
                    <ul className="flex justify-center w-full items-center gap-12 2xl:gap-16 ml-4">
                        <li>
                            <NavbarLogo />
                        </li>
                        {navItems.map((item: NavItem) => (
                            <li className="text-md lg:text-xl xl:text-2xl 2xl:text-2xl" key={item.id}>
                                <button
                                    aria-label={`Navigate to ${item.label}`}
                                    className="hover:text-brown-300 transition-colors duration-300"
                                    onClick={() => {
                                        const elem = document.getElementById(item.sectionId);
                                        if (elem) {
                                            window.scrollTo({ top: elem.offsetTop - 100, behavior: "smooth" });
                                        }
                                    }}
                                >
                                    {item.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <PortalBtn />
            </nav>
            <nav id="mobile-nav" ref={ref} className={`flex lg:hidden flex-row w-full backdrop-blur-mobile text-white font-medium px-5 lg:px-10 py-3 fixed justify-between h-16 z-50`}>
                <NavbarLogo />
                <button
                    onClick={() => setIsExpandedMobile(!isExpandedMobile)}
                    aria-label={isExpandedMobile ? 'Close menu' : 'Open menu'}
                >
                    <Hamburger
                        toggled={isExpandedMobile}
                        toggle={setIsExpandedMobile}
                        duration={0.5}
                        rounded
                        color="#fff"
                        size={28}
                    />
                </button>
                {isExpandedMobile && (
                    <div id="mobile-nav-items" className="flex flex-col w-full absolute text-white space-y-4 gap-4 top-0 right-0 h-screen items-center mt-16 pt-8 backdrop-blur-mobile">
                        <PortalBtn />
                        {navItems.map((item: NavItem) => (
                            <button
                                aria-label={`Navigate to ${item.label}`}
                                className="text-xl hover:text-brown-300 transition-colors duration-300" 
                                key={item.id}
                                onClick={() => {
                                    const elem = document.getElementById(item.sectionId);
                                    if (elem) {
                                        window.scrollTo({ top: elem.offsetTop - 100, behavior: "smooth" });
                                    }
                                    setIsExpandedMobile(false);
                                }}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                )}
            </nav>
        </>
    );
}