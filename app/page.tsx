import Home from "@/components/section/home";
import About from "@/components/section/about";
import Sponsors from "@/components/section/sponsors";
import Faq from "@/components/section/faq";
import Team from "@/components/section/team";
import Contact from "@/components/section/contact";

export default function Homepage() {
  return (
    <>
      <p>Welcome to the homepage!</p>
      <Home />
      <About />
      <Sponsors />
      <Faq />
      <Team />
      <Contact />
    </>
  );
}