import { FAQ, LandingPage } from "@/features/landing";
import { faqLd, JsonLd, productLd } from "@/features/seo";
import { SITE_URL } from "@/lib/site";

export default function Home() {
  return (
    <>
      <LandingPage />
      <JsonLd data={productLd(SITE_URL)} />
      <JsonLd data={faqLd(FAQ)} />
    </>
  );
}
