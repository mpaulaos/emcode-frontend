"use client";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";

export interface NavbarLink {
  label: string;
  href: string;
}

export interface NavbarProps {
  logo?: React.ReactNode;
  links?: NavbarLink[];
}

const defaultLinks: NavbarLink[] = [
  { label: "Inicio", href: "/" },
  { label: "Guías", href: "#" },
  { label: "Cursos", href: "#" },
  { label: "Acerca de", href: "#" },
];

export function Navbar({ logo = "LOGO", links = defaultLinks }: NavbarProps) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 mx-16 border-b border-neutral-200 bg-neutral-100/95 backdrop-blur-sm py-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-6 text-sm font-medium text-neutral-700">
          <span className="font-semibold uppercase">{logo}</span>
          <nav className="hidden items-center gap-6 md:flex">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-neutral-700 transition hover:text-neutral-900"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="secondary"
            className="border border-neutral-300 bg-transparent text-neutral-700 hover:bg-neutral-100"
            onPress={() => navigate("/login")}
          >
            Iniciar sesión
          </Button>
          <Button
            type="button"
            variant="primary"
            className="px-4"
            onPress={() => navigate("/register")}
          >
            Regístrate
          </Button>
        </div>
      </div>
    </header>
  );
}
