import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Github, Mail, Instagram } from "lucide-react";

const Footer = () => {
    const footerLinks = [
        {
            title: "Explore", links: [
                { label: "Home", path: "/" },
                { label: "My Story", path: "/my-story" },
                { label: "Learn Basketball", path: "/learn" },
            ]
        },
        {
            title: "More", links: [
                { label: "Training Guide", path: "/gear" },
                { label: "Minigame", path: "/minigame" },
                { label: "Ask AI", path: "/ask-ai" },
            ]
        },
    ];

    return (
        <footer className="bg-secondary/30 border-t border-border">
            <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                    <div className="md:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                                <span className="font-display text-primary-foreground text-lg">H</span>
                            </div>
                            <span className="font-display text-xl text-foreground tracking-wider">
                                HOOPS<span className="text-primary">DRIVE</span>
                            </span>
                        </Link>
                        <p className="text-muted-foreground text-sm font-body leading-relaxed max-w-sm">
                            A personal passion project exploring how basketball can build confidence,
                            shape character, and inspire growth. Built with love as part of a student portfolio.
                        </p>
                        <div className="flex gap-3 mt-6">
                            {[
                                { icon: Instagram, label: "Instagram" },
                                { icon: Github, label: "GitHub" },
                                { icon: Mail, label: "Email" },
                            ].map(({ icon: Icon, label }) => (
                                <motion.a
                                    key={label}
                                    href="#"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                                    aria-label={label}
                                >
                                    <Icon size={18} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {footerLinks.map((section) => (
                        <div key={section.title}>
                            <h4 className="font-display text-lg text-foreground mb-4 tracking-wider">{section.title}</h4>
                            <ul className="space-y-2">
                                {section.links.map((link) => (
                                    <li key={link.path}>
                                        <Link
                                            href={link.path}
                                            className="text-sm text-muted-foreground hover:text-primary transition-colors font-body"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-muted-foreground font-body">
                        Â© 2025 HoopsDrive. A student passion project.
                    </p>
                    <p className="text-xs text-muted-foreground font-body flex items-center gap-1">
                        Made with <Heart size={12} className="text-primary" /> and a love for basketball
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;