import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { notFound } from "next/navigation";

const items = [
  { id: "1", name: "Washed Denim Jacket", category: "Outerwear", price: 899, size: "L", condition: "Very good", image: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=1200&q=90", description: "A timeless denim layer with a relaxed silhouette and plenty of character. A one-off pre-loved find, selected for its easy everyday wear." },
  { id: "2", name: "Everyday Graphic Tee", category: "T-shirts", price: 399, size: "M", condition: "Excellent", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=90", description: "An easy everyday tee with a comfortable fit. A versatile pre-loved piece ready for a new rotation." },
  { id: "3", name: "Relaxed Utility Pants", category: "Bottoms", price: 749, size: "32", condition: "Very good", image: "https://images.unsplash.com/photo-1518639192441-8fce0a366e2e?auto=format&fit=crop&w=1200&q=90", description: "Relaxed utility-inspired trousers that bring a little structure to everyday outfits. One selected second-hand piece." },
  { id: "4", name: "Vintage Check Shirt", category: "Shirts", price: 549, size: "L", condition: "Good", image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1200&q=90", description: "A vintage-inspired check shirt with an easy, throw-on fit. Please review the condition and measurements before purchase." }
];

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = items.find(product => product.id === id);
  if (!item) notFound();
  return <main style={{ minHeight: "100vh", background: "#f5f3ed", color: "#1c211b" }}>
    <header style={{ height: 76, padding: "0 5%", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d8d7cd" }}>
      <Link href="/" style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-.09em" }}>WEIREN<span style={{ fontSize: 10, verticalAlign: "top", marginLeft: 4 }}>®</span></Link>
      <Link href="/" style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: ".08em", display: "flex", alignItems: "center", gap: 8 }}><ArrowLeft size={15}/> BACK TO SHOP</Link>
    </header>
    <div style={{ padding: "42px 5% 80px" }}>
      <p style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: ".1em", color: "#72766a" }}>WEIREN / {item.category.toUpperCase()} / PRODUCT {item.id.padStart(3, "0")}</p>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.1fr) minmax(300px,.9fr)", gap: "clamp(28px,6vw,90px)", marginTop: 25, alignItems: "start" }}>
        <div style={{ minHeight: 570, background: "#e5e1d7", backgroundImage: "url('" + item.image + "')", backgroundSize: "cover", backgroundPosition: "center", position: "relative" }}><span style={{ position: "absolute", left: 16, top: 16, background: "#f5f3ed", padding: "8px 10px", fontFamily: "monospace", fontSize: 9, letterSpacing: ".08em" }}>ONE-OFF FIND</span></div>
        <div style={{ paddingTop: 18 }}>
          <p style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: ".13em", color: "#687052" }}>PRE-LOVED / SELECTED</p>
          <h1 style={{ fontSize: "clamp(38px,5vw,66px)", lineHeight: .98, letterSpacing: "-.075em", fontWeight: 500, margin: "20px 0" }}>{item.name}</h1>
          <div style={{ fontSize: 20, fontWeight: 600 }}>₹{item.price.toLocaleString("en-IN")}</div>
          <div style={{ borderTop: "1px solid #d8d7cd", borderBottom: "1px solid #d8d7cd", margin: "26px 0", padding: "18px 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
            <div><p style={{ fontFamily: "monospace", fontSize: 9, color: "#74766d" }}>SIZE</p><strong>{item.size}</strong></div>
            <div><p style={{ fontFamily: "monospace", fontSize: 9, color: "#74766d" }}>CONDITION</p><strong>{item.condition}</strong></div>
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: "#5f635a" }}>{item.description}</p>
          <div style={{ margin: "25px 0", padding: 17, background: "#e9e7de", fontSize: 12, lineHeight: 1.8 }}><strong style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}><CheckCircle2 size={16}/> A note on pre-loved</strong>Every piece is unique. Check the listed size and condition carefully. Real item measurements and photos should be added before this product is offered for sale.</div>
          <a href="mailto:hello@weiren.store?subject=Question%20about%20a%20WEIREN%20item" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#1c211b", color: "white", padding: "18px 20px", fontFamily: "monospace", fontSize: 10, letterSpacing: ".06em" }}>ASK ABOUT THIS FIND <ArrowUpRight size={17}/></a>
          <p style={{ fontSize: 10, color: "#77796f", lineHeight: 1.7, marginTop: 15 }}>Demo product page. Checkout and inventory are not connected yet.</p>
        </div>
      </div>
    </div>
  </main>;
}
