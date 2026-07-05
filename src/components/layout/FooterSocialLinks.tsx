import { socialLinks } from "../../data/footer";
import type { SocialLink } from "../../data/footer";
import { useAccessibility } from "../../hooks/useAccessibility";
import { useSpeechContext } from "../../context/SpeechContext";

function FooterSocialLinks() {
  const { settings } = useAccessibility();
  const { speak, stop } = useSpeechContext();

  return (
    <nav aria-label="Redes sociales" className="flex items-center gap-2.5">
      {socialLinks.map((social: SocialLink) => {
        const Icon = social.icon;
        const label = `${social.label} Se abre en una nueva pestaña`;
        return (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            onFocus={() => {
              if (settings.ttsEnabled) {
                stop();
                speak(label);
              }
            }}
            className="rounded-md transition hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white
            focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            <Icon size={20} aria-hidden={true} />
          </a>
        );
      })}
    </nav>
  );
}

export default FooterSocialLinks;
