"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { Play, BookOpen, Target, Footprints, Shield, Users, Zap, AlertTriangle, Heart } from "lucide-react";

interface VideoLesson {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  videoId: string;
  duration: string;
}

const categories = [
  { id: "all", label: "All", icon: BookOpen },
  { id: "rules", label: "Basic Rules", icon: BookOpen },
  { id: "dribbling", label: "Dribbling", icon: Zap },
  { id: "shooting", label: "Shooting", icon: Target },
  { id: "passing", label: "Passing", icon: Users },
  { id: "defense", label: "Defense", icon: Shield },
  { id: "footwork", label: "Footwork", icon: Footprints },
  { id: "mistakes", label: "Common Mistakes", icon: AlertTriangle },
  { id: "confidence", label: "Confidence", icon: Heart },
];

const lessons: VideoLesson[] = [
  {
    id: 1,
    title: "Basketball Rules Explained Simply",
    description: "Learn the fundamental rules of basketball in under 10 minutes. Perfect for absolute beginners.",
    category: "rules",
    difficulty: "Beginner",
    videoId: "wYjp2zoqQrs",
    duration: "8:30",
  },
  {
    id: 2,
    title: "Basic Dribbling for Beginners",
    description: "Learn the drills, and the basic of handling and dribbling the ball.",
    category: "dribbling",
    difficulty: "Beginner",
    videoId: "foxgBVF3LwM?si=2-mY6JOhygUm3iOq",
    duration: "10:24",
  },
  {
    id: 3,
    title: "Ball Handling Drills",
    description: "Learn to dribble the ball more in - game like.",
    category: "dribbling",
    difficulty: "Intermediate",
    videoId: "Hg9HOElJ5ZY?si=M6C8wYMhJGKT7hmU",
    duration: "15:00",
  },
  {
    id: 4,
    title: "THE MASTERCLASS FOR SHOOTING THE BALL",
    description: "A master class from the best shooting teacher I know.",
    category: "shooting",
    difficulty: "Advanced",
    videoId: "jPHvxFiNq80?si=nc6sodvsv_cGI2Fp",
    duration: "More than 1 hour",
  },
  {
    id: 5,
    title: "In game-like Shooting Drills",
    description: "Range, rhythm, and release — everything you need to become a threat from beyond the arc.",
    category: "shooting",
    difficulty: "Intermediate",
    videoId: "ecPyYg53Rw8?si=pH09B0nhQqK0fwgB",
    duration: "15:11",
  },
  {
    id: 6,
    title: "How to Pass the ball",
    description: "Pass the ball because this is a team game, but can you pass it in a way that in us games?",
    category: "passing",
    difficulty: "Intermediate",
    videoId: "m2sI6P7UQFw?si=QX5ZzgqgQGmoo0ht",
    duration: "10:47",
  },
  {
    id: 7,
    title: "The defense Masterclass",
    description: "Good defense wins games. Learn proper positioning, footwork, and how to stay in front of your opponent.",
    category: "defense",
    difficulty: "Intermediate",
    videoId: "3whM5OZ3c_Q?si=TGe8-93CwJ0zMJww",
    duration: "24:04",
  },
  {
    id: 8,
    title: "Essential Footwork Drills",
    description: "Quick feet = better game. These drills will improve your agility, balance, and court speed.",
    category: "footwork",
    difficulty: "Intermediate",
    videoId: "YLDFP1MdNUg?si=ILyszAP6SdqB1IC6",
    duration: "16:47",
  },
  {
    id: 9,
    title: "Top mistakes you makes when dribbling the ball",
    description: "Learn the most common mistakes new players make dribbling the ball and how to fix them.",
    category: "mistakes",
    difficulty: "Beginner",
    videoId: "jU2Hu2dGHx0?si=80nbicIT9wQas5zC",
    duration: "6:07",
  },
  {
    id: 10,
    title: "Building Confidence on the Court",
    description: "Basketball is a mental game too. Learn techniques to overcome fear, stay calm, and play with confidence.",
    category: "confidence",
    difficulty: "Beginner",
    videoId: "sWLYBA2LRb8?si=LotYaYqPlyC4696g",
    duration: "50:36",
  },
  {
    id: 11,
    title: "Teamwork & Positions Basics",
    description: "Understanding yourself and what position you are makes the team balanced and stronger with more dynamic.",
    category: "rules",
    difficulty: "Intermediate",
    videoId: "2cHrXR29dmQ?si=P5SO6QoMLRla6Gju",
    duration: "13:00",
  },
  {
    id: 12,
    title: "Layup Techniques & Finishing at the Rim",
    description: "How you can make your layups, the best tips and drills",
    category: "shooting",
    difficulty: "Intermediate",
    videoId: "n3U0hw_1UW8?si=uXJy47qS0hYlbWHu",
    duration: "9:43",
  },
  {
    id: 13,
    title: "Defensive drills to do lock down defense",
    description: "Work on your footwork and mobility to lock down anybody",
    category: "defense",
    difficulty: "Beginner",
    videoId: "mTkNmMqfTWs?si=KCCcEpryfGJ1BNNG",
    duration: "23:21",
  },
  {
    id: 14,
    title: "Footwork Fundamentals",
    description: "The basics of your feet and the advanced method to score",
    category: "footwork",
    difficulty: "Beginner",
    videoId: "7g1JLGZmNKM?si=1olR506__51HsIfM",
    duration: "6:58",
  },
  {
    id: 15,
    title: "Post moves rankings, for your bag",
    description: "Combine foot work and simple touches to score easily",
    category: "shooting",
    difficulty: "Intermediate",
    videoId: "zbFHLd9lFkA?si=wMC109zXKv70W7z2",
    duration: "7:12",
  },
];

