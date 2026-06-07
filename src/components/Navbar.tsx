"use client";
import { useState, useEffect, useRef } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { Button } from "./Button";
import { useAuth } from "../context/AuthContext";

export interface NavbarLink {
  label: string;
  href: string;
}

export interface NavbarProps {
  links?: NavbarLink[];
}

const defaultLinks: NavbarLink[] = [
  { label: "Inicio", href: "/" },
  { label: "Guías", href: "/guias" },
  { label: "Cursos", href: "/cursos" },
  { label: "Acerca de", href: "/acerca-de" },
];

const closeIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const menuIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

export function Navbar({ links = defaultLinks }: NavbarProps) {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen && menuRef.current) {
      menuRef.current.focus();
    }
  }, [isMobileMenuOpen]);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border-card bg-surface-page/95 backdrop-blur-sm py-4">
      <div className="flex items-center justify-between gap-4 px-16">
        <div className="flex items-center gap-6 text-sm font-medium text-text-body">
          <NavLink to="/" className="flex items-center gap-2">
            <img src="/emcode.svg" alt="Emcode" width={24} height={24} />
            <span className="font-semibold tracking-wider">EMCODE</span>
          </NavLink>
          <nav className="hidden items-center gap-6 md:flex">
            {links.map((link) => (
              <NavLink
                key={link.label}
                to={link.href}
                end={link.href === "/"}
                className={({ isActive }) =>
                  `text-sm transition hover:text-text-headings border-b-2 ${
                    isActive
                      ? "border-primary-700 text-text-headings"
                      : "border-transparent text-text-body"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-3 md:flex">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-text-body">
                  {user?.name}
                </span>
                <Button
                  type="button"
                  variant="secondary"
                  className="border border-border-card bg-transparent text-text-body hover:bg-surface-action-hover-2"
                  onPress={() => { logout(); navigate("/"); }}
                >
                  Cerrar sesión
                </Button>
              </>
            ) : (
              <>
                <Button
                  type="button"
                  variant="secondary"
                  className="border border-border-card bg-transparent text-text-body hover:bg-surface-action-hover-2"
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
              </>
            )}
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Abrir menú de navegación"
            className="flex items-center justify-center md:hidden p-3 min-h-[44px] min-w-[44px] text-text-body"
            aria-expanded={isMobileMenuOpen}
          >
            {menuIcon}
          </button>
        </div>
      </div>

      <div
        ref={menuRef}
        tabIndex={-1}
        className={`fixed inset-0 z-50 flex flex-col md:hidden transition-opacity duration-200 ease-in-out ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{ backgroundColor: '#fff' }}
      >
        <div
          className={`flex flex-1 flex-col justify-between transition-transform duration-200 ease-in-out bg-surface-page ${
            isMobileMenuOpen ? "translate-y-0" : "-translate-y-4"
          }`}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-border-card">
            <span className="font-semibold tracking-wider">EMCODE</span>
            <button
              onClick={closeMenu}
              aria-label="Cerrar menú"
              className="flex items-center justify-center p-3 min-h-[44px] min-w-[44px] text-text-body"
            >
              {closeIcon}
            </button>
          </div>

          <nav className="flex flex-col items-stretch gap-8 px-6 mb-16 bg-surface-page">
            {links.map((link) => (
              <NavLink
                key={link.label}
                to={link.href}
                end={link.href === "/"}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `text-lg py-3 min-h-[44px] pl-4 flex items-center transition hover:text-text-headings border-l-2 ${
                    isActive
                      ? "border-primary-700 text-text-headings font-semibold"
                      : "border-transparent text-text-body"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex flex-col items-stretch gap-4 px-6 pb-8 bg-surface-page">
            {isAuthenticated ? (
              <>
                <p className="text-sm text-text-body text-center py-2">
                  {user?.name}
                </p>
                <Button
                  variant="secondary"
                  onPress={() => {
                    logout();
                    navigate("/");
                    closeMenu();
                  }}
                >
                  Cerrar sesión
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="secondary"
                  onPress={() => {
                    navigate("/login");
                    closeMenu();
                  }}
                >
                  Iniciar sesión
                </Button>
                <Button
                  onPress={() => {
                    navigate("/register");
                    closeMenu();
                  }}
                >
                  Regístrate
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
