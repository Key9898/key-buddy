import { motion } from 'framer-motion'
import { Download, Monitor, Laptop, MousePointer2, type LucideIcon } from 'lucide-react'
import { Character } from '../Character'
import { Overlay } from '../Overlay'
import { useDemoInput } from '../../hooks'
import { useEffect } from 'react'
import { CharacterHub } from './CharacterHub'

export function LandingPage() {
  const { setIsDemo } = useDemoInput()

  useEffect(() => {
    // Force demo mode on landing page by default
    setIsDemo(true)
  }, [setIsDemo])

  return (
    <div className="min-h-screen bg-base-100 text-base-content font-sans selection:bg-primary/20">
      {/* Subtle Animated Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-[20%] -left-[20%] w-[60%] h-[60%] bg-primary/30 blur-[150px] rounded-full"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-[20%] -right-[20%] w-[60%] h-[60%] bg-secondary/30 blur-[150px] rounded-full"
        />
      </div>

      <nav className="fixed top-0 w-full z-50 bg-base-100/80 backdrop-blur-md border-b border-base-content/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-black text-xl italic">K</span>
            </div>
            <span className="font-black text-xl tracking-tighter">KeyBuddy</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest opacity-60">
            <a href="#features" className="hover:text-primary transition-colors">
              Features
            </a>
            <a href="#download" className="hover:text-primary transition-colors">
              Download
            </a>
            <a href="#guide" className="hover:text-primary transition-colors">
              Guide
            </a>
          </div>
          <a href="#download" className="btn btn-primary btn-sm rounded-full px-6">
            Get Started
          </a>
        </div>
      </nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Now available for Windows, Mac & Linux
              </div>
              <h1 className="text-6xl md:text-7xl font-black tracking-tighter leading-[0.9]">
                Your <span className="text-primary italic">Cute</span> Desktop Companion for{' '}
                <span className="text-secondary underline decoration-8 underline-offset-8">
                  Streaming
                </span>
              </h1>
              <p className="text-lg opacity-70 font-medium max-w-lg">
                KeyBuddy reflects your keyboard and mouse inputs through a charming KeyBuddy Classic
                or custom avatar character. The perfect addition for streamers, content creators,
                and keyboard enthusiasts.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#download"
                  className="btn btn-primary btn-lg rounded-2xl shadow-xl shadow-primary/20 px-8 group"
                >
                  <Download className="w-5 h-5 group-hover:animate-bounce" />
                  Free Download
                </a>
                <a href="#features" className="btn btn-ghost btn-lg rounded-2xl px-8">
                  Learn More
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-secondary/10 rounded-full blur-[100px]" />
              {/* Interactive Preview Container */}
              <div className="w-full max-w-md bg-base-100/50 backdrop-blur-xl rounded-[2.5rem] border border-base-content/10 shadow-2xl overflow-hidden p-8 flex flex-col items-center justify-center gap-6 group hover:border-primary/20 transition-all">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-4 bg-base-300/50 px-4 py-1 rounded-full">
                  Interactive Live Preview
                </div>
                <div className="transform group-hover:scale-105 transition-transform duration-500">
                  <Character />
                </div>
                <div className="w-full max-w-xs p-4 bg-base-200/50 rounded-2xl border border-base-content/5">
                  <Overlay />
                </div>
                <div className="text-[10px] font-bold opacity-40 uppercase italic" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-24 px-6 bg-base-200/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <h2 className="text-4xl font-black tracking-tight underline decoration-primary/30 decoration-8 underline-offset-8">
                Built for <span className="italic text-primary">Streamers</span>
              </h2>
              <p className="opacity-60 font-medium">
                KeyBuddy offers the perfect balance of aesthetics and functionality, ensuring your
                community stays engaged with every interaction.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={Monitor}
                title="Cross Platform"
                description="Runs natively on Windows, macOS, and Linux. Built with Electron for high performance."
              />
              <FeatureCard
                icon={Laptop}
                title="Super Lightweight"
                description="Minimal CPU and RAM usage, ensuring your games and streams run without any lag."
              />
              <FeatureCard
                icon={MousePointer2}
                title="Customizable"
                description="Change sizes, transparency, and character skins to match your stream's aesthetic."
              />
            </div>
          </div>
        </section>

        {/* Character Hub / Marketplace Preview */}
        <CharacterHub className="bg-base-100 py-32" />

        {/* Download Center */}
        <section id="download" className="py-32 px-6">
          <div className="max-w-7xl mx-auto bg-primary rounded-[3rem] p-12 md:p-20 text-primary-content relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[40%] h-[100%] bg-white/10 blur-[100px] -rotate-45" />
            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-5xl font-black tracking-tight leading-none">
                  Ready to start your <span className="text-base-100">Companion</span>?
                </h2>
                <p className="text-lg opacity-80 font-medium">
                  Download the latest version (v1.0.0 Alpha) and bring some cuteness to your desktop
                  setup.
                </p>
                <div className="flex flex-col gap-3 max-w-xs">
                  <button className="btn btn-neutral btn-lg rounded-2xl justify-between group">
                    Download for Windows
                    <Monitor className="w-5 h-5 opacity-40 group-hover:opacity-100" />
                  </button>
                  <button className="btn bg-base-100/20 border-transparent text-white hover:bg-base-100/30 btn-lg rounded-2xl justify-between group">
                    Download for macOS
                    <Laptop className="w-5 h-5 opacity-40 group-hover:opacity-100" />
                  </button>
                  <button className="btn bg-base-100/20 border-transparent text-white hover:bg-base-100/30 btn-lg rounded-2xl justify-between group">
                    Download for Linux
                    <span className="text-xs opacity-60">Coming Soon</span>
                  </button>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/10">
                <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  Streamer Pro Tips
                </h3>
                <ul className="space-y-4 text-sm font-medium opacity-90">
                  <li className="flex gap-3">
                    <div className="w-5 h-5 rounded bg-white/20 flex-shrink-0 flex items-center justify-center text-[10px]">
                      1
                    </div>
                    Run KeyBuddy before starting your stream for auto-detection.
                  </li>
                  <li className="flex gap-3">
                    <div className="w-5 h-5 rounded bg-white/20 flex-shrink-0 flex items-center justify-center text-[10px]">
                      2
                    </div>
                    Use &quot;Click Through&quot; mode in settings to avoid clicking the cat
                    in-game.
                  </li>
                  <li className="flex gap-3">
                    <div className="w-5 h-5 rounded bg-white/20 flex-shrink-0 flex items-center justify-center text-[10px]">
                      3
                    </div>
                    Set Transparency to 80% for the best professional look.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Onboarding Guide */}
        <section id="guide" className="py-24 px-6 border-t border-base-content/5">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-black text-center mb-16 uppercase tracking-[0.2em] opacity-40">
              Getting Started in 4 Steps
            </h2>
            <div className="grid md:grid-cols-4 gap-12 relative">
              <GuideStep
                num="01"
                title="Download"
                desc="Grab the installer for your OS from the section above."
              />
              <GuideStep
                num="02"
                title="Install"
                desc="Run the executable and follow the simple setup steps."
              />
              <GuideStep
                num="03"
                title="Run & Ready"
                desc="Open the app. It will start tracking your inputs immediately."
              />
              <GuideStep
                num="04"
                title="Customize"
                desc="Use the floating settings button to make it truly yours."
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="py-20 px-6 border-t border-base-content/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 opacity-40">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-base-content flex items-center justify-center">
              <span className="text-base-100 font-black text-sm italic">K</span>
            </div>
            <span className="font-black text-lg tracking-tighter">KeyBuddy</span>
          </div>
          <div className="text-xs font-bold uppercase tracking-widest text-center">
            Built with Framer Motion & DaisyUI © 2026 KeyBuddy Team
          </div>
          <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-primary transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Github
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Discord
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon
  title: string
  description: string
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="p-8 bg-base-100 rounded-3xl border border-base-content/5 shadow-xl hover:shadow-2xl hover:border-primary/20 transition-all space-y-4"
    >
      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-sm opacity-60 leading-relaxed">{description}</p>
    </motion.div>
  )
}

function GuideStep({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <div className="space-y-4 text-center md:text-left">
      <div className="text-4xl font-black text-primary/10 select-none">{num}</div>
      <h3 className="text-lg font-black uppercase tracking-tight">{title}</h3>
      <p className="text-sm opacity-60">{desc}</p>
    </div>
  )
}
