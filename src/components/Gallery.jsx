import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../lib/utils";

import gallaryImg from "../assets/gallary/gallary.webp";
import gallaryImg1 from "../assets/gallary/gallary1.webp";
import gallaryImg2 from "../assets/gallary/gallary2.webp";
import gallaryImg3 from "../assets/gallary/gallary3.webp";

const galleryImages = [
    { src: gallaryImg, alt: "Gallery 1" },
    { src: gallaryImg1, alt: "Gallery 2" },
    { src: gallaryImg2, alt: "Gallery 3" },
    { src: gallaryImg3, alt: "Gallery 4" },
];

export default function Gallery({ isDark }) {
    const scrollRef = useRef(null);

    const scroll = (dir) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: dir * 320, behavior: "smooth" });
        }
    };

    return (
        <div className="relative group">
            {/* Left Arrow */}
            <button
                onClick={() => scroll(-1)}
                className={cn(
                    "absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-10 p-2 rounded-full shadow-lg border transition-all opacity-0 group-hover:opacity-100",
                    isDark
                        ? "bg-gray-900 border-gray-700 text-white"
                        : "bg-white border-gray-200 text-black"
                )}
            >
                <ChevronLeft size={18} />
            </button>

            {/* Scrollable Images */}
            <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto pb-2"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                {galleryImages.map((img, idx) => (
                    <div
                        key={idx}
                        className="flex-shrink-0 w-[280px] h-[200px] rounded-xl overflow-hidden"
                    >
                        <img
                            src={img.src}
                            alt={img.alt}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                ))}
            </div>

            {/* Right Arrow */}
            <button
                onClick={() => scroll(1)}
                className={cn(
                    "absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-10 p-2 rounded-full shadow-lg border transition-all opacity-0 group-hover:opacity-100",
                    isDark
                        ? "bg-gray-900 border-gray-700 text-white"
                        : "bg-white border-gray-200 text-black"
                )}
            >
                <ChevronRight size={18} />
            </button>
        </div>
    );
}
