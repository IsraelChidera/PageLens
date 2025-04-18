import Image from "next/image";
import FetchDetails from "./components/FetchDetails";

export default function Home() {
  console.log(process.env.NEXT_PUBLIC_API_KEY);
  return (
    <main>
      <FetchDetails />
    </main>
  );
}
