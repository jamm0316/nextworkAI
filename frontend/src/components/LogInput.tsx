"use client";

import { useState } from "react";
import { Send, Sparkles } from "lucide-react";

export function LogInput() {
    const [input, setInput] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!input.trim()) return;
        setIsSubmitting(true);

        try {
            // API call placeholder
            console.log("Submitting log:", input);
            await new Promise(resolve => setTimeout(resolve, 1000)); // Fake delay
            setInput("");
            alert("Log submitted! AI is processing...");
        } catch (e) {
            console.error(e);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="relative rounded-2xl border border-white/10 bg-zinc-900/50 p-1 backdrop-blur-xl transition-all focus-within:ring-2 focus-within:ring-indigo-500/50">
            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste your AI conversation logs or type your daily memos here..."
                className="min-h-[120px] w-full resize-none rounded-xl bg-transparent p-4 text-white placeholder-zinc-500 outline-none"
            />
            <div className="flex justify-end p-2">
                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting || !input.trim()}
                    className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-hover hover:bg-indigo-500 disabled:opacity-50"
                >
                    {isSubmitting ? (
                        <Sparkles className="h-4 w-4 animate-spin" />
                    ) : (
                        <Send className="h-4 w-4" />
                    )}
                    {isSubmitting ? "Processing..." : "Submit Log"}
                </button>
            </div>
        </div>
    );
}
