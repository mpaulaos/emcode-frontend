"use client";
import { useState, useEffect, useRef } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import NavTTSLink from "./NavTTSLink";
import { Button } from "../ui/Button";
import { useAuth } from "../../context/AuthContext";
import { useButtonTTS } from "../../hooks/useButtonTTS";

export interface NavbarLink {
  label: string;
  href: string;
}

export interface NavbarProps {
  links?: NavbarLink[];
  onAccessibilityOpen?: () => void;
}

const defaultLinks: NavbarLink[] = [
  { label: "Inicio", href: "/" },
  { label: "Guías", href: "/guias" },
  { label: "Discapacidades", href: "/disabilities" },
  // { label: "Cursos", href: "/cursos" },
  { label: "Acerca de", href: "/acerca-de" },
];

const accessibilityIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <circle cx="16" cy="4" r="1" />
    <path d="m18 19 1-7-6 1" />
    <path d="m5 8 3-3 5.5 3-2.36 3.5" />
    <path d="M4.24 14.5a5 5 0 0 0 6.88 6" />
    <path d="M13.76 17.5a5 5 0 0 0-6.88-6" />
  </svg>
);

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

export function Navbar({ links = defaultLinks, onAccessibilityOpen }: NavbarProps) {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user, isAuthenticated, logout } = useAuth();

  const a11yTTS = useButtonTTS("Abrir panel de accesibilidad");
  const logoutTTS = useButtonTTS("Cerrar sesión");
  const loginTTS = useButtonTTS("Iniciar sesión");
  const registerTTS = useButtonTTS("Regístrate");
  const hamburgerTTS = useButtonTTS("Abrir menú de navegación");
  const closeMobileTTS = useButtonTTS("Cerrar menú");
  const logoTTS = useButtonTTS("EMCODE");
  const mobileA11yTTS = useButtonTTS("Abrir panel de accesibilidad");

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

  const navLinks: NavbarLink[] = [
    ...links.slice(0, 1),
    ...(user?.role === 'student' ? [{ label: "Cursos", href: "/cursos/inscribir" }] : []),
    ...links.slice(1).filter(l => !isAuthenticated || l.label !== "Acerca de"),
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border-card bg-surface-page/95 backdrop-blur-sm py-4">
      <div className="flex items-center justify-between gap-4 px-6 sm:px-16">
        <div className="flex items-center gap-6 text-sm font-medium text-text-body">
          <NavLink to="/" className="flex items-center gap-2" {...logoTTS}>
            <img src="/emcode.svg" alt="Emcode" width={24} height={24} />
            <span className="font-semibold tracking-wider">EMCODE</span>
          </NavLink>
          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <NavTTSLink
                key={link.label}
                label={link.label}
                href={link.href}
                end={link.href === "/"}
                className={({ isActive }) =>
                  `text-sm transition hover:text-text-headings border-b-2 ${
                    isActive
                      ? "border-primary-700 text-text-headings"
                      : "border-transparent text-text-body"
                  }`
                }
              />
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onPress={onAccessibilityOpen}
            aria-label="Abrir panel de accesibilidad"
            variant="secondary"
            className="hidden md:flex"
            {...a11yTTS}
          >
            {accessibilityIcon}
          </Button>
          <div className="hidden items-center gap-3 md:flex">
            {isAuthenticated ? (
              <>
                <NavLink to="/profile" className="text-sm text-text-body hover:text-text-headings transition">
                  {user?.firstName} {user?.lastName}
                </NavLink>
                <Button
                  type="button"
                  variant="secondary"
                  className="border border-border-card bg-transparent text-text-body hover:bg-surface-action-hover-2"
                  onPress={() => { logout(); navigate("/"); }}
                  {...logoutTTS}
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
                  {...loginTTS}
                >
                  Iniciar sesión
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  className="px-4"
                  onPress={() => navigate("/register")}
                  {...registerTTS}
                >
                  Regístrate
                </Button>
              </>
            )}
          </div>
          <Button
            variant="quiet"
            onPress={() => setIsMobileMenuOpen(true)}
            aria-label="Abrir menú de navegación"
            className="md:hidden p-3 min-h-11 min-w-11 text-text-body"
            aria-expanded={isMobileMenuOpen}
            {...hamburgerTTS}
          >
            {menuIcon}
          </Button>
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
            className={`flex flex-1 flex-col min-h-screen gap-8 transition-transform duration-200 ease-in-out bg-surface-page ${
              isMobileMenuOpen ? "translate-y-0" : "-translate-y-4"
            }`}
          >
          <div className="flex items-center justify-between px-6 py-4 border-b border-border-card">
            <span className="font-semibold tracking-wider">EMCODE</span>
            <Button
              variant="quiet"
              onPress={closeMenu}
              aria-label="Cerrar menú"
              className="p-3 min-h-11 min-w-11 text-text-body"
              {...closeMobileTTS}
            >
              {closeIcon}
            </Button>
          </div>

          <nav className="flex flex-col items-stretch gap-8 px-6 bg-surface-page">
            {navLinks.map((link) => (
              <NavTTSLink
                key={link.label}
                label={link.label}
                href={link.href}
                end={link.href === "/"}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `text-lg py-3 min-h-11 pl-4 flex items-center transition hover:text-text-headings border-l-2 ${
                    isActive
                      ? "border-primary-700 text-text-headings font-semibold"
                      : "border-transparent text-text-body"
                  }`
                }
              />
            ))}
          </nav>

          <div className="flex flex-col items-stretch gap-4 px-6 pb-8 bg-surface-page">
            <Button
              onPress={() => { onAccessibilityOpen?.(); closeMenu(); }}
              aria-label="Abrir panel de accesibilidad"
              variant="secondary"
              {...mobileA11yTTS}
            >
              Accesibilidad
            </Button>
            {isAuthenticated ? (
              <>
                <NavLink to="/profile" onClick={closeMenu} className="text-sm text-text-body text-center py-2 hover:text-text-headings transition block">
                  {user?.firstName} {user?.lastName}
                </NavLink>
                <Button
                  variant="secondary"
                  onPress={() => {
                    logout();
                    navigate("/");
                    closeMenu();
                  }}
                  {...logoutTTS}
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
                  {...loginTTS}
                >
                  Iniciar sesión
                </Button>
                <Button
                  onPress={() => {
                    navigate("/register");
                    closeMenu();
                  }}
                  {...registerTTS}
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
