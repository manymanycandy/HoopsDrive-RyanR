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
    videoId: "cmple9fw65w?si=80q8mc82KDcOq7Qh",
    duration: "8:00",
    sports: ["Basketball", "Soccer", "Football", "Any other sports"],
  },
  {
    id: 2,
    title: "Biceps",
    description: "Dont you want a good pair of biceps and stand proud? And they are practical too!",
    category: "strength",
    level: "Beginner",
    videoId: "snA6ls2kG3U?si=uxau3GCDNS9VBEt_",
    duration: "10:00",
    sports: ["Basketball", "Volleyball", "Football", "Any"],
  },
  {
    id: 3,
    title: "Triceps",
    description: "A good pair of Biceps pairs well with sharp triceps, and triceps are great to strenghten.",
    category: "strength",
    level: "Beginner",
    videoId: "JfSee0Q-vRQ?si=5bq96m9IRVKO32ud",
    duration: "10:00",
    sports: ["Basketball", "Football", "Shot Put", "Any"],
  },
  {
    id: 4,
    title: "Fore arms",
    description: "They do come as you work your arms out, but you dont want to be a weak arm wrestler",
    category: "strength",
    level: "Beginner",
    videoId: "8A2tiVqCPBg?si=6L-xg7QnR9ckE7Pf",
    duration: "10:00",
    sports: ["Basketball", "Swimming", "Tennis", "Badminton"],
  },
  {
    id: 5,
    title: "Shoulders",
    description: "Make yourself ready for those bumps, increase size and power",
    category: "strenght",
    level: "Intermediate",
    videoId: "QVaijMZ2mp8?si=pbZZYs6cFs3UAAN5",
    duration: "10:00",
    sports: ["Basketball", "Football", "Soccer", "Any"],
  },
  {
    id: 6,
    title: "Chest",
    description: "Good chest always works best, strengthen your upperbody to stand not fall in the wind.",
    category: "strenght",
    level: "Advanced",
    videoId: "zxQpfu7fIfc?si=tNDSbxeI4NmRfECZ",
    duration: "10:00",
    sports: ["Basketball", "Soccer", "Football", "Any"],
  },
  {
    id: 7,
    title: "Back",
    description: "Good front weak back aint gonna hold you up for long, get a firm back for better posture and quality of life",
    category: "Strenght",
    level: "Intermediate",
    videoId: "VZ3QUj9yluI?si=qAm7UfmeEIbG5FIM",
    duration: "9:00",
    sports: ["Basketball", "Wrestling", "Football", "Rowing"],
  },
  {
    id: 8,
    title: "Lowerback",
    description: "A janky upperbody with no core or lower back strenght will just be as flimsy as a stick, so lets build your foundation.",
    category: "Strenght",
    level: "Advanced",
    videoId: "tCzkJPIcbWM?si=rwXZoE82WmKgnypC",
    duration: "30:00",
    sports: ["Basketball", "Tennis", "Soccer", "Football", "Any"],
  },
  {
    id: 9,
    title: '"LEG DAY"',
    description: "The purest form of pain, nothing else, only legs",
    category: "Strenght",
    level: "Advanced",
    videoId: "H6mRkx1x77k?si=mTONOqUOdg3W9x-6",
    duration: "do it for an hour",
    sports: ["EVERYTHING"],
  },
  {
    id: 10,
    title: "Conditioning",
    description: "Conditioning is key, to like a lot of the locks!",
    category: "cardio",
    level: "Beginner",
    videoId: "3-_cOnVk0N4?si=FVGjzXEc_9M7KblK",
    duration: "30:00",
    sports: ["Basketball", "Track", "Cycling", "Soccer","Any"],
  },
  {
    id: 11,
    title: "Cardio",
    description: "Gotta hit your cadio before you gas out!",
    category: "cardio",
    level: "Beginner",
    videoId: "zibJBrpA8pw?si=aGfj70WFgrMxJeot",
    duration: "30:00",
    sports: ["Basketball", "Football", "Soccer", "Swimming", "Any"],
  },
  {
    id: 12,
    title: "Lower body stretching",
    description: "Reduce ankle sprain risk with these targeted exercises. Essential for basketball and court sports.",
    category: "injury",
    level: "Beginner",
    videoId: "6bhmYVV6wpQ?si=as7H7zTVcZrIjVp3",
    duration: "8:56",
    sports: ["For your everyday life"],
  },
  {
    id: 13,
    title: "Full body stretch",
    description: "You wont regret it!",
    category: "flexibility",
    level: "Beginner",
    videoId: "JJAHGpe0AVU?si=XqFsz86mLIXrhfjI",
    duration: "37:50",
    sports: ["Basketball", "Baseball", "Swimming", "ANYTHING"],
  },
  {
    id: 14,
    title: "Before sleep routines to prevent injuries",
    description: "Dont go to sleep with a stif body! Relieve the tension and let your body rest properly.",
    category: "flexibility",
    level: "Beginner",
    videoId: "O98j9-Dr_C0?si=MAzS36xscjotgI0m",
    duration: "11:18",
    sports: ["All Sports"],
  },
  {
    id: 15,
    title: "How do you build your meals?",
    description: "How much protein? Carbs? What do I eat? All answered in one video",
    category: "nutrition",
    level: "Intermediate",
    videoId: "GyxAGh7cVxo?si=xIq1vteiVh-3wp_I",
    duration: "16:29",
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