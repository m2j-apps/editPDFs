"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

interface AdUnitProps {
  slot: string;
  format?: "auto" | "horizontal" | "vertical" | "rectangle";
  className?: string;
}

const ADS_ENABLED = process.env.NEXT_PUBLIC_ADS_ENABLED === "true";

export default function AdUnit({ slot, format = "auto", className = "" }: AdUnitProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (ADS_ENABLED) setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && ADS_ENABLED) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error("AdSense error:", e);
      }
    }
  }, [mounted]);

  if (!ADS_ENABLED) return null;

  // Don't render on server to avoid hydration mismatch
  if (!mounted) {
    return <div className={`ad-container ${className}`} />;
  }

  return (
    <div className={`ad-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-2930855156227557"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
