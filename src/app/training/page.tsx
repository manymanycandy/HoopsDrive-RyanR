"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { Play, Flame, Zap, Wind, Heart, Shield, Apple, BookOpen } from "lucide-react";

interface TrainingLesson {
  id: number;
  title: string;
  description: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  videoId: string;
  duration: string;
  sports: string[];
}

const categories = [
  { id: "all", label: "All", icon: BookOpen },
  { id: "warmup", label: "Warm-Up", icon: Flame },
  { id: "strength", label: "Strength", icon: Zap },
  { id: "cardio", label: "Cardio & Speed", icon: Wind },
  { id: "flexibility", label: "Flexibility", icon: Heart },
  { id: "injury", label: "Injury Prevention", icon: Shield },
  { id: "nutrition", label: "Nutrition", icon: Apple },
];

const lessons: TrainingLesson[] = [
  {
    id: 1,
    title: "Dynamic Warm-Up Routine (Full Body)",
    description: "A complete pre-workout warm-up targeting hips, ankles, shoulders, and spine — suitable before any sport.",
    category: "warmup",
    level: "Beginner",
    videoId: "placeholder",
    duration: "8:00",
    sports: ["Basketball", "Soccer", "Football"],
  },
  {
    id: 2,
    title: "High Knees & Leg Swing Drills",
    description: "Activate your hip flexors and increase blood flow with these dynamic warm-up movements.",
    category: "warmup",
    level: "Beginner",
    videoId: "placeholder",
    duration: "5:30",
    sports: ["Basketball", "Running"],
  },
  {
    id: 3,
    title: "Jump Squat & Explosive Power Training",
    description: "Build vertical leap and lower-body explosion with jump squats, box jumps, and plyometric circuits.",
    category: "strength",
    level: "Intermediate",
    videoId: "placeholder",
    duration: "14:00",
    sports: ["Basketball", "Volleyball", "Football"],
  },
  {
    id: 4,
    title: "Push-Up Progression: Beginner to Advanced",
    description: "From knee push-ups to archer push-ups — build pressing strength with bodyweight progressions.",
    category: "strength",
    level: "Beginner",
    videoId: "placeholder",
    duration: "10:15",
    sports: ["Basketball", "Football", "Swimming"],
  },
  {
    id: 5,
    title: "Bulgarian Split Squat for Athletes",
    description: "The single best single-leg strength exercise for sport. Build power, balance, and reduce injury risk.",
    category: "strength",
    level: "Intermediate",
    videoId: "placeholder",
    duration: "9:00",
    sports: ["Basketball", "Soccer", "Tennis"],
  },
  {
    id: 6,
    title: "Suicide Drills & Shuttle Run Guide",
    description: "Master the classic basketball conditioning drill used by pros. Improves speed, agility, and stamina.",
    category: "cardio",
    level: "Intermediate",
    videoId: "placeholder",
    duration: "7:45",
    sports: ["Basketball", "Soccer", "Football"],
  },
  {
    id: 7,
    title: "Jump Rope HIIT for Athletes",
    description: "8 rounds of jump rope intervals to build elite foot speed, coordination, and cardiovascular endurance.",
    category: "cardio",
    level: "Beginner",
    videoId: "placeholder",
    duration: "12:00",
    sports: ["Basketball", "Boxing", "Football"],
  },
  {
    id: 8,
    title: "Lateral Shuffle & Defensive Speed Drills",
    description: "Improve lateral quickness and change-of-direction speed — critical for defense in any sport.",
    category: "cardio",
    level: "Intermediate",
    videoId: "placeholder",
    duration: "10:30",
    sports: ["Basketball", "Tennis", "Soccer"],
  },
  {
    id: 9,
    title: "World's Greatest Stretch Explained",
    description: "One movement that hits your hips, thoracic spine, and hamstrings. Do this every single day.",
    category: "flexibility",
    level: "Beginner",
    videoId: "placeholder",
    duration: "6:00",
    sports: ["Basketball", "Soccer", "Golf"],
  },
  {
    id: 10,
    title: "Hip Flexor & Pigeon Pose Routine",
    description: "Basketball players develop extremely tight hips. This routine fixes that and prevents back pain.",
    category: "flexibility",
    level: "Beginner",
    videoId: "placeholder",
    duration: "8:30",
    sports: ["Basketball", "Running", "Cycling"],
  },
  {
    id: 11,
    title: "Nordic Hamstring Curl Technique",
    description: "The #1 evidence-based exercise for preventing hamstring tears in sprinting and jumping sports.",
    category: "injury",
    level: "Advanced",
    videoId: "placeholder",
    duration: "7:00",
    sports: ["Basketball", "Football", "Soccer"],
  },
  {
    id: 12,
    title: "Ankle Stability & Proprioception Drills",
    description: "Reduce ankle sprain risk with these targeted exercises. Essential for basketball and court sports.",
    category: "injury",
    level: "Beginner",
    videoId: "placeholder",
    duration: "9:15",
    sports: ["Basketball", "Volleyball", "Running"],
  },
  {
    id: 13,
    title: "Rotator Cuff Strengthening for Athletes",
    description: "Protect your shooting shoulder and prevent impingement with these targeted band exercises.",
    category: "injury",
    level: "Beginner",
    videoId: "placeholder",
    duration: "8:00",
    sports: ["Basketball", "Baseball", "Swimming"],
  },
  {
    id: 14,
    title: "Pre-Game Meal Planning for Athletes",
    description: "What to eat 2–3 hours before competition. Timing, portion size, and food choices explained.",
    category: "nutrition",
    level: "Beginner",
    videoId: "placeholder",
    duration: "11:00",
    sports: ["All Sports"],
  },
  {
    id: 15,
    title: "Post-Workout Recovery & Sleep Optimization",
    description: "Maximize muscle repair with the right post-training nutrition window, cold recovery, and sleep strategy.",
    category: "nutrition",
    level: "Beginner",
    videoId: "placeholder",
    duration: "10:30",
    sports: ["All Sports"],
  },
];

