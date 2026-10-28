import { Hero } from "@/components/sections/Hero";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { ContactCTA } from "@/components/sections/ContactCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <AboutPreview />
      <ContactCTA />
    </>
  );
}
