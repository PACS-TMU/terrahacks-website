import Home from "@/components/section/home";
import About from "@/components/section/about";
import Sponsors from "@/components/section/sponsors";
import Faq from "@/components/section/faq";
import Team from "@/components/section/team";
import Contact from "@/components/section/contact";
import Navbar from "@/components/navbar/navbar";
import Hero from "@/components/section/hero";
// import Navbar from "@/components/navbar";
export default function Homepage() {
  return (
    <>
      <p>Welcome to the homepage!</p>
      <Navbar />
      <Hero />
      <Home />
      <About />
      <Sponsors />
      <Faq />
      <Team />
      <Contact />
    </>
  );
}