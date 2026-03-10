import React from "react";
import { Facebook, Instagram, Music2 } from "lucide-react";
import { cn } from "../lib/utils";
import { motion } from "framer-motion";

const socialLinks = [
    {
        name: "Facebook",
        icon: <Facebook className="w-5 h-5" />,
        url: "https://www.facebook.com/arron.tuazon.7",
        color: "hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
    },
    {
        name: "Instagram",
        icon: <Instagram className="w-5 h-5" />,
        url: "https://www.instagram.com/aronnntzn",
        color: "hover:text-pink-600 hover:bg-pink-50 dark:hover:bg-pink-900/20"
    },
    {
        name: "TikTok",
        icon: <Music2 className="w-5 h-5" />,
        url: "https://www.tiktok.com/@chocolate_o_o5?is_from_webapp=1&sender_device=pc",
        color: "hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
    }
];

export default function SocialLinks({ isDark }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {socialLinks.map((link, index) => (
                <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className={cn(
                        "flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 group",
                        isDark
                            ? "bg-slate-900/40 border-slate-800 hover:border-slate-700"
                            : "bg-white border-slate-200 hover:border-slate-300",
                        link.color
                    )}
                >
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 group-hover:scale-110 transition-transform duration-300">
                            {link.icon}
                        </div>
                        <span className="font-bold text-sm">{link.name}</span>
                    </div>
                    <motion.span
                        className="opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 duration-300 text-xs font-bold"
                    >
                        Follow →
                    </motion.span>
                </motion.a>
            ))}
        </div>
    );
}
