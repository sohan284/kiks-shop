import Hero from "@/components/home/Hero";
import { ProductSection } from "@/components/home/ProductSection";
import { CategorySection } from "@/components/home/CategorySection";
import { ReviewSection } from "@/components/home/ReviewSection";

export default function Home() {
  return (
    /* content */
    <main>
      <Hero />
      <ProductSection />
      <CategorySection />
      <ReviewSection />
    </main>
  );
}

