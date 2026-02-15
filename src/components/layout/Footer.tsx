import Link from "next/link";

import { milemendContent } from "@/content/milemend";
import type { MilemendContent } from "@/content/milemend";

type FooterProps = {
  content?: MilemendContent;
};

export function Footer({ content = milemendContent }: FooterProps) {
  const year = new Date().getFullYear();
  const { footer } = content;
  const hasEmail = footer.contact.email.trim().length > 0;
  const hasLocation = footer.contact.location.trim().length > 0;
  const hasPhone = footer.contact.phone.trim().length > 0;
  const footerLinkClass =
    "text-[#30ff05] visited:text-[#30ff05] transition-colors hover:text-[#30ff05] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#30ff05]";

  return (
    <footer className="bg-slate-950 text-slate-100">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_2fr] lg:px-8">
        <section aria-label={`${content.brand.name} overview`}>
          <p className="text-lg font-bold">{content.brand.name}</p>
          <p className="mt-3 text-sm text-slate-300">{content.brand.shortDescription}</p>
          {hasEmail || hasLocation || hasPhone ? (
            <ul className="mt-6 space-y-2 text-sm text-slate-300">
              {hasEmail ? (
                <li>
                  <a
                    href={`mailto:${footer.contact.email}`}
                    className={footerLinkClass}
                  >
                    {footer.contact.email}
                  </a>
                </li>
              ) : null}
              {hasLocation ? <li>{footer.contact.location}</li> : null}
              {hasPhone ? (
                <li>
                  <a
                    href={`tel:${footer.contact.phone}`}
                    className={footerLinkClass}
                  >
                    {footer.contact.phone}
                  </a>
                </li>
              ) : null}
            </ul>
          ) : null}
        </section>

        <nav aria-label="Footer links">
          <ul className="grid gap-3 sm:grid-cols-2">
            {footer.links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={`text-sm ${footerLinkClass}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-xs text-slate-300 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>{`© ${year} ${content.brand.name}. All rights reserved.`}</p>
          <nav aria-label="Legal links">
            <ul className="flex flex-wrap items-center gap-4">
              {footer.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={footerLinkClass}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
