"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Check, Heart, Menu, Search, ShoppingBag, X, UserRound, Instagram, MessageCircle, Phone, Mail } from "lucide-react";

type Product = { id: number; name: string; category: string; price: number; size: string; condition: string; image: string; label?: string };
const products: Product[] = [
  { id: 1, name: "Washed Denim Jacket", category: "Outerwear", price: 899, size: "L", condition: "Very good", image: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=900&q=85", label: "ONE OF ONE" },
  { id: 2, name: "Everyday Graphic Tee", category: "T-shirts", price: 399, size: "M", condition: "Excellent", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85", label: "JUST IN" },
  { id: 3, name: "Relaxed Utility Pants", category: "Bottoms", price: 749, size: "32", condition: "Very good", image: "https://images.unsplash.com/photo-1518639192441-8fce0a366e2e?auto=format&fit=crop&w=900&q=85" },
  { id: 4, name: "Vintage Check Shirt", category: "Shirts", price: 549, size: "L", condition: "Good", image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=85", label: "RARE FIND" }
];
const categories = [
  { name: "Tees & tops", count: "01 / DAILY ROTATION", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85", number: "01" },
  { name: "Denim", count: "02 / NEVER OUT OF STYLE", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=85", number: "02" },
  { name: "Outerwear", count: "03 / LAYER UP", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=85", number: "03" }
];

export default function HomePage() {
  const [bag, setBag] = useState<number[]>([]);
  const [saved, setSaved] = useState<number[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const visibleProducts = useMemo(() => products.filter(p => {
    const matchesQuery = (p.name + " " + p.category).toLowerCase().includes(query.toLowerCase());
    const matchesCategory = !selectedCategory || (selectedCategory === "Tees & tops" ? ["T-shirts", "Shirts"].includes(p.category) : selectedCategory === "Denim" ? /denim|jeans/i.test(p.name + " " + p.category) : selectedCategory === "Outerwear" ? p.category === "Outerwear" : true);
    return matchesQuery && matchesCategory;
  }), [query, selectedCategory]);
  function addToBag(product: Product) {
    setBag(old => old.includes(product.id) ? old : [...old, product.id]);
    setToast(bag.includes(product.id) ? "Already in your bag" : "Added to your bag");
    window.setTimeout(() => setToast(""), 1800);
  }
  function toggleSaved(id: number) { setSaved(old => old.includes(id) ? old.filter(x => x !== id) : [...old, id]); }

  return <main id="top">
    <div className="announcement"><span>GOOD FINDS. BETTER FUTURES.</span><span className="announcement-right">CURATED PRE-LOVED CLOTHING <b>✳</b> MADE TO BE WORN AGAIN</span></div>
    <header className="site-header">
      <Link href="/" className="wordmark" aria-label="WEIREN home">WEIREN<span>®</span></Link>
      <nav className={menuOpen ? "nav-links nav-open" : "nav-links"}>
        <a href="#new-drops" onClick={() => setMenuOpen(false)}>NEW DROPS <span className="nav-dot">●</span></a>
        <a href="#categories" onClick={() => setMenuOpen(false)}>SHOP</a>
        <a href="#our-story" onClick={() => setMenuOpen(false)}>OUR STORY</a>
      </nav>
      <div className="header-actions">
        <button className="icon-button" aria-label="Search products" onClick={() => setSearchOpen(!searchOpen)}>{searchOpen ? <X size={19}/> : <Search size={19}/>}</button>
        <Link className="icon-button login-link" href="/login" aria-label="Log in"><UserRound size={19}/></Link><a className="bag-button" href="#new-drops"><ShoppingBag size={18} strokeWidth={1.6}/><span>BAG ({bag.length})</span></a>
        <button className="icon-button mobile-menu" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
      </div>
    </header>
    {searchOpen && <div className="search-panel"><Search size={18}/><input autoFocus placeholder="Search tees, denim, jackets..." value={query} onChange={e => { setQuery(e.target.value); document.getElementById("new-drops")?.scrollIntoView({ behavior: "smooth" }); }}/><button onClick={() => { setQuery(""); setSearchOpen(false); }}>CLOSE</button></div>}

    <section className="hero">
      <div className="hero-copy">
        <div className="eyebrow"><span className="eyebrow-line"/> THE ART OF FINDING</div>
        <h1>Wear it<br/><em>different.</em></h1>
        <p className="hero-description">Good clothes deserve another story. Discover one-off thrift finds, vintage energy, and everyday pieces with a past.</p>
        <a className="button button-dark" href="#new-drops">SHOP THE LATEST DROP <ArrowUpRight size={17}/></a>
        <div className="hero-note"><span className="asterisk">✳</span><span>PRE-LOVED.<br/>NEVER ORDINARY.</span></div>
        <div className="hero-index">INDEPENDENT STYLE STUDIO <span>— EST. 2026</span></div>
      </div>
      <div className="hero-visual"><div className="hero-image" role="img" aria-label="Editorial streetwear outfit in warm neutral tones"/><div className="hero-stamp"><span>FOUND</span><span>NOT</span><span>FOLLOWED.</span><ArrowDownRight size={23}/></div><div className="image-caption"><span>FIG. 001</span><span>THE EVERYDAY ICONS EDIT</span></div><div className="hero-side-note">SECOND HAND, FIRST CHOICE ↗</div></div>
    </section>

    <div className="ticker"><div>LESS NEW, MORE YOU <span>✳</span> CLOTHES WITH CHARACTER <span>✳</span> ONE-OF-A-KIND FINDS <span>✳</span> LESS NEW, MORE YOU <span>✳</span> CLOTHES WITH CHARACTER <span>✳</span> ONE-OF-A-KIND FINDS <span>✳</span></div></div>

    <section className="category-section section-wrap" id="categories"><div className="section-heading"><div><div className="eyebrow">THE GOOD STUFF, SORTED</div><h2>Find your <em>kind.</em></h2></div><a className="text-link" href="#new-drops">EXPLORE ALL PIECES <ArrowUpRight size={16}/></a></div><div className="category-grid">{categories.map((cat, i) => <a href="#new-drops" onClick={() => setSelectedCategory(cat.name)} className={"category-card category-" + (i + 1)} key={cat.name}><div className="category-photo" style={{backgroundImage: "url('" + cat.image + "')"}}/><div className="category-number">{cat.number}</div><div className="category-info"><div><span>{cat.count}</span><h3>{cat.name}</h3></div><span className="circle-arrow"><ArrowUpRight size={20}/></span></div></a>)}</div></section>

    <section className="drops-section" id="new-drops"><div className="section-wrap"><div className="section-heading"><div><div className="eyebrow"><span className="live-dot"/> JUST ADDED / DROP 001</div><h2>The latest <em>finds.</em></h2><p className="section-subtitle">Small batches. Individual pieces. When it’s gone, it’s a story.</p></div><div className="drop-count">{selectedCategory ? selectedCategory.toUpperCase() : "01 — 04"} <span>/ SELECTED PIECES</span></div></div>
      {(query || selectedCategory) && <div className="results-note">Showing {selectedCategory ? selectedCategory : "all categories"}{query ? ` for “${query}”` : ""} <button onClick={() => { setQuery(""); setSelectedCategory(""); }}>SHOW ALL ×</button></div>}
      <div className="product-grid">{visibleProducts.map(p => <article className="product-card" key={p.id}><div className="product-image-wrap"><Link href={"/product/" + p.id} className="product-image" style={{backgroundImage: "url('" + p.image + "')"}} aria-label={"View " + p.name}/>{p.label && <span className="product-label">{p.label}</span>}<button className={"wishlist " + (saved.includes(p.id) ? "is-saved" : "")} aria-label={saved.includes(p.id) ? "Remove from saved items" : "Save item"} onClick={() => toggleSaved(p.id)}><Heart size={18} fill={saved.includes(p.id) ? "currentColor" : "none"}/></button><button className="quick-add" onClick={() => addToBag(p)}>{bag.includes(p.id) ? <><Check size={15}/> IN BAG</> : <>ADD TO BAG <span>+</span></>}</button></div><div className="product-meta"><div><Link href={"/product/" + p.id} className="product-name">{p.name}</Link><p>{p.category} · Size {p.size}</p></div><span className="product-price">₹{p.price.toLocaleString("en-IN")}</span></div><div className="condition-line"><span className="condition-dot"/> CONDITION: {p.condition.toUpperCase()} <span className="one-off">ONE-OFF PIECE</span></div></article>)}</div>
      {visibleProducts.length === 0 && <div className="empty-search">No finds for that search. Try “tee”, “denim”, or “jacket”.</div>}
      <div className="center-cta"><a className="button button-outline" href="#categories">EXPLORE THE COLLECTION <ArrowUpRight size={17}/></a><p>EVERY PIECE HAS A PAST. MAKE IT PART OF YOURS.</p></div></div></section>

    <section className="manifesto" id="our-story"><div className="manifesto-top"><span>OUR POINT OF VIEW</span><span>NO. 001 / REWEAR CULTURE</span></div><div className="manifesto-content"><span className="manifesto-mark">W.</span><h2>Not more clothes.<br/>More <em>meaning.</em></h2><p>WEIREN is for the curious dresser. The re-wearer. The person who knows personal style isn’t about having more, it’s about finding the right thing.</p><a className="text-link text-link-light" href="#contact">A LITTLE MORE ABOUT US <ArrowUpRight size={16}/></a></div><div className="manifesto-bottom"><span>GOOD FINDS, GIVEN ANOTHER GO.</span><span>WEAR IT DIFFERENT. ↗</span></div></section>

    <section className="newsletter section-wrap"><div><div className="eyebrow">THE NEXT GOOD FIND</div><h2>First dibs. <em>Good stuff.</em></h2><p>New drops, rare finds, and the occasional note from us. No noise.</p></div><form className="newsletter-form" onSubmit={e => { e.preventDefault(); setToast("You're on the list. (Demo only)"); window.setTimeout(() => setToast(""), 2200); }}><label className="sr-only" htmlFor="email">Email address</label><input id="email" type="email" placeholder="YOUR EMAIL ADDRESS" required/><button aria-label="Join newsletter"><ArrowUpRight size={22}/></button><small>By subscribing, you agree to receive WEIREN updates.</small></form></section>

    <footer className="site-footer" id="contact"><div className="footer-top"><Link href="/" className="wordmark footer-wordmark">WEIREN<span>®</span></Link><p>GOOD CLOTHES DESERVE<br/>ANOTHER STORY.</p><a href="#top" className="back-top">BACK TO TOP ↑</a></div><div className="footer-contact"><div className="footer-socials"><span className="footer-label">FIND / CONTACT US</span><button type="button" disabled aria-label="Instagram coming soon"><Instagram size={19}/><span>Instagram · Soon</span></button><button type="button" disabled aria-label="WhatsApp coming soon"><MessageCircle size={19}/><span>WhatsApp · Soon</span></button><button type="button" disabled aria-label="Helpline coming soon"><Phone size={18}/><span>Helpline · Coming soon</span></button><button type="button" disabled aria-label="Email coming soon"><Mail size={18}/><span>Email · Coming soon</span></button></div><p className="contact-note">Contact details and social links will be added when WEIREN is ready. Nothing is connected yet.</p></div><div className="footer-bottom"><span>© 2026 WEIREN STUDIO</span><div><a href="#contact">CONTACT</a><a href="#our-story">OUR STORY</a><a href="#new-drops">SHOP ALL</a></div><span>MADE FOR A SECOND LIFE <span className="footer-star">✳</span></span></div></footer>
    {toast && <div className="toast"><Check size={16}/>{toast}</div>}
  </main>;
}
