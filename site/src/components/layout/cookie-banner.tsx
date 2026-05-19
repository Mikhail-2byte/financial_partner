"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const STORAGE_KEY = "fp-cookie-consent";

function subscribe() {
  return () => {};
}

function getSnapshot(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === "accepted";
  } catch {
    return true;
  }
}

function getServerSnapshot(): boolean {
  return true;
}

export function CookieBanner() {
  const accepted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [dismissed, setDismissed] = useState(false);

  if (accepted || dismissed) return null;

  function accept() {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {}
    setDismissed(true);
  }

  return (
    <div
      role="dialog"
      aria-label="Уведомление об использовании cookies"
      className="fixed inset-x-0 bottom-0 z-50 bg-brand-800 text-cream shadow-2xl border-t border-brand-900"
    >
      <Container className="py-4 md:py-5">
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
          <p className="text-sm leading-relaxed text-cream/90 flex-1">
            Сайт использует cookies для аналитики и корректной работы интерфейса.
            Продолжая использовать сайт, вы соглашаетесь с{" "}
            <Link
              href="/policy"
              className="underline underline-offset-2 hover:text-accent-400"
            >
              политикой конфиденциальности
            </Link>
            .
          </p>
          <Button
            variant="accent"
            size="sm"
            onClick={accept}
            className="self-start md:self-auto shrink-0"
          >
            Принять
          </Button>
        </div>
      </Container>
    </div>
  );
}
