"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

const GA_ID = "G-KHFN221VE5";

declare global {
  interface Window {
    dataLayer: unknown[][];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * GA4 manual pageviews for a statically exported Next.js App Router site.
 * Section changes (/#projects, /#education, etc.) do NOT count as pageviews.
 * In GA4's Web stream settings, disable Enhanced Measurement ->
 * Page views -> "Page changes based on browser history events".
 */
export default function GoogleAnalyticsTracker() {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const initialized = useRef(false);
  const lastTrackedPath = useRef<string | null>(null);
  const previousPageLocation = useRef<string | null>(null);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Set up the official gtag command queue BEFORE loading gtag.js.
    window.dataLayer = window.dataLayer || [];
    window.gtag = (...args: unknown[]) => {
      window.dataLayer.push(args);
    };

    window.gtag("js", new Date());
    window.gtag("config", GA_ID, {
      send_page_view: false,
    });

    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || !pathname || lastTrackedPath.current === pathname) return;

    // usePathname changes on real routes but not when only the #hash changes.
    lastTrackedPath.current = pathname;
    const pageLocation =
      window.location.origin +
      window.location.pathname +
      window.location.search;

    window.gtag?.("event", "page_view", {
      page_title: document.title,
      page_location: pageLocation,
      page_referrer: previousPageLocation.current || document.referrer,
    });

    previousPageLocation.current = pageLocation;
  }, [pathname, ready]);

  // afterInteractive keeps Analytics out of the critical render path.
  return ready ? (
    <Script
      id="rmp-google-analytics"
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      strategy="afterInteractive"
    />
  ) : null;
}
