import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroTech } from "@/components/sections/tecnologia/hero-tech";
import { ServiceDetail } from "@/components/sections/tecnologia/service-detail";

export const metadata: Metadata = {
  title: "SOMOS Tecnología",
  description:
    "Aplicamos tecnología propia para amplificar su alcance e impacto. MCP, Publicidad Sat y Push, que optimizan la distribución y monetización de los contenidos.",
};

export default function SomosTecnologiaPage() {
  return (
    <main className="bg-black min-h-screen">
      <Header />
      <HeroTech />
      <ServiceDetail />
      <Footer />
    </main>
  );
}
