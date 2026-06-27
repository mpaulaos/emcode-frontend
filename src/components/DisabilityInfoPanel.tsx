import type { DisabilityContent } from "../types/disability";
import FocusTTS from "./FocusTTS";

interface DisabilityInfoPanelProps {
  content: DisabilityContent;
}

function DisabilityInfoPanel({ content }: DisabilityInfoPanelProps) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-lg">

      <FocusTTS text={`${content.title}. ${content.subtitle}`}>
        <div className="flex flex-col gap-xs">
          <h2 className="text-[1.5rem] font-bold leading-tight text-text-headings sm:text-[1.75rem]">
            {content.title}
          </h2>
          <p className="text-body text-text-body">{content.subtitle}</p>
        </div>
      </FocusTTS>

      <hr className="border-border-card" />

      <div className="flex flex-col gap-xl">
        {content.sections.map((section) => (
          <div key={section.title} className="flex flex-col gap-sm">
            <FocusTTS text={`${section.title}. ${section.paragraphs.join(" ")}`}>
              <div className="flex flex-col gap-sm">
                <p className="text-body-sm font-semibold uppercase tracking-wide text-primary">
                  {section.title}
                </p>
                <p className="text-body text-text-body leading-relaxed">
                  {section.paragraphs.join(" ")}
                </p>
              </div>
            </FocusTTS>
          </div>
        ))}
      </div>

      {content.image && (
        <img
          src={content.image}
          alt=""
          className="aspect-video w-full rounded-xl object-cover"
        />
      )}
    </div>
  );
}

export default DisabilityInfoPanel;