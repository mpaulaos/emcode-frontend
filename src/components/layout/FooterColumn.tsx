import { Link } from "react-aria-components";
import type { FooterLink } from "../../data/footer";

interface FooterColumnProps {
  title: string;
  links: FooterLink[];
}

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-base font-bold text-gray-50">{title}</h3>

      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="rounded-sm text-base leading-6 text-gray-50 no-underline transition hover:opacity-70
                focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FooterColumn;
