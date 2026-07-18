import React from "react";
import { Music2 } from "lucide-react";
import { motion } from "framer-motion";

const socialLinks = [
  {
    name: "TikTok",
    icon: <Music2 className="h-5 w-5" />,
    url: "https://www.tiktok.com/@no0zee22?is_from_webapp=1&sender_device=pc",
    ariaLabel: "Visit Arron Tuazon on TikTok",
    color: "hover:text-white hover:bg-slate-800",
  },
];

export default function SocialLinks() {
  return (
    <div className="flex flex-col gap-2">
      {socialLinks.map((link, index) => (
        <motion.a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.ariaLabel}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * index }}
          className={`group flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/40 p-3 transition-all duration-300 hover:border-slate-700 ${link.color}`}
        >
          <div className="flex items-center gap-2">
            <div
              className="rounded-lg bg-slate-800 p-1.5 text-white transition-all duration-300 group-hover:scale-110"
            >
              {link.icon}
            </div>
            <span className="text-xs font-bold">{link.name}</span>
          </div>
          <motion.span className="translate-x-2 text-[10px] font-bold opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
            Follow →
          </motion.span>
        </motion.a>
      ))}
    </div>
  );
}
