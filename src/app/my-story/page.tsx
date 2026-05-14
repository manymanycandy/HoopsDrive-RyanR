"use client";

import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import storyImage from "@/assets/story-reflection.jpg";
import teamHuddle from "@/assets/team-huddle.jpg";
import courtOverhead from "@/assets/court-overhead.jpg";
import { Heart, Star, Shield, Flame, ArrowRight } from "lucide-react";
import Link from "next/link";

const timelineEvents = [
  {
    year: "The Beginning",
    title: "A Shy Kid With No Voice",
    content:
      "I was the kid who sat in the back of the room, afraid to speak up. Every social situation felt like a mountain. I didn't believe I had anything worth sharing with the world.",
    icon: Shield,
  },
  {
    year: "The Discovery",
    title: "Finding The Court",
    content:
      "One afternoon, a friend dragged me to a local basketball court. I couldn't dribble, couldn't shoot, couldn't keep up. But something about the rhythm of the ball bouncing, the squeak of sneakers — it spoke to me.",
    icon: Star,
  },
  {
    year: "The Struggle",
    title: "Failing Forward",
    content:
      "I missed more shots than I made. I got picked last. I fell down, again and again. But each time I got back up, I felt something shift inside me. The court became my safe space to fail and grow.",
    icon: Flame,
  },
  {
    year: "The Breakthrough",
    title: "Finding My Confidence",
    content:
      "Slowly, the discipline of practice, the thrill of improvement, and the bond of teamwork started changing me off the court too. I spoke up more. I stopped hiding. Basketball taught me that effort matters more than talent.",
    icon: Heart,
  },
  {
    year: "Today",
    title: "Building This Platform",
    content:
      "This website is my way of passing it forward. I want every young person who feels unsure of themselves to know: pick up a basketball, step onto a court, and you might just find the version of yourself you've been looking for.",
    icon: ArrowRight,
  },
];

const MyStory = () => {
  return (
    <Layout>
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <img src={storyImage.src} alt="Reflective basketball moment" className="w-full h-full object-cover" width={1024} height={1024} />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-2xl"
          >
            <span className="text-xs font-body font-semibold uppercase tracking-widest text-primary">My Journey</span>
            <h1 className="font-display text-5xl md:text-7xl text-foreground mt-3 leading-none">
              WHY I BUILT <span className="text-gradient-orange">THIS</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground font-body leading-relaxed max-w-lg">
              This isn't just a basketball website. It's a reflection of my personal transformation — from a kid who was afraid of the spotlight to someone
              who now wants to shine it on others.
            </p>
          </motion.div>
        </div>
      </section>
      <section className="py-20 md:py-28 border-b border-border/30">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-5xl text-foreground">
              HOOPIN AINT JUST THE DREAM, ITS <span className="text-gradient-orange"> ABOUT HOW I BALL</span>.
            </h2>
            <p className="mt-6 text-muted-foreground font-body leading-relaxed">
              When I first picked up a basketball, I didn't know it would change my life. I wasn't looking for a sport — I was looking for myself. And in
              the bounce of the ball, in the challenge of getting better, I found what I'd been searching for.
            </p>
          </AnimatedSection>
        </div>
      </section>
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="text-xs font-body font-semibold uppercase tracking-widest text-primary">My Timeline</span>
            <h2 className="font-display text-4xl md:text-5xl text-foreground mt-3">
              THE PATH TO <span className="text-gradient-orange">CONFIDENCE</span>
            </h2>
          </AnimatedSection>

          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

            {timelineEvents.map((event, i) => (
              <AnimatedSection
                key={event.year}
                delay={i * 0.15}
                direction={i % 2 === 0 ? "left" : "right"}
                className="mb-12 last:mb-0"
              >
                <div className={`relative flex flex-col md:flex-row items-start gap-6 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <span className="text-xs font-body font-semibold uppercase tracking-widest text-primary">{event.year}</span>
                    <h3 className="font-display text-2xl text-foreground mt-2">{event.title}</h3>
                    <p className="mt-3 text-muted-foreground font-body text-sm leading-relaxed">{event.content}</p>
                  </div>

                  <motion.div
                    whileInView={{ scale: [0, 1.2, 1] }}
                    viewport={{ once: true }}
                    className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center z-10"
                  >
                    <event.icon size={14} className="text-primary" />
                  </motion.div>

                  <div className="hidden md:block md:w-1/2" />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-xl overflow-hidden">
            <motion.div whileHover={{ scale: 1.02 }} className="relative h-64 lg:h-96">
              <img src={teamHuddle.src} alt="Team unity" className="w-full h-full object-cover" loading="lazy" width={800} height={600} />
              <div className="absolute inset-0 bg-primary/20" />
            </motion.div>
            <div className="bg-card p-8 lg:p-12 flex flex-col justify-center">
              <AnimatedSection>
                <h3 className="font-display text-3xl text-foreground">A MESSAGE TO YOU</h3>
                <p className="mt-4 text-muted-foreground font-body leading-relaxed">
                  If you're reading this and you feel unsure of yourself — if you feel like you're not enough — I want you to know that you are. Sometimes
                  all it takes is finding the right thing that makes you feel alive. For me, that was basketball.
                </p>
                <p className="mt-4 text-muted-foreground font-body leading-relaxed">
                  Don't wait for confidence to come to you. Go find it. Step outside your comfort zone. Pick up a ball. Join a team. Make mistakes. Get
                  better. And one day, you'll look back and realize how far you've come.
                </p>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <AnimatedSection>
            <h2 className="font-display text-4xl md:text-5xl text-foreground">
              YOUR COURT IS <span className="text-gradient-orange">WAITING</span>
            </h2>
            <p className="mt-4 text-muted-foreground font-body max-w-md mx-auto">Start exploring, start learning, and start your own story.</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                <Link
                  href="/learn"
                  className="px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-body font-semibold text-sm uppercase tracking-wider glow-orange inline-block"
                >
                  Start Learning Basketball
                </Link>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default MyStory;
