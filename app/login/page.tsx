"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { ArrowLeft, ArrowUpRight, LockKeyhole, UserRound, LoaderCircle } from "lucide-react";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notice, setNotice] = useState("");
  const [noticeType, setNoticeType] = useState<"error" | "success" | "info">("info");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("");
    if (!supabase) {
      setNoticeType("error");
      setNotice("Login is not connected yet. The site owner must add the Supabase project URL and publishable key in Vercel Environment Variables, then redeploy. No details were sent.");
      return;
    }
    setLoading(true);
    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (error) throw error;
        setNoticeType("success");
        setNotice("You are logged in successfully.");
        window.location.assign("/");
      } else {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: { emailRedirectTo: window.location.origin }
        });
        if (error) throw error;
        setNoticeType("success");
        setNotice(data.session
          ? "Your account has been created and you are signed in."
          : "Account created. Check your email for the confirmation link before logging in.");
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong. Please try again.";
      setNoticeType("error");
      setNotice(message);
    } finally {
      setLoading(false);
    }
  }

  return <main className="auth-page">
    <header className="auth-header">
      <Link href="/" className="wordmark" aria-label="WEIREN home">WEIREN<span>®</span></Link>
      <Link href="/" className="detail-back"><ArrowLeft size={15}/> BACK TO SHOP</Link>
    </header>
    <section className="auth-card">
      <div className="eyebrow">YOUR WEIREN ACCOUNT</div>
      <div className="auth-mark"><UserRound size={24}/></div>
      <h1>{mode === "login" ? "Good to have you back." : "Make room for good finds."}</h1>
      <p className="auth-intro">{mode === "login" ? "Log in to keep your saved pieces and shopping journey together." : "Create an account for your WEIREN shopping journey."}</p>
      <div className="auth-tabs" role="tablist" aria-label="Account action">
        <button type="button" role="tab" aria-selected={mode === "login"} className={mode === "login" ? "active" : ""} onClick={() => { setMode("login"); setNotice(""); }}>LOG IN</button>
        <button type="button" role="tab" aria-selected={mode === "signup"} className={mode === "signup" ? "active" : ""} onClick={() => { setMode("signup"); setNotice(""); }}>CREATE ACCOUNT</button>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="auth-email">EMAIL ADDRESS</label>
        <input id="auth-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={event => setEmail(event.target.value)} required />
        <label htmlFor="auth-password">PASSWORD</label>
        <input id="auth-password" name="password" type="password" autoComplete={mode === "login" ? "current-password" : "new-password"} placeholder="At least 8 characters" value={password} onChange={event => setPassword(event.target.value)} minLength={8} required />
        <button className="auth-submit" type="submit" disabled={loading}>
          {loading ? <LoaderCircle size={16} className="auth-spinner"/> : <LockKeyhole size={16}/>}
          {loading ? "PLEASE WAIT..." : mode === "login" ? "LOG IN" : "CREATE ACCOUNT"}
          {!loading && <ArrowUpRight size={17}/>}
        </button>
      </form>
      {notice && <p className={"auth-notice auth-notice-" + noticeType} role="status" aria-live="polite">{notice}</p>}
      <p className="auth-footnote">{supabase ? "SECURE AUTHENTICATION VIA SUPABASE" : "AUTHENTICATION NEEDS SETUP"}</p>
    </section>
  </main>;
}
