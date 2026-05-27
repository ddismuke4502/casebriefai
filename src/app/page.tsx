import ProgressBar from "@/components/ui/ProgressBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CaseBriefExperience from "@/components/CaseBriefExperience";
import DisclaimerStrip from "@/components/sections/DisclaimerStrip";
import HeroSection from "@/components/sections/HeroSection";

import {
  ArrowRight,
  FileSearch,
  Fingerprint,
  Gavel,
  LockKeyhole,
  Scale,
  ShieldAlert,
  Sparkles,
} from "lucide-react";

const analysisSteps = [
  "Upload mock case file",
  "Extract parties and facts",
  "Build timeline",
  "Spot possible issues",
  "Prepare evidence checklist",
];

const featureCards = [
  {
    icon: FileSearch,
    title: "Document Intelligence",
    description:
      "Simulates reviewing legal documents and extracting structured case facts from dense text.",
  },
  {
    icon: Gavel,
    title: "Issue Spotting",
    description:
      "Highlights possible legal issues, risk areas, and review priorities for attorney-side analysis.",
  },
  {
    icon: Scale,
    title: "Timeline Builder",
    description:
      "Turns scattered dates and events into a clean chronological case timeline.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-case-black text-case-parchment">

      <Navbar />

      <HeroSection />

      <DisclaimerStrip />

      <CaseBriefExperience />

      <Footer />

    </main>
  );
}
