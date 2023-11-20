"use client";
import Link from "next/link";

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { useEffect } from "react";

import AOS from 'aos';
import 'aos/dist/aos.css';

export default function IndexPage() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <section className="md:py-10 flex flex-col justify-center items-center h-screen">
      <h1 data-aos="fade-up" data-aos-delay="300" className="text-3xl text-center font-extrabold leading-tight tracking-tighter md:text-4xl">
        GitHub Statistics Made Simple
      </h1>
      <p data-aos="fade-up" data-aos-delay="400" className="mt-2 max-w-[700px] text-lg text-center text-muted-foreground">
        Find statistics about your repositories on GitHub in just a few clicks.
      </p>
    </section>
  )
}
