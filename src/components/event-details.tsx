import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import { BadgeCheck, CreditCard, Trophy, Users } from 'lucide-react'
import Image from 'next/image'
import { AthleteCard } from '~/components/athlete-card'
import { EventSchedule } from '~/components/event-schedule'
import { EventStatsBar } from '~/components/event-stats'
import { EventStickyNav } from '~/components/event-sticky-nav'
import { Header } from '~/components/header'
import { RegisterEventForm } from '~/components/register-event-form'
import { TicketCard } from '~/components/ticket-card'
import { Button } from '~/components/ui/button'
import { PaymentModel, SportName } from '~/interfaces/event-interfaces'
import type { Event } from '~/interfaces/event-interfaces'
import type { Team } from '~/interfaces/team-interfaces'
import type { User } from '~/interfaces/user-interfaces'
import { formatPrice } from '~/utils/price-utils'
import { SPORT_IMAGES_PATHS } from '~/utils/sport-assets'

dayjs.locale('pt-br')

interface EventDetailsProps {
  event: Event
  isRegistered: boolean
  teams: Team[]
  user: User | null
}

export function EventDetails({
  event,
  isRegistered,
  teams,
  user,
}: EventDetailsProps) {
  const isFree = event.paymentModel === PaymentModel.FREE
  const price = formatPrice(event.price)
  const startDate = dayjs(event.startDate)

  const coverImage =
    (event.sport?.name && SPORT_IMAGES_PATHS[event.sport.name]) ||
    SPORT_IMAGES_PATHS[SportName.SOCCER]

  return (
    <main className="animate-fade-in flex min-h-screen flex-col bg-zinc-950 text-white">
      {/* Hero Section */}
      <section
        id="hero"
        className="relative flex h-screen w-full flex-col overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src={coverImage}
            alt={event.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 z-10 bg-linear-to-b from-black/80 via-black/40 to-zinc-950" />
        </div>

        <div className="relative z-20 w-full p-4">
          <Header />
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-12 relative z-20 flex-1 duration-1000">
          <div className="flex h-full flex-col justify-center px-4">
            <h1 className="mb-6 text-center text-[clamp(2.5rem,8vw,5.5rem)] leading-none font-black tracking-tighter text-white uppercase italic drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]">
              {event.name}
            </h1>

            <div className="bg-primary mx-auto mb-6 h-1.5 w-16 rounded-full shadow-lg" />

            <p className="mx-auto mb-12 max-w-3xl text-center text-lg leading-relaxed font-bold text-balance text-white/90 drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)] md:text-xl lg:text-2xl">
              Inscrições abertas
            </p>

            <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground shadow-primary/40 glow-primary h-16 animate-pulse rounded-2xl px-12 text-xl font-black tracking-widest uppercase shadow-2xl transition-all hover:scale-105 active:scale-95"
                asChild
              >
                <a href="#register">Realizar Inscrição</a>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="h-16 rounded-2xl border-white/20 bg-white/5 px-12 text-xl font-black tracking-widest text-white uppercase backdrop-blur-md transition-all hover:scale-105 hover:bg-white/10 active:scale-95"
                asChild
              >
                <a href="#cronograma">Cronograma</a>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 animate-bounce flex-col items-center gap-2 text-xs font-black tracking-widest text-white/50 uppercase">
          <div className="flex h-10 w-6 justify-center rounded-full border-2 border-white/20 p-1">
            <div className="bg-primary h-2 w-1.5 rounded-full" />
          </div>
        </div>
      </section>

      {/* Sticky Section Navigation */}
      <EventStickyNav />

      {/* Information Section */}
      <section
        id="information"
        className="mx-auto w-full max-w-[1200px] px-4 py-12 md:px-8"
      >
        <EventStatsBar
          date={startDate.format('DD MMM')}
          slots={event.slots !== null ? `${event.slots} Vagas` : 'Ilimitado'}
          price={isFree ? 'Grátis' : (price ?? '—')}
        />
      </section>

      {/* About Section */}
      <section
        id="about"
        className="mx-auto w-full max-w-[1200px] scroll-mt-20 px-4 py-20 md:px-8"
      >
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <span className="text-primary text-sm font-black tracking-[0.4em] uppercase">
              Apresentação
            </span>
            <h2 className="text-4xl font-black tracking-tighter text-white uppercase italic md:text-5xl">
              Sobre o <span className="text-primary">Evento</span>
            </h2>

            <p className="text-muted-foreground/80 max-w-3xl text-lg leading-relaxed">
              {event.description ||
                'Nenhuma descrição fornecida para este evento. Junte-se a nós para uma experiência esportiva inesquecível, onde paixão e performance se encontram na busca pela vitória.'}
            </p>

            {/* Quick Details Grid */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-4 rounded-3xl border border-white/5 bg-white/2 p-6 backdrop-blur-md">
                <div className="text-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-inner">
                  <Trophy className="size-6" />
                </div>
                <div>
                  <span className="text-muted-foreground/60 text-[10px] font-black tracking-widest uppercase">
                    Modalidade
                  </span>
                  <p className="text-base font-bold text-white uppercase italic">
                    {event.sport?.name || 'Geral'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-3xl border border-white/5 bg-white/2 p-6 backdrop-blur-md">
                <div className="text-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-inner">
                  <Users className="size-6" />
                </div>
                <div>
                  <span className="text-muted-foreground/60 text-[10px] font-black tracking-widest uppercase">
                    Formato
                  </span>
                  <p className="text-base font-bold text-white uppercase italic">
                    {event.playersPerTeam
                      ? `${event.playersPerTeam} x ${event.playersPerTeam}`
                      : 'Individual'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-3xl border border-white/5 bg-white/2 p-6 backdrop-blur-md">
                <div className="text-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-inner">
                  <BadgeCheck className="size-6" />
                </div>
                <div>
                  <span className="text-muted-foreground/60 text-[10px] font-black tracking-widest uppercase">
                    Vagas
                  </span>
                  <p className="text-base font-bold text-white uppercase italic">
                    {event.slots ? `${event.slots} limite` : 'Ilimitadas'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-3xl border border-white/5 bg-white/2 p-6 backdrop-blur-md">
                <div className="text-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-inner">
                  <CreditCard className="size-6" />
                </div>
                <div>
                  <span className="text-muted-foreground/60 text-[10px] font-black tracking-widest uppercase">
                    Taxa
                  </span>
                  <p className="text-base font-bold text-white uppercase italic">
                    {isFree ? 'Gratuito' : 'Paga'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            {isFree ? (
              <TicketCard
                name="Inscrição Gratuita"
                price="0"
                features={[
                  'Participação confirmada no evento',
                  'Acesso às áreas de competição',
                  'Certificado de participação',
                ]}
                isPopular
              />
            ) : (
              <TicketCard
                name="Inscrição Regular"
                price={event.price ? (event.price / 100).toFixed(0) : '0'}
                features={[
                  'Participação confirmada no evento',
                  'Kit atleta padrão (camiseta + chip)',
                  'Acesso às áreas de competição',
                ]}
                isPopular
              />
            )}
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section
        id="cronograma"
        className="mx-auto w-full max-w-[1200px] scroll-mt-24 px-4 py-20 md:px-8"
      >
        <EventSchedule />
      </section>

      {/* Lineup Section */}
      <section
        id="lineup"
        className="mx-auto w-full max-w-[1200px] scroll-mt-20 space-y-12 px-4 py-20 md:px-8"
      >
        <div className="text-center">
          <span className="text-primary text-sm font-black tracking-[0.4em] uppercase">
            Lineup
          </span>
          <h2 className="mt-2 text-4xl font-black tracking-tighter text-white uppercase italic md:text-5xl">
            Atletas de <span className="text-primary">Elite</span>
          </h2>
        </div>

        <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-2">
          <AthleteCard
            name="Carlos Silva"
            role="Atleta Destaque"
            imageUrl="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=600"
          />

          <AthleteCard
            name="Mariana Santos"
            role="Campeã Regional"
            imageUrl="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600"
          />
        </div>
      </section>

      {/* Register Section */}
      <section
        id="register"
        className="mx-auto w-full max-w-[1200px] scroll-mt-20 px-4 py-20 md:px-8"
      >
        <div className="mx-auto max-w-xl rounded-[3rem] border border-white/5 bg-white/2 p-8 shadow-2xl backdrop-blur-2xl md:p-12">
          <div className="mb-8 space-y-2 text-center">
            <span className="text-primary text-sm font-black tracking-[0.4em] uppercase">
              Participar
            </span>
            <h2 className="text-3xl font-black tracking-tighter text-white uppercase italic">
              Garanta sua <span className="text-primary">Vaga</span>
            </h2>
            <p className="text-muted-foreground text-sm font-medium">
              Preencha os dados abaixo para confirmar sua inscrição no evento.
            </p>
          </div>
          <RegisterEventForm
            event={event}
            teams={teams}
            user={user}
            isRegistered={isRegistered}
          />
        </div>
      </section>
    </main>
  )
}
