import React from "react";
import { cn } from "../lib/utils";

export default function PosterCard({ imageSrc, tools, onClick, isDark }) {
    return (
        <div
            className="group cursor-pointer"
            onClick={onClick}
        >
            {/* Image Container */}
            <div className="relative overflow-hidden rounded-xl mb-4 w-full">
                <img
                    src={imageSrc}
                    alt="Design project"
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
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
