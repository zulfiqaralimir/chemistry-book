"use client";

import { TabbedSections, type TabSection } from "@/components/TabbedSections";
import { useTopicNav } from "@/components/TopicNavContext";

export function ActiveSectionContent({ sections }: { sections: TabSection[] }) {
  const { activeSection, setActiveSection } = useTopicNav();
  return (
    <TabbedSections
      sections={sections}
      controlled={{ active: activeSection, onChange: setActiveSection }}
    />
  );
}
