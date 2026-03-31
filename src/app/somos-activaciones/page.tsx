import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroActivaciones } from "@/components/sections/activaciones/hero-activaciones";
import { ActivationsGrid } from "@/components/sections/activaciones/activations-grid";

export const metadata: Metadata = {
  title: "SOMOS Activaciones y Experiencias",
  description:
    "Unimos el mundo OFF con el ON generando activaciones y experiencias para usuarios y partners en más de 30 países.",
};

export default function SomosActivacionesPage() {
  return (
    <main className="bg-black min-h-screen">
      <Header />
      <HeroActivaciones />
      <ActivationsGrid />
      <Footer />
    </main>
  );
}
