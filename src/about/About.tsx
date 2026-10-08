import { motion } from 'motion/react';
import { SiteNav } from '../marketing/SiteNav';
import { SiteFooter } from '../marketing/SiteFooter';
import { Kicker } from '../marketing/Kicker';
import { Wrap, CtaButton } from '../marketing/ui';
import { reveal } from '../marketing/reveal';

const TEAM = [
  {
    role: 'Operations',
    name: 'Rhiannon Leila',
    photo: '/team/rhiannon.jpeg',
    bio: 'Rhiannon makes operations work. She finds the bottlenecks, rebuilds how the work flows and keeps delivery on track once it starts. If it has to run smoothly and keep running, it sits with her.',
  },
  {
    role: 'Technology',
    name: 'Shari Sant',
    photo: '/team/shari.png',
    bio: 'Shari leads on technology and hands-on delivery. She turns the plan into working systems and owns the hardest parts of the build. When something has to be built properly, it goes to Shari.',
  },
  {
    role: 'Strategy',
    name: 'Toni Martin',
    photo: '/team/toni.jpg',
    bio: 'Toni sets the direction and holds the commercial and technology thinking together. Strategy is her seat at Steel Core, though the technical depth behind it runs deep.',
  },
];

const Portrait = ({ photo, name }: { photo: string; name: string }) => (
  <div className="mb-6 aspect-[4/5] w-full max-w-[180px] overflow-hidden border border-[#C7CDD4] bg-[#E3E7EC]">
    <img src={photo} alt={name} loading="lazy" className="h-full w-full object-cover" />
  </div>
);

export default function About() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-cloud font-body text-[17px] leading-[1.6] text-steel-dark selection:bg-rust-base selection:text-white">
      <SiteNav active="about" />

      <main>
        {/* Page hero */}
        <section className="pb-[clamp(26px,4vw,44px)] pt-[clamp(58px,8vw,104px)]">
          <Wrap>
            <Kicker>About</Kicker>
            <h1 className="mt-[22px] font-heading text-[clamp(2rem,5.6vw,4.4rem)] font-extrabold leading-[1.02] tracking-[-0.02em]">
              The people<br />you&rsquo;d want on it.
            </h1>
            <p className="mt-[26px] max-w-[56ch] text-[1.18rem]">
              Strategy, operations and technology, each led by someone with more than a decade in it. You get real depth
              in all three and one team accountable for the result, not a plan from one firm and delivery from another.
            </p>
          </Wrap>
        </section>

        {/* Why we exist */}
        <section className="py-[clamp(72px,8vw,116px)]">
          <Wrap>
            <div className="grid items-start gap-14 md:grid-cols-[0.9fr_1.1fr]">
              <motion.div {...reveal}>
                <Kicker>Why we exist</Kicker>
                <p className="mt-[22px] max-w-[20ch] font-heading text-[clamp(1.5rem,2.7vw,2.1rem)] font-semibold leading-[1.14] tracking-[-0.015em]">
                  We own the part that falls between the cracks.
                </p>
              </motion.div>
              <motion.div {...reveal} className="pt-1.5">
                <p className="max-w-[54ch]">
                  Steel Core grew out of the work we kept being pulled into, the delivery that sat between strategy and
                  operations that nobody owned. Strategy gets set in one place, operations run in another and technology
                  somewhere else again. The join between them is where good plans stall.
                </p>
                <p className="mt-[22px] max-w-[54ch]">
                  We came together because the mix is complete. Three people, each deep in a different discipline, better
                  together than apart. Between us we shape the direction, build the systems and run the operation, so you
                  are not handed between firms and nobody can point at the gap. A senior fractional team, built for the
                  work where getting it right is the whole point.
                </p>
              </motion.div>
            </div>
          </Wrap>
        </section>

        {/* The three behind it */}
        <section className="py-[clamp(72px,8vw,116px)]">
          <Wrap>
            <motion.div {...reveal} className="max-w-[60ch]">
              <Kicker>Who you work with</Kicker>
              <h2 className="mt-5 font-heading text-[clamp(2rem,3.8vw,3rem)] font-bold leading-[1.02] tracking-[-0.018em]">
                The three behind it.
              </h2>
            </motion.div>
            <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {TEAM.map((m) => (
                <motion.div {...reveal} key={m.name}>
                  <Portrait photo={m.photo} name={m.name} />
                  <div className="mb-3 inline-flex items-center gap-2.5 font-tech text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-rust-base">
                    <span className="h-0.5 w-[18px] bg-rust-base" aria-hidden="true"></span>
                    {m.role}
                  </div>
                  <h3 className="mb-3 font-heading text-[1.4rem] font-bold tracking-[-0.01em]">{m.name}</h3>
                  <p className="max-w-[40ch] text-steel-base">{m.bio}</p>
                </motion.div>
              ))}
            </div>
          </Wrap>
        </section>

        {/* Close */}
        <section className="bg-steel-dark py-[clamp(72px,8vw,116px)]">
          <Wrap>
            <div className="grid items-end gap-12 md:grid-cols-[1.3fr_0.7fr]">
              <motion.div {...reveal}>
                <Kicker onDark>Start here</Kicker>
                <h2 className="mt-5 font-heading text-[clamp(2.2rem,4.4vw,3.6rem)] font-extrabold leading-[1.02] tracking-[-0.02em] text-cloud">
                  Tell us what needs to happen.
                </h2>
                <p className="mt-[22px] max-w-[44ch] text-muted-dark">
                  A straight conversation about the work, whether we are the right team for it and how we would approach
                  it.
                </p>
              </motion.div>
              <motion.div {...reveal} className="flex md:justify-end">
                <CtaButton onDark>Book a call</CtaButton>
              </motion.div>
            </div>
          </Wrap>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
