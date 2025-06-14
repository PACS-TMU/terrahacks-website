// import { Geist } from "next/font/google";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import Image from "next/image";

const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `https://${process.env.NEXT_PUBLIC_BASE_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: {
    default: "TerraHacks - Summer 2025",
    template: "%s | TerraHacks",
  },
  description:
    "A student-run Hackathon for students to learn and apply their knowledge - Coming Summer 2025 in Downtown Toronto, on the Toronto Metropolitan University (TMU) campus!",
};

const openSans = Open_Sans({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={openSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <Navbar />
        {children}

        {/* MLH Trust Badge */}
        <a
          id="mlh-trust-badge"
          aria-label="Major League Hacking 2026 Hackathon Season"
          className="block max-w-[100px] min-w-[60px] fixed left-[20px] lg:left-auto lg:right-[40px] top-0 w-[10%] z-100"
          href="https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2026-season&utm_content=black"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="https://s3.amazonaws.com/logged-assets/trust-badge/2026/mlh-trust-badge-2026-black.svg"
            alt="Major League Hacking 2026 Hackathon Season"
            priority
            width={100}
            height={100}
            className="w-full h-auto"
          />
        </a>

        {/* <Top /> */}
      </body>
    </html>
  );
}