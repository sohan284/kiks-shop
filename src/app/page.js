import Navbar from "@/components/common/Navbar";
import Hero from "@/components/home/Hero";

export default function Home() {
  return (
    <div className="min-h-screen max-w-[1320px] mx-auto">
      {/* common navbar */}
      <Navbar />

      {/* hero section */}
      <main>
        <Hero />
      </main>

      {/* future sections like 'new drops', 'categories', etc. */}
    </div>
  );
}

