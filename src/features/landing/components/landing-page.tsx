import { SiteFooter, SiteNav } from "./chrome";
import { Hero } from "./hero";
import { Faq, FinalCta, Pricing, Requirements, Roadmap } from "./info";
import { HowItWorks, LarkSync, Problem, ReviewLoop, Safety } from "./product";

export function LandingPage() {
  return (
    <>
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <SiteNav />
      <main id="top" tabIndex={-1} className="outline-none">
        <Hero />
        <Problem />
        <HowItWorks />
        <LarkSync />
        <ReviewLoop />
        <Safety />
        <Requirements />
        <Roadmap />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
