import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
    { path: "/", label: "Home" },
    { path: "/my-story", label: "My Story" },
    { path: "/learn", label: "Learn" },
    { path: "/training", label: "Training" },
    { path: "/minigame", label: "Minigame" },
    { path: "/ask-ai", label: "Ask AI" },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                ? "bg-background/90 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-background/50"
                : "bg-transparent"
                }`}
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between h-16 md:h-20">
                    <Link href="/" className="flex items-center gap-2 group">
                        <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                            className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary flex items-center justify-center"
                        >
                            <span className="font-display text-primary-foreground text-lg md:text-xl">H</span>
                        </motion.div>
                        <span className="font-display text-xl md:text-2xl text-foreground tracking-wider">
                            HOOPS<span className="text-primary">DRIVE</span>
                        </span>
                    </Link>

                    <div className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                href={link.path}
                                className="relative px-4 py-2 text-sm font-body font-medium tracking-wide uppercase"
                            >
                                <span
                                    className={`transition-colors duration-300 ${pathname === link.path
                                        ? "text-primary"
                                        : "text-muted-foreground hover:text-foreground"
                                        }`}
                                >
                                    {link.label}
                                </span>
                                {pathname === link.path && (
                                    <motion.div
                                        layoutId="activeNav"
                                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </Link>
                        ))}
                    </div>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden p-2 text-foreground"
                        aria-label="Toggle menu"
                    >
                        <AnimatePresence mode="wait">
                            {isOpen ? (
                                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                                    <X size={24} />
                                </motion.div>
                            ) : (
                                <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                                    <Menu size={24} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="lg:hidden bg-background/95 backdrop-blur-xl border-b border-border overflow-hidden"
                    >
                        <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.path}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    <Link
                                        href={link.path}
                                        className={`block py-3 px-4 rounded-lg text-sm font-body font-medium uppercase tracking-wide transition-colors ${pathname === link.path
                                            ? "text-primary bg-primary/10"
                                            : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                                            }`}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;