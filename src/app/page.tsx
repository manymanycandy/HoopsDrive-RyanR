"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight, Zap, Target, Users, Trophy } from "lucide-react";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import AnimatedCounter from "@/components/AnimatedCounter";
import heroImage from "@/assets/hero-basketball.jpg";
import playerDunk from "@/assets/player-dunk.jpg";
import teamHuddle from "@/assets/team-huddle.jpg";
import courtOverhead from "@/assets/court-overhead.jpg";
import basketballCloseup from "@/assets/basketball-closeup.jpg";

const Particles = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="absolute inset-0 overflow-hidden pointer-events-none z-10 w-full h-full" />;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10 w-full h-full">
      {[...Array(30)].map((_, i) => {
        const size = Math.random() * 4 + 1;
        const startX = Math.random() * 100;
        const startY = Math.random() * 100 + 20;
        const duration = Math.random() * 20 + 15;
        const isOrange = Math.random() > 0.7;
        const color = isOrange ? "rgba(255,107,0,0.6)" : "rgba(255,255,255,0.4)";
        const shadow = isOrange ? `0 0 ${size * 3}px rgba(255,107,0,0.8)` : `0 0 ${size * 2}px rgba(255,255,255,0.5)`;

        return (
          <motion.div
            key={i}
            className="absolute rounded-full mix-blend-screen"
            style={{
              width: size,
              height: size,
              left: `${startX}%`,
              top: `${startY}%`,
              backgroundColor: color,
              boxShadow: shadow
            }}
            animate={{
              y: [0, -600],
              x: [0, Math.random() * 100 - 50],
              opacity: [0, Math.random() * 0.8 + 0.2, 0],
              scale: [0, 1.5, 0]
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 15
            }}
          />
        );
      })}
    </div>
  );
};

