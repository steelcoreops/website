/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  ChevronRight,
  BarChart3,
  ShieldCheck,
  Cog,
  Target,
  TrendingUp,
  Wallet,
  Users,
  Briefcase,
  Megaphone,
  GraduationCap,
  Layers,
  Menu,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../../components/Button';
import { Logo } from '../../components/Logo';
import { Eyebrow } from '../../components/Eyebrow';

// --- Components ---

const SectionHeading = ({
  title,
  subtitle,
  light = false,
  centered = false,
}: {
  title: string;
  subtitle?: string;
  light?: boolean;
  centered?: boolean;
}) => (
  <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`text-2xl sm:text-3xl md:text-5xl font-display tracking-tight uppercase mb-4 ${light ? 'text-white' : 'text-steel-dark'}`}
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className={`text-lg md:text-xl max-w-2xl ${centered ? 'mx-auto' : ''} ${light ? 'text-cloud/80' : 'text-steel-base'}`}
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

const LeakCard = ({
  icon: Icon,
  title,
  description,
  index,
}: {
  icon: any;
  title: string;
  description: string;
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="flex gap-6 p-6 bg-white border-l-4 border-rust-base rounded-sm shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="flex-shrink-0 w-12 h-12 bg-cloud flex items-center justify-center text-rust-base">
      <Icon size={24} />
    </div>
    <div>
      <h3 className="text-xl font-display text-steel-dark mb-2 uppercase tracking-tight">{title}</h3>
      <p className="text-steel-base leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

const StepCard = ({ number, title, description }: { number: string; title: string; description: string }) => (
  <div className="relative pl-12 pb-12 last:pb-0">
    <div className="absolute left-0 top-0 w-8 h-8 bg-rust-base text-white flex items-center justify-center font-display text-lg">
      {number}
    </div>
    <div className="absolute left-4 top-8 bottom-0 w-[2px] bg-rust-base/20 last:hidden"></div>
    <h3 className="text-xl font-display text-steel-dark mb-2 uppercase tracking-tight">{title}</h3>
    <p className="text-steel-base">{description}</p>
  </div>
);

const PricingCard = ({
  tier,
  price,
  features,
  highlight = false,
}: {
  tier: string;
  price: string;
  features: string[];
  highlight?: boolean;
}) => (
  <motion.div
    whileHover={{ y: -5 }}
    className={`p-8 border-2 rounded-sm flex flex-col h-full ${highlight ? 'border-rust-base bg-white' : 'border-steel-dark/10 bg-white/50'}`}
  >
    <div className="mb-8">
      <h3 className={`text-sm font-bold uppercase tracking-[0.2em] mb-4 ${highlight ? 'text-rust-base' : 'text-steel-base'}`}>
        {tier}
      </h3>
      <div className="flex items-baseline">
        <span className="text-4xl md:text-6xl font-display text-steel-dark tracking-tight">£{price}</span>
        <span className="text-steel-base ml-2 font-medium">/month</span>
      </div>
    </div>
    <ul className="space-y-4 mb-10 flex-grow">
      {features.map((feature, i) => (
        <li key={i} className="flex items-start gap-3 text-steel-base text-sm">
          <CheckCircle2 size={18} className="text-rust-base flex-shrink-0 mt-0.5" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
    <Button variant={highlight ? 'primary' : 'secondary'} className="w-full">
      Get Started
    </Button>
  </motion.div>
);

// --- Main App ---

export default function HomeOriginal() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen selection:bg-rust-base selection:text-white overflow-x-hidden">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-6'}`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Logo />

          <div className="hidden md:flex items-center gap-8">
            <a href="#leaks" className="text-sm font-bold uppercase tracking-widest text-steel-dark hover:text-rust-base transition-colors">
              The Leaks
            </a>
            <a href="#solution" className="text-sm font-bold uppercase tracking-widest text-steel-dark hover:text-rust-base transition-colors">
              Solution
            </a>
            <a href="#pricing" className="text-sm font-bold uppercase tracking-widest text-steel-dark hover:text-rust-base transition-colors">
              Pricing
            </a>
            <Button variant="outline" className="px-6 py-2">
              Book Call
            </Button>
          </div>

          <button className="md:hidden text-steel-dark" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-8 text-center">
              <a href="#leaks" onClick={() => setIsMenuOpen(false)} className="text-2xl font-display uppercase tracking-tight text-steel-dark">
                The Leaks
              </a>
              <a href="#solution" onClick={() => setIsMenuOpen(false)} className="text-2xl font-display uppercase tracking-tight text-steel-dark">
                Solution
              </a>
              <a href="#pricing" onClick={() => setIsMenuOpen(false)} className="text-2xl font-display uppercase tracking-tight text-steel-dark">
                Pricing
              </a>
              <Button className="w-full">Book Free Call</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-cloud">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <Eyebrow className="mb-6">Built for Predictable Growth</Eyebrow>
              <h1 className="text-3xl sm:text-5xl md:text-7xl font-display text-steel-dark leading-[0.95] tracking-tight uppercase mb-8 break-words">
                More clients closed. <br />
                Recurring revenue. <br />
                <span className="text-rust-base">No more leaks.</span>
              </h1>
              <p className="text-xl md:text-2xl text-steel-base mb-10 max-w-2xl leading-relaxed">
                Every coaching &amp; consulting business leaks revenue at the same five points. We close all of them.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center mb-12">
                <Button>Book a Free Call</Button>
                <div className="text-steel-base font-medium">
                  <span className="block text-xs uppercase tracking-widest opacity-60 font-mono">From</span>
                  <span className="text-lg font-bold">£1,200/month. No upfront fees.</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-8 pt-8 border-t border-steel-dark/10">
                <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-steel-base">
                  <CheckCircle2 size={16} className="text-rust-base" /> No Upfront Fees
                </div>
                <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-steel-base">
                  <CheckCircle2 size={16} className="text-rust-base" /> 12-Month Partnership
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative element: single oversized rotated outline square */}
        <div className="absolute -right-32 top-1/2 -translate-y-1/2 hidden lg:block pointer-events-none">
          <div className="w-[480px] h-[480px] border-2 border-rust-base/15 rotate-45 rounded-sm"></div>
        </div>
      </section>

      {/* The Leaks Section */}
      <section id="leaks" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-24 bg-cloud angled-divider"></div>
        <div className="container mx-auto px-6 pt-12">
          <SectionHeading
            title="Where Your Revenue Leaks"
            subtitle="Every coaching & consulting business leaks revenue at the same five points."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            <LeakCard
              index={0}
              icon={Target}
              title="Contact"
              description="Respond to every enquiry before they ghost. We make sure no qualified lead goes cold."
            />
            <LeakCard
              index={1}
              icon={TrendingUp}
              title="Close"
              description="Follow up on every proposal until they say yes. Our systems keep you top of mind through the full decision cycle."
            />
            <LeakCard
              index={2}
              icon={Layers}
              title="Charge"
              description="Price every engagement for the outcome you deliver. We build structured upsell and expansion into your process."
            />
            <LeakCard
              index={3}
              icon={Wallet}
              title="Collect"
              description="Get paid on time, every time. We automate invoicing, reminders, and the awkward chase."
            />
            <LeakCard
              index={4}
              icon={Users}
              title="Come back"
              description="Turn past clients into recurring work and referrals. We tap your existing relationships for predictable revenue."
            />
            <div className="bg-steel-dark p-8 flex flex-col justify-center rounded-sm">
              <h4 className="text-white text-sm font-bold uppercase tracking-[0.2em] mb-4 font-mono">The Impact</h4>
              <p className="text-3xl font-display text-white leading-tight tracking-tight uppercase">
                Average business loses <span className="text-rust-base">£80-120k</span> annually across these 5 leaks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="py-24 bg-steel-dark text-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeading
                light
                title="We Build It. We Manage It."
                subtitle="Two phases. We build the revenue infrastructure, then we run it with you for a year."
              />
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-rust-base flex items-center justify-center rounded-sm">
                    <Cog size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-display uppercase tracking-tight mb-2">Build Phase</h4>
                    <p className="text-cloud/70">
                      6-week intensive build. We install your complete revenue infrastructure (CRM, automations, dashboards) while you
                      stay focused on your clients.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-rust-base flex items-center justify-center rounded-sm">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-display uppercase tracking-tight mb-2">Manage Phase</h4>
                    <p className="text-cloud/70">
                      Active 12-month partnership. We don't just hand you the keys; we drive the car. Ongoing optimisation and management
                      are included.
                    </p>
                  </div>
                </div>
              </div>
              <Button className="mt-12">Book a Free Call</Button>
            </div>

            <div className="relative">
              <div className="md:aspect-square bg-white/5 border border-white/10 rounded-sm p-8 relative">
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="w-16 h-16 border-t-2 border-l-2 border-rust-base"></div>
                  </div>

                  <div className="space-y-4">
                    {[
                      { label: 'Contact', text: 'Respond to every enquiry before they ghost' },
                      { label: 'Close', text: 'Follow up on every proposal until they say yes' },
                      { label: 'Charge', text: 'Price every engagement for the outcome you deliver' },
                      { label: 'Collect', text: 'Get paid on time, every time' },
                      { label: 'Come back', text: 'Turn past clients into recurring work' },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="group flex items-center gap-4 p-3 bg-white/5 border border-white/5 rounded-sm hover:border-rust-base/30 transition-colors"
                      >
                        <div className="w-10 h-10 flex-shrink-0 bg-rust-base text-white flex items-center justify-center font-display text-xl">
                          {item.label.charAt(0)}
                        </div>
                        <div>
                          <div className="text-xs font-bold uppercase tracking-widest text-rust-base mb-0.5 font-mono">
                            {item.label}
                          </div>
                          <div className="text-[11px] leading-tight text-cloud/60 group-hover:text-cloud transition-colors">
                            {item.text}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex justify-between items-end">
                    <div className="text-4xl font-display tracking-tight">SCO</div>
                    <div className="w-16 h-16 border-b-2 border-r-2 border-rust-base"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-cloud relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <SectionHeading
              centered
              title="Simple Process"
              subtitle="No complexity. No jargon. Just a clear path to better revenue infrastructure."
            />

            <div className="mt-16 bg-white p-8 md:p-16 shadow-sm border border-steel-dark/5 rounded-sm">
              <StepCard
                number="01"
                title="Free 15-Minute Call"
                description="A straight-talking conversation to see if your business is a fit for our infrastructure model."
              />
              <StepCard
                number="02"
                title="Revenue Blueprint"
                description="Deep analysis of your 5 leaks. A £750 investment that is fully credited back if we partner up."
              />
              <StepCard
                number="03"
                title="6-Week Build"
                description="We install everything (CRM, automations, tracking) while you keep showing up for your clients."
              />
              <StepCard
                number="04"
                title="12-Month Partnership"
                description="We actively manage and optimise your infrastructure to ensure the leaks stay closed."
              />

              <div className="mt-8 text-center">
                <Button>Start with Step 1</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-24 bg-cloud angled-divider"></div>
        <div className="container mx-auto px-6 pt-12">
          <SectionHeading
            centered
            title="Transparent Pricing"
            subtitle="No upfront fees. No hidden costs. Just pure monthly partnership."
          />

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <PricingCard
              tier="Platform Partnership"
              price="1,200"
              features={[
                'Complete infrastructure build',
                'All core automations running',
                'Revenue performance dashboard',
                'Email & Slack support',
                '12-month commitment',
              ]}
            />
            <PricingCard
              highlight
              tier="Growth Partnership"
              price="2,500"
              features={[
                'Everything in Platform',
                'Quarterly strategy calls',
                'Monthly performance reviews',
                'Priority support (4h response)',
                'Optimisation credits',
                '12-month commitment',
              ]}
            />
          </div>

          <div className="mt-12 text-center">
            <p className="text-steel-base font-bold uppercase tracking-widest text-sm">
              ✓ No Upfront Fees. Everything included in your monthly subscription.
            </p>
          </div>
        </div>
      </section>

      {/* Who We Work With */}
      <section className="py-24 bg-steel-dark text-white overflow-hidden relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-1/2">
              <SectionHeading
                light
                title="Built for Coaches, Consultants & Agencies"
                subtitle="We don't work with everyone. We specialise in operators who've built something real but need better systems to scale."
              />
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Users, label: 'Solo Coaches' },
                  { icon: Briefcase, label: 'Consulting Firms' },
                  { icon: Megaphone, label: 'Agencies' },
                  { icon: GraduationCap, label: 'Course Creators' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-sm">
                    <item.icon className="text-rust-base" size={20} />
                    <span className="font-bold uppercase tracking-tight text-sm">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:w-1/2 bg-rust-base p-12 relative rounded-sm">
              <div className="absolute top-0 right-0 p-4 opacity-20">
                <BarChart3 size={120} />
              </div>
              <h4 className="text-2xl font-display uppercase mb-6 leading-tight tracking-tight">Ideal Partner Profile:</h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 font-bold uppercase tracking-tight">
                  <ChevronRight size={20} /> £250k+ Annual Revenue
                </li>
                <li className="flex items-center gap-3 font-bold uppercase tracking-tight">
                  <ChevronRight size={20} /> UK &amp; US Markets
                </li>
                <li className="flex items-center gap-3 font-bold uppercase tracking-tight">
                  <ChevronRight size={20} /> Done with Duct-Tape Systems
                </li>
                <li className="flex items-center gap-3 font-bold uppercase tracking-tight">
                  <ChevronRight size={20} /> Ready to Scale Without Burning Out
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="contact" className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto bg-cloud border-4 border-steel-dark p-12 md:p-20 rounded-sm relative">
            <div className="relative z-10 text-center">
              <SectionHeading
                centered
                title="Find out where your revenue is leaking."
                subtitle="Book a free 15-minute call. We'll discuss your business and see if there's a fit."
              />
              <div className="flex flex-col items-center gap-6">
                <Button className="text-xl px-12 py-6">Book a Free Call</Button>
                <p className="text-steel-base font-medium italic">No obligation. Just a conversation.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-steel-dark text-white py-16 border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-rust-base flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white rotate-45"></div>
                </div>
                <span className="text-xl font-display tracking-tight uppercase">
                  Steel Core <span className="text-rust-base">Ops</span>
                </span>
              </div>
              <p className="text-cloud/50 max-w-sm">
                Building and running the revenue engine inside your coaching or consulting business.
              </p>
            </div>
            <div>
              <h5 className="font-bold uppercase tracking-widest text-sm mb-6 font-mono">Markets</h5>
              <ul className="space-y-3 text-cloud/70 text-sm">
                <li>United Kingdom</li>
                <li>United States</li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold uppercase tracking-widest text-sm mb-6 font-mono">Contact</h5>
              <ul className="space-y-3 text-cloud/70 text-sm">
                <li>
                  <a href="mailto:hello@steelcoreoperations.com" className="hover:text-rust-base transition-colors">
                    hello@steelcoreoperations.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5">
            <p className="text-xs text-cloud/30 uppercase tracking-widest font-mono">
              © 2026 Steel Core Operations. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
