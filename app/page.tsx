import Image from "next/image";
import FetchDetails from "./components/FetchDetails";
import Hero from "./components/Elements/Hero";
import About from "./components/About";
import OurServices from "./components/Features";

export default function Home() {
  console.log(process.env.NEXT_PUBLIC_API_KEY);
  return (
    <main>
      <Hero />
      <About />
      <OurServices />
      {/* <FetchDetails /> */}
    </main>
  );
}
