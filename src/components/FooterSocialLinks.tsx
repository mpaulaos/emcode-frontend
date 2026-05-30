import { Link } from "react-aria-components";
import { socialLinks } from "./footerData";
import type { SocialLink } from "./footerData";

function FooterSocialLinks() {
  return (
    <div className="flex items-center gap-2.5">
      {socialLinks.map((social: SocialLink) => {
        const Icon = social.icon;
        return (
          <Link
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${social.label} Se abre en una  nueva pestaña`}
            className="rounded-md transition hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white
            focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            <Icon size={20} aria-hidden={true} />
          </Link>
        );
      })}
    </div>
  );
}

export default FooterSocialLinks;