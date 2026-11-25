import { Link } from "@tanstack/react-router";
import { Logo } from "./logo";
import { SITE } from "@/content/site";

const col = "flex flex-col gap-2.5 text-sm";
const item = "text-muted-foreground transition-colors hover:text-foreground";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t bg-surface">
      <div className="container-page grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{SITE.description}</p>
          {SITE.socials.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-3">
              {SITE.socials.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${item} text-sm`}
                >
                  {s.label}
                </a>
              ))}
            </div>
          )}
        </div>
        <div className={col}>
          <p className="eyebrow mb-1">Resources</p>
          <Link to="/free-resources" className={item}>
            Free Resources
          </Link>
          <Link to="/premium" className={item}>
            Premium
          </Link>
          <Link to="/bundles" className={item}>
            Bundles
          </Link>
          <Link to="/subjects" className={item}>
            Subjects
          </Link>
          <Link to="/exams/nclex-rn" className={item}>
            NCLEX-RN
          </Link>
          <Link to="/exams/hesi-a2" className={item}>
            HESI A2
          </Link>
        </div>
        <div className={col}>
          <p className="eyebrow mb-1">Company</p>
          <Link to="/about" className={item}>
            About
          </Link>
          <Link to="/testimonials" className={item}>
            Testimonials
          </Link>
          <Link to="/blog" className={item}>
            Blog
          </Link>
          <Link to="/contact" className={item}>
            Contact
          </Link>
        </div>
        <div className={col}>
          <p className="eyebrow mb-1">Legal</p>
          <Link to="/legal/privacy" className={item}>
            Privacy Policy
          </Link>
          <Link to="/legal/terms" className={item}>
            Terms of Use
          </Link>
          <Link to="/legal/disclaimer" className={item}>
            Disclaimer
          </Link>
          <Link to="/legal/refunds" className={item}>
            Refund Policy
          </Link>
          <Link to="/legal/cookies" className={item}>
            Cookie Policy
          </Link>
        </div>
      </div>
      <div className="border-t">
        <div className="container-page flex flex-col gap-3 py-6 text-xs leading-relaxed text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.name}. For educational purposes only — not medical
            advice.\n NCLEX-RN® is a registered trademark of NCSBN. HESI® is a registered trademark
            of Elsevier.\n Neither is affiliated with this site.
          </p>
          <p className="shrink-0">Purchases and downloads processed securely by Gumroad.</p>
        </div>
      </div>
    </footer>
  );
}
