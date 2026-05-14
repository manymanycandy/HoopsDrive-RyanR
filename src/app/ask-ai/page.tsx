"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { Send, Bot, User, Sparkles, Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


interface Message {
    id: number;
    role: "user" | "assistant";
    content: string;
}


const SYSTEM_INSTRUCTION = [
    "Bạn là trợ lý AI chuyên gia về BÓNG RỔ (Basketball Expert).",
    "Nhiệm vụ của bạn là trả lời mọi câu hỏi liên quan đến bóng rổ, bao gồm: kỹ thuật, luật thi đấu, chiến thuật, luyện tập, thể lực, dinh dưỡng, sức khỏe thể thao, lịch sử, cầu thủ, đội bóng, giải đấu và TRANG THIẾT BỊ (như giày, bóng, phụ kiện).",
    "QUAN TRỌNG: Bạn phải xem xét ngữ cảnh của cuộc hội thoại. Ví dụ, nếu người dùng đã hỏi về bóng rổ trước đó và sau đó hỏi 'còn giày thì sao?', bạn phải hiểu là họ đang hỏi về giày bóng rổ.",
    "Nếu một câu hỏi hoàn toàn không liên quan đến bóng rổ (ngay cả khi đã xét ngữ cảnh), hãy từ chối lịch sự và gợi ý người dùng hỏi về các chủ đề bóng rổ.",
    "Trả lời bằng tiếng anh, rõ ràng, thực tế và chuyên sâu. Nếu không chắc chắn về số liệu, hãy nói rõ.",
].join("\n");

const suggestedQuestions = [
    "Who are the greatest basketball players of all time?",
    "How can beginners improve dribbling?",
    "What position suits my play style?",
    "How can basketball help build confidence?",
    "What shoes should I buy?",
    "What are the basic rules of basketball?",
];

