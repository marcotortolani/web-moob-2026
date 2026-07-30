import type { Metadata } from 'next'
import Image from 'next/image'
import { SITE_URL } from '@/lib/seo'
import { Container } from '@/components/ui/container'

export const metadata: Metadata = {
  title: 'Términos y Condiciones — Media Moob - Claro Colombia',
  description:
    'Términos y condiciones de los servicios de suscripción de Media Moob para usuarios Claro Colombia.',
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/co-tyc` },
}

export default function CoTycPage() {
  return (
    <main className="min-h-screen pt-0 pb-20">
      <Container className="max-w-4xl">
        <header className="flex flex-col items-center gap-6 pt-12 pb-10 text-center">
          <Image
            src="/images/media-moob-logo-small.webp"
            alt="Media Moob"
            width={90}
            height={34}
            priority
          />
          <div>
            <h1 className="font-display text-4xl tracking-wide text-white md:text-5xl">
              Términos y Condiciones
            </h1>
            <p className="text-muted-foreground mt-3 text-sm md:text-base">
              Servicios de suscripción para usuarios Claro Colombia
            </p>
          </div>
        </header>

        <div className="flex flex-col gap-6">
          {/* 35022 — Loco por la cocina */}
          <section className="rounded-2xl border border-border bg-surface p-6 md:p-8">
            <h2 className="flex flex-wrap items-baseline gap-x-2 gap-y-1 font-display text-2xl tracking-wide text-white md:text-3xl">
              <span className="font-mono text-mint">35022</span>
              <span>— Loco por la cocina</span>
            </h2>
            <div className="text-muted-foreground mt-4 flex flex-col gap-3 text-sm leading-relaxed md:text-base">
              <p>Servicio disponible para usuarios Claro.</p>
              <p>
                Valor del Servicio semanal de{' '}
                <span className="font-semibold text-white">$4.300</span> IVA Inc + Impoconsumo si
                Aplica.
              </p>
              <p>
                Aplicarán cargos de navegación según las condiciones de tu Plan tarifario o saldo
                prepago.
              </p>
              <p>
                Para cancelar la suscripción envía{' '}
                <span className="font-mono font-semibold text-mint">SALIR</span> al{' '}
                <span className="font-mono font-semibold text-mint">35022</span>.
              </p>
              <p>Responsable del servicio Media Moob Colombia S.A.</p>
              <p>
                Más información:{' '}
                <a href="mailto:info@moob.club" className="text-mint underline underline-offset-2">
                  info@moob.club
                </a>
                .
              </p>
            </div>
          </section>

          {/* 35148 — Club Media Fest */}
          <section className="rounded-2xl border border-border bg-surface p-6 md:p-8">
            <h2 className="flex flex-wrap items-baseline gap-x-2 gap-y-1 font-display text-2xl tracking-wide text-white md:text-3xl">
              <span className="font-mono text-mint">35148</span>
              <span>— Club Media Fest</span>
            </h2>
            <div className="text-muted-foreground mt-4 flex flex-col gap-3 text-sm leading-relaxed md:text-base">
              <p>Servicio disponible para usuarios Claro.</p>
              <p>
                Valor del Servicio semanal de{' '}
                <span className="font-semibold text-white">$4.300</span> IVA Inc + Impoconsumo si
                Aplica.
              </p>
              <p>
                Aplicarán cargos de navegación según las condiciones de tu Plan tarifario o saldo
                prepago.
              </p>
              <p>
                Para cancelar la suscripción envía{' '}
                <span className="font-mono font-semibold text-mint">SALIR</span> al{' '}
                <span className="font-mono font-semibold text-mint">35148</span>.
              </p>
              <p>Responsable del servicio Media Moob Colombia S.A.</p>
              <p>
                Más información:{' '}
                <a href="mailto:info@moob.club" className="text-mint underline underline-offset-2">
                  info@moob.club
                </a>
                .
              </p>
            </div>
          </section>

          {/* 35172 — Team Gamers */}
          <section className="rounded-2xl border border-border bg-surface p-6 md:p-8">
            <h2 className="flex flex-wrap items-baseline gap-x-2 gap-y-1 font-display text-2xl tracking-wide text-white md:text-3xl">
              <span className="font-mono text-mint">35172</span>
              <span>— Team Gamers</span>
            </h2>
            <div className="text-muted-foreground mt-4 flex flex-col gap-3 text-sm leading-relaxed md:text-base">
              <p>Servicio disponible para usuarios Claro.</p>
              <p>
                Valor del Servicio semanal de{' '}
                <span className="font-semibold text-white">$4.300</span> IVA Inc + Impoconsumo si
                Aplica.
              </p>
              <p>
                Aplicarán cargos de navegación según las condiciones de tu Plan tarifario o saldo
                prepago.
              </p>
              <p>
                Para cancelar la suscripción envía{' '}
                <span className="font-mono font-semibold text-mint">SALIR</span> al{' '}
                <span className="font-mono font-semibold text-mint">35172</span>.
              </p>
              <p>Responsable del servicio Media Moob Colombia S.A.</p>
              <p>
                Más información:{' '}
                <a href="mailto:info@moob.club" className="text-mint underline underline-offset-2">
                  info@moob.club
                </a>
                .
              </p>
            </div>
          </section>

          {/* 35158 — SOS Mujer */}
          <section className="rounded-2xl border border-border bg-surface p-6 md:p-8">
            <h2 className="flex flex-wrap items-baseline gap-x-2 gap-y-1 font-display text-2xl tracking-wide text-white md:text-3xl">
              <span className="font-mono text-mint">35158</span>
              <span>— SOS Mujer</span>
            </h2>
            <div className="text-muted-foreground mt-4 flex flex-col gap-3 text-sm leading-relaxed md:text-base">
              <p>Servicio disponible para usuarios Claro.</p>
              <p>
                Valor del Servicio semanal de{' '}
                <span className="font-semibold text-white">$4.000</span> IVA Inc + Impoconsumo si
                Aplica.
              </p>
              <p>
                Aplicarán cargos de navegación según las condiciones de tu Plan tarifario o saldo
                prepago.
              </p>
              <p>
                Para cancelar la suscripción envía{' '}
                <span className="font-mono font-semibold text-mint">SALIR</span> al{' '}
                <span className="font-mono font-semibold text-mint">35158</span>.
              </p>
              <p>Responsable del servicio Media Moob Colombia S.A.</p>
              <p>
                Más información:{' '}
                <a href="mailto:info@moob.club" className="text-mint underline underline-offset-2">
                  info@moob.club
                </a>
                .
              </p>
            </div>
          </section>

          {/* 35290 — Mundo Rock */}
          <section className="rounded-2xl border border-border bg-surface p-6 md:p-8">
            <h2 className="flex flex-wrap items-baseline gap-x-2 gap-y-1 font-display text-2xl tracking-wide text-white md:text-3xl">
              <span className="font-mono text-mint">35290</span>
              <span>— Mundo Rock</span>
            </h2>
            <div className="text-muted-foreground mt-4 flex flex-col gap-3 text-sm leading-relaxed md:text-base">
              <p>Servicio disponible para usuarios Claro.</p>
              <p>
                Valor del Servicio semanal de{' '}
                <span className="font-semibold text-white">$4.000</span> IVA Inc + Impoconsumo si
                Aplica.
              </p>
              <p>
                Aplicarán cargos de navegación según las condiciones de tu Plan tarifario o saldo
                prepago.
              </p>
              <p>
                Para cancelar la suscripción envía{' '}
                <span className="font-mono font-semibold text-mint">SALIR</span> al{' '}
                <span className="font-mono font-semibold text-mint">35290</span>.
              </p>
              <p>Responsable del servicio Media Moob Colombia S.A.</p>
              <p>
                Más información:{' '}
                <a href="mailto:info@moob.club" className="text-mint underline underline-offset-2">
                  info@moob.club
                </a>
                .
              </p>
            </div>
          </section>
        </div>

        <footer className="text-muted-foreground mt-12 border-t border-border pt-6 text-center text-xs">
          Media Moob - Claro Colombia — {new Date().getFullYear()}
        </footer>
      </Container>
    </main>
  )
}
