import React, { useEffect, useRef } from "react";
import { cn } from "../lib/utils";

export default function VideoCard({ videoSrc, category, tools, onClick, isDark, isModalOpen }) {
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Intersection Observer for auto-play/pause
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.intersectionRatio >= 0.5 && !isModalOpen) {
                        video.play().catch(() => {});
                    } else {
                        video.pause();
                    }
                });
            },
            { threshold: 0.5 }
        );

        observer.observe(video);

        return () => {
            observer.disconnect();
        };
    }, [isModalOpen]);

    // Pause video when modal is open
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (isModalOpen) {
            video.pause();
        }
    }, [isModalOpen]);

    return (
        <div
            className="group cursor-pointer"
            onClick={onClick}
        >
            {/* Video Container */}
            <div className="relative overflow-hidden rounded-xl mb-4 w-1/4 max-w-[200px]">
                <video
                    ref={videoRef}
                    src={videoSrc}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    controls={false}
                    disablePictureInPicture
                    disableRemotePlayback
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                    style={{
                        userSelect: "none",
                        WebkitUserSelect: "none",
                        MozUserSelect: "none",
                        msUserSelect: "none",
                    }}
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