const AnimatedText = ({ text, className = "" }: { text: string; className?: string }) => {
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 * i },
    }),
  };

  const child = {
    hidden: { opacity: 0, y: 120, scale: 0.8, rotate: -5, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      filter: "blur(0px)",
      transition: { type: "spring" as const, damping: 10, stiffness: 80 }
    },
  };

  return (
    <motion.div
      className={`overflow-hidden flex flex-wrap justify-center ${className}`}
      variants={container}
      initial="hidden"
      animate="visible"
      custom={1}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={child}
          className="inline-block drop-shadow-2xl"
          style={{ textShadow: "0px 10px 30px rgba(255,107,0,0.7)" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
};

const Marquee = () => {
  const items = ["BASKETBALL", "•", "CONFIDENCE", "•", "GROWTH", "•", "PASSION", "•", "DISCIPLINE", "•", "COMMUNITY", "•"];
  return (
    <div className="overflow-hidden py-4 border-y border-border/30 bg-secondary/20">
      <div className="animate-marquee whitespace-nowrap flex">
        {[...items, ...items].map((item, i) => (
          <span key={i} className={`mx-4 font-display text-xl tracking-widest ${item === "•" ? "text-primary" : "text-muted-foreground/50"}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

const Home = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const backgroundImages = [heroImage.src, playerDunk.src, courtOverhead.src, teamHuddle.src];
  const [currentBg, setCurrentBg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgroundImages.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [backgroundImages.length]);

  const featuredPlayers = [
    { name: "Michael Jordan", subtitle: "The Greatest of All Time", image: playerDunk.src },
    { name: "LeBron James", subtitle: "The King", image: teamHuddle.src },
    { name: "Kobe Bryant", subtitle: "Mamba Mentality", image: basketballCloseup.src },
  ];

  const features = [
    { icon: Zap, title: "Build Confidence", desc: "Push past self-doubt and discover your inner strength through the discipline of basketball." },
    { icon: Target, title: "Set Goals", desc: "Every shot, every drill teaches you to aim higher and never give up on your dreams." },
    { icon: Users, title: "Find Community", desc: "Join a global community of players who support and push each other to grow." },
    { icon: Trophy, title: "Achieve Greatness", desc: "Transform challenges into victories, both on and off the court." },
  ];

  return (
    <Layout>
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentBg}
            className="absolute inset-0 origin-center"
            initial={{ opacity: 0, scale: 1.05, filter: "blur(20px) brightness(1.5)" }}
            animate={{ opacity: 1, scale: 1.15, filter: "blur(0px) brightness(0.8)" }}
            exit={{ opacity: 0, scale: 1.2, filter: "blur(10px) brightness(0.2)", transition: { duration: 1.5, ease: "easeInOut" } }}
            transition={{ duration: 8, ease: "easeOut" }}
          >
            <img src={backgroundImages[currentBg]} alt="Basketball feature" className="w-full h-full object-cover" width={1920} height={1080} />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background pointer-events-none z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-transparent to-background/50 pointer-events-none z-10" />

        <Particles />



        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 container mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 mb-6"
          >
            <span className="text-xs font-body font-semibold uppercase tracking-widest text-primary">More Than A Sport</span>
          </motion.div>

          <AnimatedText
            text="HOOPSDRIVE"
            className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] text-foreground leading-none tracking-tighter"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-6 text-lg md:text-xl text-muted-foreground font-body max-w-2xl mx-auto leading-relaxed"
          >
            Your ultimate basketball companion. Build confidence, master the game, and discover what the sport can unlock within you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
              <Link
                href="/my-story"
                className="px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-body font-semibold text-sm uppercase tracking-wider glow-orange transition-all hover:brightness-110 inline-block"
              >
                Read My Story
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
              <Link
                href="/learn"
                className="px-8 py-3.5 rounded-lg bg-secondary border border-border text-foreground font-body font-semibold text-sm uppercase tracking-wider hover:bg-secondary/80 transition-all inline-block"
              >
                Start Learning
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <ChevronDown className="text-muted-foreground" size={24} />
        </motion.div>
      </section>
      <Marquee />
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="text-xs font-body font-semibold uppercase tracking-widest text-primary">Why It Matters</span>
            <h2 className="font-display text-4xl md:text-6xl text-foreground mt-3">
              BASKETBALL BUILDS <span className="text-gradient-orange">CHARACTER</span>
            </h2>
            <p className="mt-4 text-muted-foreground font-body max-w-xl mx-auto">
              It's not just about scoring points. It's about building the mindset to face life's challenges head-on.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <AnimatedSection key={feature.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02, boxShadow: "0 20px 40px -10px rgba(255,107,0,0.15)" }}
                  className="p-6 rounded-xl bg-gradient-card border border-border/50 hover:border-primary/30 group cursor-default h-full transition-all duration-500"
                >
                  <motion.div
                    whileHover={{ rotate: 10 }}
                    className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors"
                  >
                    <feature.icon className="text-primary" size={22} />
                  </motion.div>
                  <h3 className="font-display text-xl text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground font-body leading-relaxed">{feature.desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
      <section className="relative h-[50vh] overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          className="absolute inset-0"
        >
          <img src={courtOverhead.src} alt="Basketball court overhead" className="w-full h-full object-cover" loading="lazy" width={1200} height={600} />
          <div className="absolute inset-0 bg-background/60" />
        </motion.div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <AnimatedSection className="text-center">
            <blockquote className="font-display text-3xl md:text-5xl text-foreground max-w-3xl px-4">
              "I CAN ACCEPT FAILURE. BUT I CAN'T ACCEPT <span className="text-gradient-orange">NOT TRYING</span>."
            </blockquote>
            <p className="mt-4 text-muted-foreground font-body text-sm tracking-wider uppercase">— Michael Jordan</p>
          </AnimatedSection>
        </div>
      </section>
      <section className="py-20 md:py-28 border-y border-border/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <AnimatedCounter target={450} suffix="M+" label="Players Worldwide" />
            <AnimatedCounter target={200} suffix="+" label="Countries Playing" />
            <AnimatedCounter target={75} suffix="+" label="Years of NBA History" />
            <AnimatedCounter target={100} suffix="%" label="Heart & Passion" />
          </div>
        </div>
      </section>
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedSection className="flex flex-col md:flex-row items-end justify-between mb-12">
            <div>
              <span className="text-xs font-body font-semibold uppercase tracking-widest text-primary">Legends</span>
              <h2 className="font-display text-4xl md:text-6xl text-foreground mt-3">
                ICONIC <span className="text-gradient-orange">PLAYERS</span>
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredPlayers.map((player, i) => (
              <AnimatedSection key={player.name} delay={i * 0.15}>
                <motion.div whileHover={{ y: -12 }} className="group relative rounded-xl overflow-hidden aspect-[3/4] cursor-pointer">
                  <img
                    src={player.image}
                    alt={player.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-display text-2xl md:text-3xl text-foreground">{player.name}</h3>
                    <p className="text-sm text-primary font-body mt-1">{player.subtitle}</p>
                  </div>
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight size={14} className="text-primary" />
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left">
              <span className="text-xs font-body font-semibold uppercase tracking-widest text-primary">My Journey</span>
              <h2 className="font-display text-4xl md:text-5xl text-foreground mt-3 leading-tight">
                FROM SELF-DOUBT TO <span className="text-gradient-orange">SELF-BELIEF</span>
              </h2>
              <p className="mt-6 text-muted-foreground font-body leading-relaxed">
                I used to struggle with confidence. Basketball didn't just teach me how to dribble — it taught me how to believe in myself. Every missed shot became a lesson. Every practice session became a step forward.
              </p>
              <p className="mt-4 text-muted-foreground font-body leading-relaxed">
                This website is my way of sharing that journey and inspiring others to discover what basketball can unlock within them.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block mt-8">
                <Link
                  href="/my-story"
                  className="px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-body font-semibold text-sm uppercase tracking-wider glow-orange inline-block"
                >
                  Read My Full Story
                </Link>
              </motion.div>
            </AnimatedSection>
            <AnimatedSection direction="right">
              <div className="relative">
                <motion.div whileHover={{ scale: 1.03 }} className="rounded-xl overflow-hidden">
                  <img src={teamHuddle.src} alt="Team unity" className="w-full h-80 md:h-96 object-cover" loading="lazy" width={800} height={600} />
                </motion.div>
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -bottom-4 -left-4 px-6 py-4 rounded-lg bg-card border border-border shadow-xl"
                >
                  <p className="font-display text-lg text-primary">"Never give up."</p>
                  <p className="text-xs text-muted-foreground font-body mt-1">My personal motto</p>
                </motion.div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedSection className="text-center">
            <h2 className="font-display text-4xl md:text-6xl text-foreground">
              READY TO START YOUR <span className="text-gradient-orange">JOURNEY</span>?
            </h2>
            <p className="mt-4 text-muted-foreground font-body max-w-lg mx-auto">
              Whether you're picking up a basketball for the first time or looking for inspiration, this is your space.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                <Link
                  href="/learn"
                  className="px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-body font-semibold text-sm uppercase tracking-wider glow-orange inline-block"
                >
                  Start Learning
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                <Link
                  href="/ask-ai"
                  className="px-8 py-3.5 rounded-lg bg-secondary border border-border text-foreground font-body font-semibold text-sm uppercase tracking-wider hover:bg-secondary/80 transition-all inline-block"
                >
                  Ask AI
                </Link>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
