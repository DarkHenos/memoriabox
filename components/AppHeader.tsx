"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import LogoIcon from "./LogoIcon";

export default function AppHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/fonctionnalites", label: "Fonctionnalités" },
    { href: "/templates", label: "Exemples" },
    { href: "/tarifs", label: "Tarifs" },
    { href: "/faq", label: "FAQ" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="container-max">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <LogoIcon size={32} />
            <span className="font-title text-xl text-encre group-hover:text-or transition-colors">
              MemoriaBox
            </span>
          </Link>

          {/* Nav desktop (avec CTA) */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-or transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="btn btn-primary text-sm px-4 py-2 shadow-sm hover:shadow-md transition whitespace-nowrap"
            >
              Démarrer mon projet
            </Link>
          </nav>

          {/* Burger menu trigger */}
          <button
            onClick={() => setIsMenuOpen((v) => !v)}
            className="lg:hidden p-2"
            aria-label="Ouvrir le menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menu mobile (CTA dedans uniquement en <lg) */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-gray-700 hover:text-or transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {/* CTA uniquement en mobile */}
            <Link
              href="/contact"
              className="btn btn-primary w-full mt-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Démarrer mon projet
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
