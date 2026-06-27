import FocusTTS from "../components/FocusTTS";
import { HeroSection } from "./about/HeroSection";
import { StorySection } from "./about/StorySection";
import { MissionVisionSection } from "./about/MissionVisionSection";
import { ValuesSection } from "./about/ValuesSection";
import { TechStackSection } from "./about/TechStackSection";
import { TeamSection } from "./about/TeamSection";
import { FAQSection } from "./about/FAQSection";
import { CTASection } from "./about/CTASection";

export function AboutPage() {
  return (
    <FocusTTS><div className="mx-auto flex w-full max-w-[1240px] flex-col px-6 py-12 sm:px-8 lg:px-12">
      <div className="mb-32">
        <HeroSection />
      </div>
      <div className="mb-32">
        <StorySection />
      </div>
      <div className="mb-32">
        <MissionVisionSection />
      </div>
      <div className="mb-32">
        <ValuesSection />
      </div>
      <div className="mb-32">
        <TechStackSection />
      </div>
      <div className="mb-32">
        <TeamSection />
      </div>
      <div className="mb-32">
        <FAQSection />
      </div>
      <CTASection />
    </div></FocusTTS>
  );
}
