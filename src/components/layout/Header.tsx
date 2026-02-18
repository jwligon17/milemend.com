"use client";

import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { createPortal } from "react-dom";

import { milemendContent } from "@/content/milemend";
import type { MainNavItem, MilemendContent } from "@/content/milemend";

type HeaderProps = {
  content?: MilemendContent;
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function columnsClass(count: number) {
  if (count >= 3) return "md:grid-cols-3";
  if (count === 2) return "md:grid-cols-2";
  return "md:grid-cols-2";
}

function getNavHref(item: MainNavItem) {
  if (item.href) return item.href;
  return item.megaMenu?.groups[0]?.links[0]?.href ?? "#";
}

export function Header({ content = milemendContent }: HeaderProps) {
  const desktopNav = useMemo(() => content.mainNav, [content.mainNav]);
  const [openDesktopIndex, setOpenDesktopIndex] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobileIndex, setOpenMobileIndex] = useState<number | null>(null);
  const [failedLogoSrc, setFailedLogoSrc] = useState<string | null>(null);
  const [mounted] = useState(() => typeof window !== "undefined");

  const wrapperRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const mobileDrawerRef = useRef<HTMLDivElement | null>(null);
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const panelId = useId();
  const logoSrc = content.brand.logo?.src;
  const logoAlt = content.brand.logo?.alt ?? content.brand.name;
  const logoAvailable = Boolean(logoSrc) && failedLogoSrc !== logoSrc;

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      const target = event.target as Node;

      if (mobileOpen && mobileDrawerRef.current?.contains(target)) return;
      if (wrapperRef.current?.contains(target)) return;

      setOpenDesktopIndex(null);
      setMobileOpen(false);
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenDesktopIndex((current) => {
          if (current !== null) triggerRefs.current[current]?.focus();
          return null;
        });
        setMobileOpen(false);
      }
    }

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (openDesktopIndex === null) return;

    function onFocusIn(event: FocusEvent) {
      const target = event.target as Node;
      if (!wrapperRef.current?.contains(target)) {
        setOpenDesktopIndex(null);
      }
    }

    window.addEventListener("focusin", onFocusIn);
    return () => {
      window.removeEventListener("focusin", onFocusIn);
    };
  }, [openDesktopIndex]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }

    document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleDesktopKeyDown = (
    event: ReactKeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    const lastIndex = desktopNav.length - 1;
    if (event.key === "ArrowRight") {
      event.preventDefault();
      const next = index === lastIndex ? 0 : index + 1;
      triggerRefs.current[next]?.focus();
      setOpenDesktopIndex(next);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      const prev = index === 0 ? lastIndex : index - 1;
      triggerRefs.current[prev]?.focus();
      setOpenDesktopIndex(prev);
    }
    if (event.key === "Enter" || event.key === " " || event.key === "ArrowDown") {
      event.preventDefault();
      setOpenDesktopIndex(index);
      requestAnimationFrame(() => {
        const firstLink = panelRef.current?.querySelector<HTMLAnchorElement>("a[href]");
        firstLink?.focus();
      });
    }
  };

  return (
    <header
      ref={wrapperRef}
      className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 lg:backdrop-blur-xl supports-[backdrop-filter]:lg:bg-white/65"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:grid lg:grid-cols-[auto_1fr_auto] lg:gap-4 lg:px-8">
        <Link
          href="/"
          className="inline-flex shrink-0 items-center overflow-visible"
          aria-label={content.brand.name}
        >
          {logoAvailable ? (
            <span className="inline-block origin-left scale-100 lg:scale-[2]">
              <img
                src={logoSrc}
                alt={logoAlt}
                className="h-9 w-auto max-w-[180px] sm:max-w-[220px] lg:max-w-none"
                onError={() => setFailedLogoSrc(logoSrc ?? null)}
              />
            </span>
          ) : (
            <span className="inline-flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-slate-950 text-sm font-bold text-white">
                MM
              </span>
              <span className="text-lg font-bold tracking-tight text-slate-950">
                {content.brand.name}
              </span>
            </span>
          )}
        </Link>
        {logoSrc ? (
          <a href={logoSrc} target="_blank" rel="noreferrer" className="sr-only">
            Open logo
          </a>
        ) : null}

        <nav className="hidden justify-self-center lg:block" aria-label="Main Navigation">
          <ul className="flex items-center gap-8">
            {desktopNav.map((item, index) => {
              const hasMegaMenu = Boolean(item.megaMenu?.groups?.length);
              const isOpen = openDesktopIndex === index;
              const controls = `${panelId}-${index}`;

              return (
                <li key={item.label}>
                  {hasMegaMenu ? (
                    <button
                      ref={(element) => {
                        triggerRefs.current[index] = element;
                      }}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={controls}
                      onClick={() => setOpenDesktopIndex(isOpen ? null : index)}
                      onFocus={() => setOpenDesktopIndex(index)}
                      onKeyDown={(event) => handleDesktopKeyDown(event, index)}
                      className={cn(
                        "inline-flex min-h-[44px] items-center border-b-2 border-transparent px-0.5 py-0 text-sm font-normal leading-none transition-colors",
                        isOpen
                          ? "border-slate-900 text-slate-950"
                          : "text-slate-900 hover:border-slate-900 hover:text-slate-950",
                      )}
                    >
                      {item.label}
                    </button>
                  ) : (
                    <Link
                      href={getNavHref(item)}
                      className="inline-flex min-h-[44px] items-center border-b-2 border-transparent px-0.5 py-0 text-sm font-normal text-slate-900 leading-none transition-colors hover:border-slate-900 hover:text-slate-950"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          type="button"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-drawer"
          onClick={() => setMobileOpen((value) => !value)}
          className="ml-auto inline-flex shrink-0 items-center rounded-md border border-slate-300 px-3 py-2 text-sm font-normal text-slate-800 lg:hidden"
        >
          Menu
        </button>
      </div>

      {openDesktopIndex !== null && desktopNav[openDesktopIndex]?.megaMenu ? (
        <div
          id={`${panelId}-${openDesktopIndex}`}
          ref={panelRef}
          role="dialog"
          aria-modal="false"
          aria-label={`${desktopNav[openDesktopIndex].label} menu`}
          className="absolute inset-x-0 border-y border-slate-200 bg-white shadow-lg"
        >
          <div
            className={cn(
              "mx-auto grid max-w-7xl gap-6 px-4 py-7 sm:px-6 lg:px-8",
              columnsClass(desktopNav[openDesktopIndex].megaMenu!.groups.length),
            )}
          >
            {desktopNav[openDesktopIndex].megaMenu!.groups.map((group) => (
              <div key={group.title}>
                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-cyan-800">
                  {group.title}
                </p>
                <ul className="space-y-1">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="block rounded-md px-2 py-2 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700"
                        onClick={() => setOpenDesktopIndex(null)}
                      >
                        <p className="text-sm font-bold text-slate-900">{link.label}</p>
                        {link.description ? (
                          <p className="mt-0.5 text-sm text-slate-600">{link.description}</p>
                        ) : null}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {mobileOpen && mounted
        ? createPortal(
            <div className="lg:hidden">
              <div
                className="pointer-events-auto fixed inset-0 z-[1000] bg-slate-950/55"
                aria-hidden
                onClick={() => setMobileOpen(false)}
              />
              <div
                ref={mobileDrawerRef}
                id="mobile-nav-drawer"
                className="pointer-events-auto fixed inset-y-0 right-0 z-[1100] w-full max-w-sm overflow-y-auto border-l border-slate-200 bg-white p-5 shadow-xl"
                role="dialog"
                aria-modal="true"
                aria-label="Mobile navigation"
              >
                <div className="mb-6 flex items-center justify-between">
                  <p className="text-sm font-bold text-slate-900">{content.brand.name}</p>
                  <button
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-md border border-slate-300 px-3 py-1.5 text-sm text-slate-700"
                  >
                    Close
                  </button>
                </div>

                <ul className="pointer-events-auto space-y-2">
                  {content.mainNav.map((item, index) => {
                    const groups = item.megaMenu?.groups ?? [];
                    const isOpen = openMobileIndex === index;
                    const accordionId = `mobile-accordion-${index}`;

                    if (!groups.length) {
                      return (
                        <li key={item.label} className="pointer-events-auto">
                          <Link
                            href={getNavHref(item)}
                            className="pointer-events-auto block rounded-md border border-slate-200 px-4 py-3 text-sm font-normal text-slate-800"
                            onClick={() => setMobileOpen(false)}
                          >
                            {item.label}
                          </Link>
                        </li>
                      );
                    }

                    return (
                      <li
                        key={item.label}
                        className="pointer-events-auto rounded-lg border border-slate-200"
                      >
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={accordionId}
                          onClick={() => setOpenMobileIndex(isOpen ? null : index)}
                          className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-bold text-slate-900"
                        >
                          <span>{item.label}</span>
                          <span aria-hidden>{isOpen ? "−" : "+"}</span>
                        </button>

                        {isOpen ? (
                          <div id={accordionId} className="space-y-4 px-4 pb-4">
                            {groups.map((group) => (
                              <div key={group.title}>
                                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-cyan-800">
                                  {group.title}
                                </p>
                                <ul className="pointer-events-auto space-y-1">
                                  {group.links.map((link) => (
                                    <li key={link.label} className="pointer-events-auto">
                                      <Link
                                        href={link.href}
                                        onClick={() => setMobileOpen(false)}
                                        className="pointer-events-auto block rounded-md px-2 py-2 text-sm text-slate-700 transition hover:bg-slate-100"
                                      >
                                        {link.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        ) : null}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>,
            document.body,
          )
        : null}
    </header>
  );
}