const difficultyColors: Record<string, string> = {
  Beginner: "bg-green-500/10 text-green-400",
  Intermediate: "bg-accent/10 text-accent",
  Advanced: "bg-primary/10 text-primary",
};

const Learn = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeDifficulty, setActiveDifficulty] = useState<string>("all");

  const filtered = lessons.filter((l) => {
    const catMatch = activeCategory === "all" || l.category === activeCategory;
    const diffMatch = activeDifficulty === "all" || l.difficulty === activeDifficulty;
    return catMatch && diffMatch;
  });

  return (
    <Layout>
      <section className="pt-28 pb-12 md:pt-36 md:pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedSection className="text-center">
            <span className="text-xs font-body font-semibold uppercase tracking-widest text-primary">Learn & Grow</span>
            <h1 className="font-display text-5xl md:text-7xl text-foreground mt-3">
              LEARN <span className="text-gradient-orange">BASKETBALL</span>
            </h1>
            <p className="mt-4 text-muted-foreground font-body max-w-xl mx-auto">
              From beginner to advanced — structured lessons to help you develop your skills, build confidence, and fall in love with the game.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="pb-4 sticky top-16 md:top-20 z-30 bg-background/90 backdrop-blur-xl border-b border-border/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-body font-medium uppercase tracking-wider whitespace-nowrap transition-all ${activeCategory === cat.id
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
                onClick={() => setActiveDifficulty(d)}
                className={`px-3 py-1 rounded text-[10px] font-body font-medium uppercase tracking-wider transition-all ${activeDifficulty === d ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {d === "all" ? "All Levels" : d}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="pt-6">
        <div className="container mx-auto px-4 md:px-6">
          <div className="p-4 rounded-lg bg-secondary/50 border border-border/30 mb-8">
            <p className="text-xs text-muted-foreground font-body">
              📹 Videos below are placeholder thumbnails. Replace the <code className="text-primary">videoId</code> with real YouTube video IDs of
              royalty-free, embeddable educational content. Always ensure videos are legal to embed.
            </p>
          </div>
        </div>
      </section>

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
                  <motion.div whileHover={{ y: -6 }} className="group rounded-xl overflow-hidden bg-gradient-card border border-border/50 h-full flex flex-col">
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
                      <div className="relative h-40 bg-secondary flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/5" />
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          className="w-14 h-14 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center border border-primary/30 z-10"
                        >
                          <Play size={24} className="text-primary ml-1" />
                        </motion.div>
                        <span className="absolute bottom-2 right-2 px-2 py-1 rounded bg-background/70 backdrop-blur-sm text-[10px] font-body text-foreground">
                          {lesson.duration}
                        </span>
                      </div>
                    )}
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-body font-semibold uppercase ${difficultyColors[lesson.difficulty]}`}>
                          {lesson.difficulty}
                        </span>
                      </div>
                      <h3 className="font-display text-lg text-foreground">{lesson.title}</h3>
                      <p className="mt-2 text-xs text-muted-foreground font-body leading-relaxed flex-1">{lesson.description}</p>
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

export default Learn;