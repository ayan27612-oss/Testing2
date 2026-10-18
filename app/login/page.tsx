"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowUpRight, LockKeyhole, UserRound } from "lucide-react";

export default function LoginPage() {
  const [mode, setMode] = useState<"login"|"signup">("login");
  const [notice, setNotice] = useState("");
  return <main className="auth-page"><header className="auth-header"><Link href="/" className="wordmark">WEIREN<span>®</span></Link><Link href="/" className="detail-back"><ArrowLeft size={15}/> BACK TO SHOP</Link></header><section className="auth-card"><div className="eyebrow">YOUR WEIREN ACCOUNT</div><div className="auth-mark"><UserRound size={24}/></div><h1>{mode==="login"?"Good to have you back.":"Make room for good finds."}</h1><p className="auth-intro">{mode==="login"?"Log in to keep your saved pieces and shopping journey together.":"Create an account for your WEIREN shopping journey."}</p><div className="auth-tabs"><button className={mode==="login"?"active":""} onClick={()=>{setMode("login");setNotice("");}}>LOG IN</button><button className={mode==="signup"?"active":""} onClick={()=>{setMode("signup");setNotice("");}}>CREATE ACCOUNT</button></div><form onSubmit={e=>{e.preventDefault();setNotice("Preview only. Login and account creation are not connected yet, and no details were sent or saved.");}}><label htmlFor="auth-email">EMAIL ADDRESS</label><input id="auth-email" type="email" placeholder="you@example.com" required/><label htmlFor="auth-password">PASSWORD</label><input id="auth-password" type="password" placeholder="At least 8 characters" minLength={8} required/><button className="auth-submit" type="submit"><LockKeyhole size={16}/>{mode==="login"?"LOG IN":"CREATE ACCOUNT"}<ArrowUpRight size={17}/></button></form>{notice&&<p className="auth-notice">{notice}</p>}<p className="auth-footnote">DEMO SCREEN · AUTHENTICATION IS NOT ENABLED</p></section></main>;
}
