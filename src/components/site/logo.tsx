import { Link } from "@tanstack/react-router";

export function Logo() {
  return (
    <Link to="/" className="group flex items-center gap-2.5" aria-label="NursingExam.guide home">
      <span
        aria-hidden
        className="relative grid size-8 place-items-center rounded-full bg-primary-soft ring-1 ring-primary/15"
      >
        <span className="absolute h-3.5 w-1 rounded-full bg-primary" />
        <span className="absolute h-1 w-3.5 rounded-full bg-primary" />
        <span className="absolute -right-0.5 -bottom-0.5 size-2.5 rounded-full bg-sage ring-2 ring-background" />
      </span>
      <span className="font-display text-xl tracking-tight text-foreground">
        NursingExam<span className="text-sage-deep">.guide</span>
      </span>
    </Link>
  );
}
