"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { brand, contacts } from "@/content/brand";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/tarify", label: "Тарифы" },
  { href: "/o-kompanii", label: "О компании" },
  { href: "/kontakty", label: "Контакты" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 bg-cream/85 backdrop-blur-md border-b border-line">
      <Container className="flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group" aria-label={brand.name}>
          <div className="size-9 md:size-10 rounded-lg bg-brand-700 text-cream flex items-center justify-center font-extrabold tracking-tight">
            ФП
          </div>
          <span className="hidden sm:block font-display font-extrabold text-lg leading-none">
            {brand.name}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink hover:text-brand-700 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3 md:gap-5">
          <a
            href={`tel:${contacts.phoneRaw}`}
            className="hidden md:flex items-center gap-2 text-sm font-semibold text-ink hover:text-brand-700 transition-colors"
          >
            <Phone className="size-4" />
            {contacts.phone}
          </a>
          <Button size="sm" variant="primary" className="hidden md:inline-flex" asChild>
            <Link href="#lead-form">Консультация</Link>
          </Button>

          <button
            type="button"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="lg:hidden p-2 -mr-2"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </Container>

      {/* Backdrop под drawer — закрывает по клику вне */}
      {open && (
        <button
          type="button"
          aria-label="Закрыть меню"
          onClick={() => setOpen(false)}
          className="lg:hidden fixed inset-x-0 top-16 md:top-20 bottom-0 z-30 bg-ink/30 backdrop-blur-[2px]"
        />
      )}

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        className={cn(
          "lg:hidden relative z-40 border-t border-line bg-cream overflow-hidden transition-[max-height] duration-300 ease-out",
          open ? "max-h-[480px]" : "max-h-0",
        )}
      >
        <Container className="py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-2 py-3 rounded-lg hover:bg-brand-50 font-medium"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={`tel:${contacts.phoneRaw}`}
            className="px-2 py-3 rounded-lg hover:bg-brand-50 font-semibold flex items-center gap-2"
          >
            <Phone className="size-4" />
            {contacts.phone}
          </a>
          <Button size="md" variant="primary" className="mt-2" asChild>
            <Link href="#lead-form" onClick={() => setOpen(false)}>
              Получить консультацию
            </Link>
          </Button>
        </Container>
      </div>
    </header>
  );
}
