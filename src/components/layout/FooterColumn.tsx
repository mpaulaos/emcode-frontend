import { Link } from "react-router-dom";
import type { FooterLink } from "../../data/footer";
import { useAccessibility } from "../../hooks/useAccessibility";
import { useSpeechContext } from "../../context/SpeechContext";
import FocusTTS from "../ui/FocusTTS";

interface FooterColumnProps {
  title: string;
  links: FooterLink[];
}

function FooterColumn({ title, links }: FooterColumnProps) {
  const { settings } = useAccessibility();
  const { speak, stop } = useSpeechContext();

  return (
    <div className="flex flex-col gap-3">
      <FocusTTS text={title}>
        <h2 className="text-base font-bold text-gray-50">{title}</h2>
      </FocusTTS>

      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              to={link.href}
              onFocus={() => {
                if (settings.ttsEnabled) {
                  stop();
                  speak(link.label);
                }
              }}
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
