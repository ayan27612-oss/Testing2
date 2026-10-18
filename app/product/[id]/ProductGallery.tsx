"use client";

import { useState } from "react";
import { ArrowUpRight, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";

type Product = { id:string; name:string; category:string; price:number; size:string; condition:string; images:string[]; description:string };

export default function ProductGallery({ item }: { item: Product }) {
  const [activeImage, setActiveImage] = useState(0);
  const [notice, setNotice] = useState("");
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const show = (n:number) => setActiveImage((n + item.images.length) % item.images.length);
  function finishSwipe(endX:number) {
    if (touchStart === null) return;
    const distance = endX - touchStart;
    if (Math.abs(distance) > 45) show(activeImage + (distance < 0 ? 1 : -1));
    setTouchStart(null);
  }
  return <div className="detail-layout"><section className="gallery-column" aria-label="Product photos">
    <div className="gallery-main" onTouchStart={event => setTouchStart(event.touches[0]?.clientX ?? null)} onTouchEnd={event => finishSwipe(event.changedTouches[0]?.clientX ?? 0)}><img src={item.images[activeImage]} alt={item.name + " product view " + (activeImage + 1)} /><span className="gallery-count">0{activeImage+1} / 04</span><button className="gallery-arrow gallery-prev" onClick={() => show(activeImage-1)} aria-label="Previous photo"><ChevronLeft/></button><button className="gallery-arrow gallery-next" onClick={() => show(activeImage+1)} aria-label="Next photo"><ChevronRight/></button></div>
    <div className="gallery-thumbnails">{item.images.map((src,i)=><button type="button" key={src} className={i===activeImage?"gallery-thumb active":"gallery-thumb"} onClick={()=>setActiveImage(i)} aria-label={"Show product photo "+(i+1)}><img src={src} alt={item.name+" thumbnail "+(i+1)}/><span>{["FRONT","BACK","SIDE","DETAIL"][i]}</span></button>)}</div>
    <p className="gallery-disclaimer">Swipe the main photo or use the arrows to browse all four views. These are sample preview images; upload four real photos of the exact item (front, back, side, and detail) before accepting customer orders.</p>
  </section><section className="detail-info"><p className="detail-kicker">PRE-LOVED / SELECTED</p><h1>{item.name}</h1><div className="detail-price">₹{item.price.toLocaleString("en-IN")}</div><div className="detail-specs"><div><span>SIZE</span><strong>{item.size}</strong></div><div><span>CONDITION</span><strong>{item.condition}</strong></div></div><p className="detail-description">{item.description}</p><div className="detail-note"><strong><CheckCircle2 size={16}/> A NOTE ON PRE-LOVED</strong><p>Every piece is unique. Check the listed size and condition carefully. Accurate measurements and photos should be added before purchase.</p></div><button className="detail-cta" onClick={()=>setNotice("Checkout is not connected yet. This is a preview only.")}>ADD TO BAG <ArrowUpRight size={17}/></button>{notice && <p className="detail-notice">{notice}</p>}<p className="detail-demo">Preview mode · login, checkout, inventory, and contact links are not connected.</p></section></div>;
}
