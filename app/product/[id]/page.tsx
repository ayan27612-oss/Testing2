"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowUpRight, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";

const items = [
  { id: "1", name: "Washed Denim Jacket", category: "Outerwear", price: 899, size: "L", condition: "Very good", images: ["https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=1200&q=90","https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=90","https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1200&q=90","https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1200&q=90"], description: "A timeless denim layer with a relaxed silhouette and plenty of character. A one-off pre-loved find, selected for its easy everyday wear." },
  { id: "2", name: "Everyday Graphic Tee", category: "T-shirts", price: 399, size: "M", condition: "Excellent", images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=90","https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=1200&q=90","https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=1200&q=90","https://images.unsplash.com/photo-1583743814966-8936f37f4678?auto=format&fit=crop&w=1200&q=90"], description: "An easy everyday tee with a comfortable fit. A versatile pre-loved piece ready for a new rotation." },
  { id: "3", name: "Relaxed Utility Pants", category: "Bottoms", price: 749, size: "32", condition: "Very good", images: ["https://images.unsplash.com/photo-1518639192441-8fce0a366e2e?auto=format&fit=crop&w=1200&q=90","https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1200&q=90","https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1200&q=90","https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=1200&q=90"], description: "Relaxed utility-inspired trousers that bring a little structure to everyday outfits. One selected second-hand piece." },
  { id: "4", name: "Vintage Check Shirt", category: "Shirts", price: 549, size: "L", condition: "Good", images: ["https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1200&q=90","https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=1200&q=90","https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1200&q=90","https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1200&q=90"], description: "A vintage-inspired check shirt with an easy, throw-on fit. Please review the condition and measurements before purchase." }
];

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const [activeImage, setActiveImage] = useState(0);
  const [notice, setNotice] = useState("");
  const [itemId, setItemId] = useState<string | null>(null);
  // Next.js supplies params asynchronously; the route is resolved by the wrapper below.
  return <ProductPageContent params={params} activeImage={activeImage} setActiveImage={setActiveImage} notice={notice} setNotice={setNotice} />;
}
async function ProductPageContent({ params, activeImage, setActiveImage, notice, setNotice }: { params: Promise<{id:string}>; activeImage:number; setActiveImage:(n:number)=>void; notice:string; setNotice:(s:string)=>void }) {
  const { id } = await params;
  const item = items.find(product => product.id === id);
  if (!item) notFound();
  const show = (n:number) => setActiveImage((n + item.images.length) % item.images.length);
  return <main className="detail-page">
    <header className="detail-header"><Link href="/" className="wordmark">WEIREN<span>®</span></Link><Link href="/" className="detail-back"><ArrowLeft size={15}/> BACK TO SHOP</Link><Link href="/login" className="detail-login">LOG IN</Link></header>
    <div className="detail-shell"><p className="detail-breadcrumb">WEIREN / {item.category.toUpperCase()} / PRODUCT {item.id.padStart(3,"0")}</p>
      <div className="detail-layout"><section className="gallery-column" aria-label="Product photos">
        <div className="gallery-main"><img src={item.images[activeImage]} alt={item.name + " product view " + (activeImage + 1)} /><span className="gallery-count">0{activeImage+1} / 04</span><button className="gallery-arrow gallery-prev" onClick={() => show(activeImage-1)} aria-label="Previous photo"><ChevronLeft/></button><button className="gallery-arrow gallery-next" onClick={() => show(activeImage+1)} aria-label="Next photo"><ChevronRight/></button></div>
        <div className="gallery-thumbnails">{item.images.map((src,i)=><button type="button" key={src} className={i===activeImage?"gallery-thumb active":"gallery-thumb"} onClick={()=>setActiveImage(i)} aria-label={"Show product photo "+(i+1)}><img src={src} alt={item.name+" thumbnail "+(i+1)}/><span>{["FRONT","BACK","DETAIL","ANGLE"][i]}</span></button>)}</div>
        <p className="gallery-disclaimer">Gallery previews are sample imagery. Replace with four real photos of each exact item (front, back, detail, and side) before listing for sale.</p>
      </section>
      <section className="detail-info"><p className="detail-kicker">PRE-LOVED / SELECTED</p><h1>{item.name}</h1><div className="detail-price">₹{item.price.toLocaleString("en-IN")}</div><div className="detail-specs"><div><span>SIZE</span><strong>{item.size}</strong></div><div><span>CONDITION</span><strong>{item.condition}</strong></div></div><p className="detail-description">{item.description}</p><div className="detail-note"><strong><CheckCircle2 size={16}/> A NOTE ON PRE-LOVED</strong><p>Every piece is unique. Check the listed size and condition carefully. Accurate measurements and photos should be added before purchase is enabled.</p></div><button className="detail-cta" onClick={()=>setNotice("Checkout is not connected yet. This is a preview only.")}>ADD TO BAG <ArrowUpRight size={17}/></button>{notice && <p className="detail-notice">{notice}</p>}<p className="detail-demo">Preview mode · login, checkout, inventory, and contact links are not connected.</p></section></div>
    </div>
  </main>;
}
