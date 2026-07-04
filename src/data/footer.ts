import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number; "aria-hidden"?: boolean }>;
}

export const footerColumns: FooterColumn[] = [
  {
    title: "Plataforma",
    links: [
      { label: "Cursos", href: "/cursos" },
      { label: "Guías", href: "/guias" },
      { label: "Acerca de", href: "/acerca-de" },
    ],
  },
  {
    title: "Cuenta",
    links: [
      { label: "Iniciar sesión", href: "/login" },
      { label: "Registrarse", href: "/register" },
      { label: "Dashboard", href: "/teacher" },
    ],
  },
  {
    title: "Recursos",
    links: [
      { label: "Ayuda", href: "/ayuda" },
      { label: "Términos", href: "/terminos" },
      { label: "Privacidad", href: "/privacidad" },
    ],
  },
];

export const studentColumns: FooterColumn[] = [
  {
    title: "Mi cuenta",
    links: [
      { label: "Mi perfil", href: "/profile" },
      { label: "Mis cursos", href: "/cursos/inscribir" },
      { label: "Explorar cursos", href: "/cursos/explorar" },
    ],
  },
  {
    title: "Recursos",
    links: [
      { label: "Ayuda", href: "/ayuda" },
      { label: "Términos", href: "/terminos" },
      { label: "Privacidad", href: "/privacidad" },
    ],
  },
];

export const teacherColumns: FooterColumn[] = [
  {
    title: "Mi cuenta",
    links: [
      { label: "Mi perfil", href: "/profile" },
      { label: "Dashboard", href: "/teacher" },
      { label: "Mis cursos", href: "/teacher" },
    ],
  },
  {
    title: "Recursos",
    links: [
      { label: "Ayuda", href: "/ayuda" },
      { label: "Términos", href: "/terminos" },
      { label: "Privacidad", href: "/privacidad" },
    ],
  },
];

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com", icon: FaGithub },
  { label: "Instagram", href: "https://instagram.com", icon: FaInstagram },
  { label: "LinkedIn", href: "https://linkedin.com", icon: FaLinkedin },
];

export const legalLinks: FooterLink[] = [
  { label: "Política de Privacidad", href: "/privacidad" },
  { label: "Configuración de Cookies", href: "/cookies" },
  { label: "Términos del Servicio", href: "/terminos" },
];
