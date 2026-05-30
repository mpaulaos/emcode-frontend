import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

export interface FooterLink {
  label: string;
  href:  string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  label: string;
  href:  string;
  icon:  React.ComponentType<{ size?: number; 'aria-hidden'?: boolean }>; 
}

export const footerColumns: FooterColumn[] = [
  {
    title: "Space1",
    links: [
      { label: "Features",href: '/features'},
      { label: "Pricing", href: '/pricing'},
      { label: "Resources", href: '/resources'},
    ],
  },
  {
    title: "Space2",
    links: [
      { label: "About",   href: '/about'},
      { label: "Careers", href: '/careers'},
      { label: "Contact", href: '/contact'},
    ],
  },
  {
    title: "Space3",
    links: [
      { label: "Help", href: '/help-center'},
      { label: "Terms",href: '/terms'},
      { label: "Privacy",href: '/privacy'},
    ],
  },
];

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com", icon: FaGithub},
  { label: "Instagram", href: "https://instagram.com", icon: FaInstagram},
  { label: "LinkedIn", href: "https://linkedin.com",  icon: FaLinkedin},
];

export const legalLinks: FooterLink[] = [
  { label: "Privacy Policy",href: '/privacy-policy'},
  { label: "Cookies Settings", href: '/cookies'},
  { label: "Terms of Service", href: '/terms-of-service'},
];