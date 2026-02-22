import ProductDetailsContent from "@/components/product/ProductDetailsContent";

export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const productId = parseInt(id);

  return <ProductDetailsContent productId={productId} />;
}
