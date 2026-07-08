import React from "react";
import { cn } from "../lib/utils";

export default function PosterCard({ imageSrc, category, tools, onClick, isDark }) {
    return (
        <div
            className="group cursor-pointer"
            onClick={onClick}
        >
            {/* Image Container */}
            <div className="relative overflow-hidden rounded-xl mb-4">
                <img
                    src={imageSrc}
                    alt={category}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
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
