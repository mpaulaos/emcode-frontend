import { NavLink, type NavLinkProps } from "react-router-dom";
import { useAccessibility } from "../../hooks/useAccessibility";
import { useSpeechContext } from "../../context/SpeechContext";

interface NavTTSLinkProps {
  readonly label: string;
  readonly href: string;
  readonly end?: boolean;
  readonly className?: NavLinkProps["className"];
  readonly onClick?: () => void;
}

function NavTTSLink({ label, href, end, className, onClick }: NavTTSLinkProps) {
  const { settings } = useAccessibility();
  const { speak, stop } = useSpeechContext();

  function handleFocus() {
    if (settings.ttsEnabled) {
      stop();
      speak(label);
    }
  }

  return (
    <NavLink
      to={href}
      end={end}
      className={className}
      onClick={onClick}
      onFocus={handleFocus}
    >
      {label}
    </NavLink>
  );
}

export default NavTTSLink;
