import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import ProductGallery from "./ProductGallery";

const items = [
  { id: "1", name: "Washed Denim Jacket", category: "Outerwear", price: 899, size: "L", condition: "Very good", images: ["https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=1200&q=90","https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=90","https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1200&q=90","https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1200&q=90"], description: "A timeless denim layer with a relaxed silhouette and plenty of character. A one-off pre-loved find, selected for its easy everyday wear." },
  { id: "2", name: "Everyday Graphic Tee", category: "T-shirts", price: 399, size: "M", condition: "Excellent", images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=90","https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=1200&q=90","https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=1200&q=90","https://images.unsplash.com/photo-1583743814966-8936f37f4678?auto=format&fit=crop&w=1200&q=90"], description: "An easy everyday tee with a comfortable fit. A versatile pre-loved piece ready for a new rotation." },
  { id: "3", name: "Relaxed Utility Pants", category: "Bottoms", price: 749, size: "32", condition: "Very good", images: ["https://images.unsplash.com/photo-1518639192441-8fce0a366e2e?auto=format&fit=crop&w=1200&q=90","https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1200&q=90","https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1200&q=90","https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=1200&q=90"], description: "Relaxed utility-inspired trousers that bring a little structure to everyday outfits. One selected second-hand piece." },
  { id: "4", name: "Vintage Check Shirt", category: "Shirts", price: 549, size: "L", condition: "Good", images: ["https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1200&q=90","https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=1200&q=90","https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1200&q=90","https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1200&q=90"], description: "A vintage-inspired check shirt with an easy, throw-on fit. Please review the condition and measurements before purchase." }
];

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = items.find(product => product.id === id);
  if (!item) notFound();
  return <main className="detail-page">
    <header className="detail-header"><Link href="/" className="wordmark">WEIREN<span>®</span></Link><Link href="/" className="detail-back"><ArrowLeft size={15}/> BACK TO SHOP</Link><Link href="/login" className="detail-login">LOG IN</Link></header>
    <div className="detail-shell"><p className="detail-breadcrumb">WEIREN / {item.category.toUpperCase()} / PRODUCT {item.id.padStart(3,"0")}</p>
      <ProductGallery item={item} />
    </div>
  </main>;
}
