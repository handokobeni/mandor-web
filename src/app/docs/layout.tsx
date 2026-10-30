import { Wrap } from "@/components/molecules";
import { DocsPager, DocsSidebar, OnThisPage } from "@/features/docs";
import { SiteFooter, SiteNav } from "@/features/landing";

export default function DocsLayout({ children }: LayoutProps<"/docs">) {
  return (
    <>
      <SiteNav />
      <Wrap className="grid gap-10 py-10 lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[220px_minmax(0,1fr)_200px]">
        <aside className="lg:sticky lg:top-20 lg:max-h-[calc(100dvh-6rem)] lg:self-start lg:overflow-y-auto">
          <details className="group rounded-xl border lg:hidden">
            <summary className="cursor-pointer list-none px-4 py-3 text-sm font-medium [&::-webkit-details-marker]:hidden">
              Docs menu
            </summary>
            <div className="border-t px-1 py-4">
              <DocsSidebar />
            </div>
          </details>
          <div className="hidden lg:block">
            <DocsSidebar />
          </div>
        </aside>
        <main id="top" className="min-w-0">
          <article data-docs-article className="max-w-[720px] text-[15.5px]">
            {children}
          </article>
          <div className="max-w-[720px]">
            <DocsPager />
          </div>
        </main>
        <aside className="hidden xl:sticky xl:top-20 xl:block xl:self-start">
          <OnThisPage />
        </aside>
      </Wrap>
      <SiteFooter />
    </>
  );
}
