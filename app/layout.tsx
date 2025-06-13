// import { Geist } from "next/font/google";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";

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
        {/* <Top /> */}
      </body>
    </html>
  );
}


// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className={openSans.className}>
//         <Navbar />
//         {children}
//         <Footer />
//         <Top />
//       </body>
//     </html>
//   );
// }