import { hooks } from "@/lib/hooks-data";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HomeClient } from "@/components/HomeClient";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0a0a0a]">
      <Header />
      <HomeClient hooks={hooks} />
      <Footer />
    </div>
  );
}
