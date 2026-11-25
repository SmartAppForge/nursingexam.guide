import type { ReactNode } from "react";

import { PageHeader } from "./page-header";

export function LegalPage({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageHeader eyebrow="Legal" title={title} intro={intro} crumbs={[{ label: title }]} />
      <div className="container-page py-14">
        <div className="mx-auto max-w-3xl">
          <p className="rounded-2xl bg-primary-soft px-5 py-4 text-sm text-accent-foreground">
            This page is a working draft pending final review by the site owner.
          </p>
          <div className="prose-page mt-8">{children}</div>
        </div>
      </div>
    </>
  );
}