const AskAI = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [selectedModel, setSelectedModel] = useState("gemini-3-flash-preview");
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = async (text?: string) => {
        const content = (text || input).trim();
        if (!content || isTyping) return;

        const userMsg: Message = { id: Date.now(), role: "user", content };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        try {
            const history = messages
                .filter((m) => m && (m.role === "user" || m.role === "assistant"))
                .slice(-20);

            const contents = [
                { role: "user", parts: [{ text: SYSTEM_INSTRUCTION }] },
                ...history.map((m) => ({
                    role: m.role === "assistant" ? "model" : "user",
                    parts: [{ text: m.content }],
                })),
                { role: "user", parts: [{ text: content }] },
            ];

            const resp = await fetch("/api/chat", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ contents, model: selectedModel }),
            });

            const json = await resp.json().catch(() => ({}));
            if (!resp.ok) {
                throw new Error(json?.error || `API error (${resp.status})`);
            }

            if (!json.answer) throw new Error("Empty response from AI");

            setMessages((prev) => [...prev, { id: Date.now() + 1, role: "assistant", content: json.answer }]);
        } catch (error: unknown) {
            const errorMsg = error instanceof Error ? error.message : "Lỗi không xác định";
            const isOverloaded = errorMsg.includes("high demand") || errorMsg.includes("429") || errorMsg.includes("503") || errorMsg.includes("not found");
            const advice = isOverloaded ? "\n\n💡 **Gợi ý:** Model hiện tại đang quá tải hoặc tạm ngưng hỗ trợ. Vui lòng đổi sang Model khác ở phía trên và đẩy lại câu hỏi." : "";

            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now() + 1,
                    role: "assistant",
                    content: `Không gọi được AI lúc này: ${errorMsg}.${advice}`,
                },
            ]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <Layout>
            <section className="pt-20 min-h-screen flex flex-col">
                <div className="container mx-auto px-4 md:px-6 flex flex-col flex-1 max-w-3xl">
                    <div className="pt-8 pb-4 text-center">
                        <AnimatedSection>
                            <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-4">
                                <Bot className="text-primary" size={28} />
                            </div>
                            <h1 className="font-display text-4xl md:text-5xl text-foreground">
                                ASK <span className="text-gradient-orange">AI</span>
                            </h1>
                            <p className="mt-2 text-sm text-muted-foreground font-body">Your personal basketball knowledge assistant</p>

                            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                                <div className="px-3 py-1.5 rounded-lg bg-secondary/50 border border-border/30 inline-flex items-center text-xs text-muted-foreground font-body">
                                    <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse mr-2"></span>
                                    Ready
                                </div>

                                <Select value={selectedModel} onValueChange={setSelectedModel}>
                                    <SelectTrigger className="w-[180px] h-8 bg-secondary/80 border-border/50 text-xs font-body focus:ring-1 focus:ring-primary/50">
                                        <SelectValue placeholder="Select Model" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="gemini-3-flash-preview" className="text-xs font-body cursor-pointer">
                                            Gemini 3 Flash
                                        </SelectItem>
                                        <SelectItem value="gemini-2.5-flash" className="text-xs font-body cursor-pointer">
                                            Gemini 2.5 Flash
                                        </SelectItem>
                                        <SelectItem value="llama-3.3-70b-versatile" className="text-xs font-body cursor-pointer">
                                            Llama 3.3 70B
                                        </SelectItem>
                                        <SelectItem value="llama-3.1-8b-instant" className="text-xs font-body cursor-pointer">
                                            Llama 3.1 8B (Fast)
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </AnimatedSection>
                    </div>

                    <div className="flex-1 overflow-y-auto py-6 space-y-4 min-h-[40vh]">
                        {messages.length === 0 && (
                            <AnimatedSection className="text-center py-12">
                                <Sparkles className="text-muted-foreground/30 mx-auto mb-4" size={40} />
                                <p className="text-muted-foreground font-body text-sm mb-6">
                                    Ask anything about basketball — history, skills, players, gear, or confidence tips.
                                </p>
                                <div className="flex flex-wrap gap-2 justify-center max-w-lg mx-auto">
                                    {suggestedQuestions.map((q) => (
                                        <motion.button
                                            key={q}
                                            whileHover={{ scale: 1.03, y: -2 }}
                                            whileTap={{ scale: 0.97 }}
                                            onClick={() => handleSend(q)}
                                            className="px-3 py-2 rounded-lg bg-secondary border border-border text-xs font-body text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all text-left"
                                        >
                                            {q}
                                        </motion.button>
                                    ))}
                                </div>
                            </AnimatedSection>
                        )}

                        <AnimatePresence>
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                                >
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === "user" ? "bg-primary/20" : "bg-secondary"
                                            }`}
                                    >
                                        {msg.role === "user" ? <User size={14} className="text-primary" /> : <Bot size={14} className="text-muted-foreground" />}
                                    </div>
                                    <div
                                        className={`max-w-[80%] px-4 py-3 rounded-xl text-sm font-body leading-relaxed overflow-hidden ${msg.role === "user"
                                                ? "bg-primary text-primary-foreground rounded-br-sm"
                                                : "bg-secondary text-foreground rounded-bl-sm border border-border/50"
                                            }`}
                                    >
                                        {msg.role === "assistant" ? (
                                            <div className="prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed prose-p:my-1 prose-headings:mb-2 prose-headings:mt-3 prose-ul:my-1 prose-ol:my-1 prose-li:my-0.5 prose-strong:font-semibold prose-strong:text-foreground prose-headings:text-foreground prose-a:text-primary break-words">
                                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                    {msg.content}
                                                </ReactMarkdown>
                                            </div>
                                        ) : (
                                            msg.content
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {isTyping && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                                    <Bot size={14} className="text-muted-foreground" />
                                </div>
                                <div className="px-4 py-3 rounded-xl bg-secondary border border-border/50 rounded-bl-sm">
                                    <div className="flex gap-1">
                                        {[0, 1, 2].map((i) => (
                                            <motion.div
                                                key={i}
                                                animate={{ y: [0, -4, 0] }}
                                                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                                                className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        <div ref={chatEndRef} />
                    </div>

                    <div className="sticky bottom-0 pb-6 pt-4 bg-gradient-to-t from-background via-background to-transparent">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSend();
                            }}
                            className="flex gap-2"
                        >
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask anything about basketball..."
                                className="flex-1 px-4 py-3 rounded-xl bg-secondary border border-border text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                            />
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                disabled={!input.trim() || isTyping}
                                className="w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                                aria-label="Send message"
                            >
                                {isTyping ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                            </motion.button>
                        </form>

                        {messages.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                                {suggestedQuestions.slice(0, 3).map((q) => (
                                    <button
                                        key={q}
                                        onClick={() => handleSend(q)}
                                        className="px-3 py-1.5 rounded-lg bg-secondary/50 border border-border/30 text-[10px] font-body text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {q}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default AskAI;