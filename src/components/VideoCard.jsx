import React from "react";
import { Play } from "lucide-react";
import { cn } from "../lib/utils";

export default function VideoCard({ videoSrc, category, tools, onClick, isDark }) {
    return (
        <div
            className="group cursor-pointer"
            onClick={onClick}
        >
            {/* Video Container */}
            <div className="relative overflow-hidden rounded-xl mb-4 w-1/4 max-w-[200px]">
                <video
                    src={videoSrc}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    muted
                    onContextMenu={(e) => e.preventDefault()}
                />
                {/* Play Icon Overlay */}
                <div className={cn(
                    "absolute inset-0 flex items-center justify-center transition-opacity duration-300",
                    "bg-black/30 group-hover:bg-black/40"
                )}>
                    <div className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-300",
                        "group-hover:scale-110",
                        isDark ? "bg-white/90 text-black" : "bg-white/90 text-black"
                    )}>
                        <Play className="w-5 h-5 ml-1" fill="currentColor" />
                    </div>
                </div>
            </div>

            {/* Category */}
            <div className="mb-2">
                <span className={cn(
                    "text-xs font-bold uppercase tracking-wider",
                    isDark ? "text-gray-400" : "text-gray-500"
                )}>
                    {category}
                </span>
            </div>

            {/* Tools */}
            <div className="flex flex-wrap gap-2">
                {tools.map((tool) => (
                    <span
                        key={tool}
                        className={cn(
                            "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
                            isDark ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
                        )}
                    >
                        {tool}
                    </span>
                ))}
            </div>
        </div>
    );
}
