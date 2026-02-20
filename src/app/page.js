import Navbar from "@/components/common/Navbar";
import Hero from "@/components/home/Hero";
import { ProductSection } from "@/components/home/ProductSection";
import { CategorySection } from "@/components/home/CategorySection";
import { ReviewSection } from "@/components/home/ReviewSection";
import { Footer } from "@/components/common/Footer";

export default function Home() {
  return (
    <div className="min-h-screen max-w-[1320px] mx-auto">
      {/* common navbar */}
      <Navbar />

      {/* content */}
      <main>
        <Hero />
        <ProductSection />
        <CategorySection />
        <ReviewSection />
      </main>

      <Footer />

      {/* future sections like 'new drops', 'categories', etc. */}
    </div>
  );
}

