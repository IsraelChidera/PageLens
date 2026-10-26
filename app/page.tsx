import Hero from "./components/Elements/Hero";
import About from "./components/About";
import OurServices from "./components/Features";
import CallToAction from "./components/CallToAction";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <OurServices />
      <CallToAction />
    </main>
  );
}
