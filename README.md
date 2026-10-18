# WEIREN — Wear It Different

A modern editorial-style thrift clothing storefront built with Next.js, TypeScript, and custom responsive CSS. The first iteration is a frontend demo with sample inventory, product search, saved-item buttons, and a local demo bag.

## Stack
- Next.js App Router
- TypeScript
- Custom responsive CSS
- Supabase packages included for the next data/auth integration phase
- Vercel deployment

## Run locally

    npm install
    npm run dev

Open http://localhost:3000.

## Current demo behavior
- Responsive landing page and product discovery sections
- Search filters the sample product list
- Wishlist and bag state work in the current browser session only
- Product details routes for the four sample items
- Product imagery uses remote Unsplash image URLs
- Newsletter form is a UI demo and does not store email addresses

## Before real sales
1. Create a Supabase project and set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in Vercel.
2. Add a products table with Row Level Security and connect product listings to Supabase.
3. Implement persistent carts, orders, and server-verified inventory reservation.
4. Integrate a payment provider and configure shipping, returns, privacy, and terms pages.
5. Replace sample product data and images with actual inventory.

Never commit secret keys or service-role keys to GitHub. A publishable key is designed for client use, but database access must still be protected with correct RLS policies.
