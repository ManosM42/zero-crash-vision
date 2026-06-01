import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Toaster } from "sonner";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { Services } from "@/components/Services";
import { HowItWorks } from "@/components/HowItWorks";
import { Portfolio } from "@/components/Portfolio";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { IntroOverlay } from "@/components/IntroOverlay";
import { ScrollProgress } from "@/components/ScrollProgress";
import { MacBookIntro } from "@/components/MacBookIntro";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "ZEROCRASH — Premium Web Development Agency" },
      {
        name: "description",
        content:
          "ZEROCRASH builds futuristic, high-performance websites and full-stack apps. 4+ years, 50+ shipped projects.",
      },
      { property: "og:title", content: "ZEROCRASH — We build websites that don't break." },
      {
        property: "og:description",
        content: "Premium futuristic web development. React, Next.js, Three.js, full-stack.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Syne:wght@400;500;600;700&display=swap",
      },
    ],
  }),
});

function Index() {
  // Phase 1: IntroOverlay playing  → showIntroOverlay=true,  showMacBook=false
  // Phase 2: MacBook intro playing → showIntroOverlay=false, showMacBook=true
  // Phase 3: Real site             → showIntroOverlay=false, showMacBook=false (MacBook fades itself out)
  const [showIntroOverlay, setShowIntroOverlay] = useState(true);
  const [showMacBook, setShowMacBook] = useState(false);
  const [showRealSite, setShowRealSite] = useState(false);

  // When IntroOverlay finishes, start MacBook intro
  function handleIntroOverlayDone() {
    setShowIntroOverlay(false);
    setShowMacBook(true);
    // Lock scroll while MacBook is active (it uses its own scroll spacer)
    document.body.style.overflow = "auto";
  }

  // When MacBook scroll animation fully completes
  function handleMacBookDone() {
    setShowMacBook(false);
    setShowRealSite(true);
    // Scroll to top of real site
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  // Prevent scroll during IntroOverlay
  useEffect(() => {
    if (showIntroOverlay) {
      document.body.style.overflow = "hidden";
    }
  }, [showIntroOverlay]);

  // ─── Phase 1: IntroOverlay ───────────────────────────────────────────────
  if (showIntroOverlay) {
    return (
      <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
        {/* Pass onComplete to your existing IntroOverlay — add that prop if it doesn't have it */}
        <IntroOverlay onComplete={handleIntroOverlayDone} />
        <Toaster theme="dark" position="bottom-right" />
      </div>
    );
  }

  // ─── Phase 2: MacBook 3D intro ───────────────────────────────────────────
  if (showMacBook) {
    return (
      <div className="bg-background text-foreground overflow-x-hidden">
        <Toaster theme="dark" position="bottom-right" />
        <MacBookIntro onComplete={handleMacBookDone} />
      </div>
    );
  }

  // ─── Phase 3: Real site ───────────────────────────────────────────────────
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <ScrollProgress />
      <Toaster theme="dark" position="bottom-right" />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Services />
        <HowItWorks />
        <Portfolio />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}