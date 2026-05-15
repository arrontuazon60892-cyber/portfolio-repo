import React from "react";
import { Facebook, Instagram, Music2 } from "lucide-react";
import { cn } from "../lib/utils";
import { motion } from "framer-motion";

const socialLinks = [
  {
    name: "Facebook",
    icon: <Facebook className="h-5 w-5" />,
    url: "https://www.facebook.com/arron.tuazon.7",
    color: "hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20",
  },
  {
    name: "Instagram",
    icon: <Instagram className="h-5 w-5" />,
    url: "https://www.instagram.com/aronnntzn",
    color: "hover:text-pink-600 hover:bg-pink-50 dark:hover:bg-pink-900/20",
  },
  {
    name: "TikTok",
    icon: <Music2 className="h-5 w-5" />,
    url: "https://www.tiktok.com/@chocolate_o_o5?is_from_webapp=1&sender_device=pc",
    color: "hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800",
  },
];

export default function SocialLinks({ isDark }) {
  return (
    <div className="flex flex-col gap-3">
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
            "group flex items-center justify-between rounded-2xl border p-4 transition-all duration-300",
            isDark
              ? "border-slate-800 bg-slate-900/40 hover:border-slate-700"
              : "border-slate-200 bg-white hover:border-slate-300",
            link.color
          )}
        >
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "rounded-xl p-2 transition-all duration-300 group-hover:scale-110",
                isDark ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-900"
              )}
            >
              {link.icon}
            </div>
            <span className="text-sm font-bold">{link.name}</span>
          </div>
          <motion.span className="translate-x-2 text-xs font-bold opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
            Follow →
          </motion.span>
        </motion.a>
      ))}
    </div>
  );
}
