import { MetadataRoute } from "next";
import { activations } from "@/lib/data/activations";
import { contenidoSlides } from "@/lib/data/contenido";

const baseUrl = "https://mediamoob.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/somos-contenido`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/somos-tecnologia`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/somos-activaciones`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/somos-juegos`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];

  const contenidoRoutes: MetadataRoute.Sitemap = contenidoSlides.map((s) => ({
    url: `${baseUrl}/somos-contenido/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const activationRoutes: MetadataRoute.Sitemap = activations.map((a) => ({
    url: `${baseUrl}/somos-activaciones/${a.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...contenidoRoutes, ...activationRoutes];
}
