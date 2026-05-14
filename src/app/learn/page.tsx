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
        videoId: "placeholder",
        duration: "8:30",
    },
    {
        id: 2,
        title: "Basic Dribbling for Beginners",
        description: "Master the crossover, between-the-legs, and behind-the-back dribble with these step-by-step drills.",
        category: "dribbling",
        difficulty: "Beginner",
        videoId: "https://youtu.be/R5qllWwR1io",
        duration: "12:15",
    },
    {
        id: 3,
        title: "Advanced Ball Handling Drills",
        description: "Take your handles to the next level with these pro-level combination moves.",
        category: "dribbling",
        difficulty: "Advanced",
        videoId: "placeholder",
        duration: "15:00",
    },
    {
        id: 4,
        title: "Perfect Your Shooting Form",
        description: "The BEEF method — Balance, Eyes, Elbow, Follow-through. Build a consistent shot from day one.",
        category: "shooting",
        difficulty: "Beginner",
        videoId: "placeholder",
        duration: "10:45",
    },
    {
        id: 5,
        title: "How to Shoot Three-Pointers",
        description: "Range, rhythm, and release — everything you need to become a threat from beyond the arc.",
        category: "shooting",
        difficulty: "Intermediate",
        videoId: "placeholder",
        duration: "14:20",
    },
    {
        id: 6,
        title: "Chest Pass & Bounce Pass Fundamentals",
        description: "Accurate passing is what separates good players from great ones. Master these essential passes.",
        category: "passing",
        difficulty: "Beginner",
        videoId: "placeholder",
        duration: "7:50",
    },
    {
        id: 7,
        title: "Defensive Stance & Slide Technique",
        description: "Good defense wins games. Learn proper positioning, footwork, and how to stay in front of your opponent.",
        category: "defense",
        difficulty: "Beginner",
        videoId: "placeholder",
        duration: "9:30",
    },
    {
        id: 8,
        title: "Essential Footwork Drills",
        description: "Quick feet = better game. These drills will improve your agility, balance, and court speed.",
        category: "footwork",
        difficulty: "Intermediate",
        videoId: "placeholder",
        duration: "11:00",
    },
    {
        id: 9,
        title: "Top 10 Beginner Mistakes to Avoid",
        description: "Don't develop bad habits. Learn the most common mistakes new players make and how to fix them.",
        category: "mistakes",
        difficulty: "Beginner",
        videoId: "placeholder",
        duration: "8:00",
    },
    {
        id: 10,
        title: "Building Confidence on the Court",
        description: "Basketball is a mental game too. Learn techniques to overcome fear, stay calm, and play with confidence.",
        category: "confidence",
        difficulty: "Beginner",
        videoId: "placeholder",
        duration: "10:00",
    },
    {
        id: 11,
        title: "Teamwork & Positioning Basics",
        description: "Understanding spacing, court awareness, and how to be an effective teammate.",
        category: "passing",
        difficulty: "Intermediate",
        videoId: "placeholder",
        duration: "13:00",
    },
    {
        id: 12,
        title: "Layup Techniques & Finishing at the Rim",
        description: "From basic layups to reverse finishes — master scoring around the basket.",
        category: "shooting",
        difficulty: "Intermediate",
        videoId: "placeholder",
        duration: "11:30",
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
