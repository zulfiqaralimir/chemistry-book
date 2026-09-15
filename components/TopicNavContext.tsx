"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface TopicNavValue {
  activeSection: string;
  setActiveSection: (key: string) => void;
}

const TopicNavContext = createContext<TopicNavValue | null>(null);

export function TopicNavProvider({
  defaultSection,
  children,
}: {
  defaultSection: string;
  children: ReactNode;
}) {
  const [activeSection, setActiveSection] = useState(defaultSection);
  return (
    <TopicNavContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </TopicNavContext.Provider>
  );
}

export function useTopicNav() {
  const ctx = useContext(TopicNavContext);
  if (!ctx) throw new Error("useTopicNav must be used within a TopicNavProvider");
  return ctx;
}