const levelColors: Record<string, string> = {
  Beginner: "bg-green-500/10 text-green-400",
  Intermediate: "bg-accent/10 text-accent",
  Advanced: "bg-primary/10 text-primary",
};

const Training = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeLevel, setActiveLevel] = useState<string>("all");

  const filtered = lessons.filter((l) => {
    const catMatch = activeCategory === "all" || l.category === activeCategory;
    const lvlMatch = activeLevel === "all" || l.level === activeLevel;
    return catMatch && lvlMatch;
  });

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-28 pb-12 md:pt-36 md:pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedSection className="text-center">
            <span className="text-xs font-body font-semibold uppercase tracking-widest text-primary">
              Multi-Sport Fitness
            </span>
            <h1 className="font-display text-5xl md:text-7xl text-foreground mt-3">
              TRAINING <span className="text-gradient-orange">GUIDE</span>
            </h1>
            <p className="mt-4 text-muted-foreground font-body max-w-xl mx-auto">
              Video-based fitness lessons designed to elevate your basketball performance — and every sport you play.
              Build strength, speed, flexibility, and resilience.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Sticky Filters */}
      <section className="pb-4 sticky top-16 md:top-20 z-30 bg-background/90 backdrop-blur-xl border-b border-border/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-body font-medium uppercase tracking-wider whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground border border-border"
                }`}
              >
                <cat.icon size={14} />
                {cat.label}
              </motion.button>
            ))}
          </div>
          <div className="flex gap-2 mt-3">
            {["all", "Beginner", "Intermediate", "Advanced"].map((d) => (
              <button
                key={d}
                onClick={() => setActiveLevel(d)}
                className={`px-3 py-1 rounded text-[10px] font-body font-medium uppercase tracking-wider transition-all ${
                  activeLevel === d ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {d === "all" ? "All Levels" : d}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Notice */}
      <section className="pt-6">
        <div className="container mx-auto px-4 md:px-6">
          <div className="p-4 rounded-lg bg-secondary/50 border border-border/30 mb-8">
            <p className="text-xs text-muted-foreground font-body">
              📹 Videos below are placeholder thumbnails. Replace the <code className="text-primary">videoId</code> in{" "}
              <code className="text-primary">src/app/training/page.tsx</code> with real YouTube video IDs to embed them.
              Always ensure videos are legal to embed.
            </p>
          </div>
        </div>
      </section>

      {/* Video Grid */}
      <section className="pb-20 md:pb-32">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((lesson, i) => (
                <motion.div
                  key={lesson.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <motion.div
                    whileHover={{ y: -6 }}
                    className="group rounded-xl overflow-hidden bg-gradient-card border border-border/50 h-full flex flex-col"
                  >
                    {/* Thumbnail / Video area */}
                    {lesson.videoId !== "placeholder" ? (
                      <div className="relative w-full aspect-video">
                        <iframe
                          src={`https://www.youtube.com/embed/${lesson.videoId}`}
                          title={lesson.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                        />
                      </div>
                    ) : (
                      <div className="relative h-44 bg-secondary flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/5" />
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          className="w-14 h-14 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center border border-primary/30 z-10"
                        >
                          <Play size={24} className="text-primary ml-1" />
                        </motion.div>
                        <span className="absolute top-2 left-2 px-2 py-1 rounded bg-background/60 backdrop-blur-sm text-[10px] font-body text-muted-foreground">
                          Coming Soon
                        </span>
                        <span className="absolute bottom-2 right-2 px-2 py-1 rounded bg-background/70 backdrop-blur-sm text-[10px] font-body text-foreground">
                          {lesson.duration}
                        </span>
                      </div>
                    )}

                    {/* Card content */}
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-body font-semibold uppercase ${levelColors[lesson.level]}`}>
                          {lesson.level}
                        </span>
                      </div>
                      <h3 className="font-display text-lg text-foreground">{lesson.title}</h3>
                      <p className="mt-2 text-xs text-muted-foreground font-body leading-relaxed flex-1">
                        {lesson.description}
                      </p>
                      {/* Sports tags */}
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {lesson.sports.map((sport) => (
                          <span
                            key={sport}
                            className="px-2 py-0.5 rounded-full text-[10px] font-body border border-border text-muted-foreground"
                          >
                            {sport}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground font-body">No lessons found for this filter combination.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Training;