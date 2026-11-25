import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { getSubjects } from "@/lib/catalog";
import { Logo } from "./logo";

const linkCls =
  "rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground";
const activeCls = "text-foreground";

function Dropdown({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="group relative">
      <button
        type="button"
        className={`${linkCls} inline-flex items-center gap-1`}
        aria-haspopup="true"
      >
        {label}
        <ChevronDown className="size-3.5 transition-transform group-hover:rotate-180" />
      </button>
      <div className="invisible absolute top-full left-0 z-50 pt-2 opacity-0 transition-all group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
        <div className="min-w-60 rounded-2xl border bg-popover p-2 shadow-lift">{children}</div>
      </div>
    </div>
  );
}

const dropItem =
  "block rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-primary-soft";

export function SiteHeader() {
  const subjects = getSubjects();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center lg:flex" aria-label="Main">
          <Dropdown label="Subjects">
            {subjects.map((s) => (
              <Link
                key={s.slug}
                to="/subjects/$subject"
                params={{ subject: s.slug }}
                className={dropItem}
              >
                {s.name}
              </Link>
            ))}
            <Link to="/subjects" className={`${dropItem} font-semibold text-primary`}>
              All subjects
            </Link>
          </Dropdown>
          <Dropdown label="Exam Prep">
            <Link to="/exams/nclex-rn" className={dropItem}>
              <span className="font-semibold">NCLEX-RN</span>
              <span className="block text-xs text-muted-foreground">
                Licensure for registered nurses
              </span>
            </Link>
            <Link to="/exams/hesi-a2" className={dropItem}>
              <span className="font-semibold">HESI A2</span>
              <span className="block text-xs text-muted-foreground">Nursing school admission</span>
            </Link>
          </Dropdown>
          <Link to="/free-resources" className={linkCls} activeProps={{ className: activeCls }}>
            Free Resources
          </Link>
          <Link to="/premium" className={linkCls} activeProps={{ className: activeCls }}>
            Premium
          </Link>
          <Link to="/bundles" className={linkCls} activeProps={{ className: activeCls }}>
            Bundles
          </Link>
          <Link to="/blog" className={linkCls} activeProps={{ className: activeCls }}>
            Blog
          </Link>
          <Link to="/about" className={linkCls} activeProps={{ className: activeCls }}>
            About
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="hero" size="sm" className="h-9 rounded-full px-4">
            <Link to="/free-resources">
              <span className="hidden sm:inline">Get Free Ebooks</span>
              <span className="sm:hidden">Free Ebooks</span>
            </Link>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="text-left font-display text-xl font-normal">Menu</SheetTitle>
              </SheetHeader>
              <nav className="mt-2 flex flex-col gap-1 px-4 pb-8" aria-label="Mobile">
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between rounded-xl px-3 py-3 font-medium hover:bg-muted">
                    Subjects{" "}
                    <ChevronDown className="size-4 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="ml-3 flex flex-col border-l pl-2">
                    {subjects.map((s) => (
                      <Link
                        key={s.slug}
                        to="/subjects/$subject"
                        params={{ subject: s.slug }}
                        onClick={close}
                        className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
                      >
                        {s.name}
                      </Link>
                    ))}
                    <Link
                      to="/subjects"
                      onClick={close}
                      className="rounded-lg px-3 py-2 text-sm font-semibold text-primary"
                    >
                      All subjects
                    </Link>
                  </div>
                </details>
                {(
                  [
                    ["/exams/nclex-rn", "NCLEX-RN Prep"],
                    ["/exams/hesi-a2", "HESI A2 Prep"],
                    ["/free-resources", "Free Resources"],
                    ["/premium", "Premium"],
                    ["/bundles", "Bundles"],
                    ["/blog", "Blog"],
                    ["/about", "About"],
                    ["/testimonials", "Testimonials"],
                    ["/contact", "Contact"],
                  ] as const
                ).map(([to, label]) => (
                  <Link
                    key={to}
                    to={to}
                    onClick={close}
                    className="rounded-xl px-3 py-3 font-medium hover:bg-muted"
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
