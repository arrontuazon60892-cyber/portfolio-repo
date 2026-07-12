import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Pause, Volume2, VolumeX, Maximize, Minimize } from "lucide-react";

export default function VideoModal({ isOpen, onClose, videoSrc, poster, title = "Video project" }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const videoRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        let resetTimer;

        if (isOpen) {
            document.body.style.overflow = "hidden";
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
            }
        } else {
            document.body.style.overflow = "unset";
            if (videoRef.current) {
                videoRef.current.pause();
            }
        }

        resetTimer = window.setTimeout(() => setIsPlaying(false), 0);

        return () => {
            window.clearTimeout(resetTimer);
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        if (isOpen) {
            window.addEventListener("keydown", handleKeyDown);
        }
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const current = videoRef.current.currentTime;
            const duration = videoRef.current.duration;
            setProgress((current / duration) * 100);
        }
    };

    const handleSeek = (e) => {
        if (videoRef.current) {
            const rect = e.target.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const width = rect.width;
            const percentage = x / width;
            videoRef.current.currentTime = percentage * videoRef.current.duration;
        }
    };

    const toggleFullscreen = () => {
        if (!isFullscreen) {
            if (containerRef.current?.requestFullscreen) {
                containerRef.current.requestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
        setIsFullscreen(!isFullscreen);
    };

    const handleFullscreenChange = () => {
        setIsFullscreen(!!document.fullscreenElement);
    };

    useEffect(() => {
        document.addEventListener("fullscreenchange", handleFullscreenChange);
        return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
    }, []);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
                >
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Modal Content */}
                    <motion.div
                        ref={containerRef}
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                        className="relative w-full h-full max-w-6xl max-h-[90vh] flex flex-col pointer-events-auto bg-black rounded-3xl overflow-hidden"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-20 p-2 rounded-full shadow-lg border hover:scale-110 transition-all duration-200 bg-white/90 text-slate-900 border-slate-200"
                            aria-label="Close modal"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Video Container */}
                        <div className="flex-1 flex items-center justify-center relative">
                            <video
                                ref={videoRef}
                                src={videoSrc}
                                poster={poster}
                                className="w-full h-full object-contain"
                                controls
                                preload="metadata"
                                aria-label={`${title} video player`}
                                onTimeUpdate={handleTimeUpdate}
                                onClick={togglePlay}
                                onPlay={() => setIsPlaying(true)}
                                onPause={() => setIsPlaying(false)}
                                style={{
                                    userSelect: "none",
                                    WebkitUserSelect: "none",
                                    MozUserSelect: "none",
                                    msUserSelect: "none",
                                }}
                            >
                                <source src={videoSrc} type="video/mp4" />
                            </video>

                            {/* Play/Pause Overlay */}
                            {!isPlaying && (
                                <div 
                                    className="absolute inset-0 flex items-center justify-center cursor-pointer"
                                    onClick={togglePlay}
                                >
                                    <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center hover:scale-110 transition-transform">
                                        <Play className="w-10 h-10 ml-1 text-black" fill="currentColor" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Video Controls */}
                        <div className="bg-black/80 p-4 flex items-center gap-4">
                            {/* Play/Pause */}
                            <button
                                onClick={togglePlay}
                                className="p-2 rounded-full hover:bg-white/10 transition-colors text-white"
                                aria-label={isPlaying ? "Pause" : "Play"}
                            >
                                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                            </button>

                            {/* Mute/Unmute */}
                            <button
                                onClick={toggleMute}
                                className="p-2 rounded-full hover:bg-white/10 transition-colors text-white"
                                aria-label={isMuted ? "Unmute" : "Mute"}
                            >
                                {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                            </button>

                            {/* Progress Bar */}
                            <div className="flex-1 h-2 bg-white/20 rounded-full cursor-pointer relative" onClick={handleSeek}>
                                <div 
                                    className="absolute top-0 left-0 h-full bg-white rounded-full transition-all"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>

                            {/* Fullscreen */}
                            <button
                                onClick={toggleFullscreen}
                                className="p-2 rounded-full hover:bg-white/10 transition-colors text-white"
                                aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
                            >
                                {isFullscreen ? <Minimize className="w-6 h-6" /> : <Maximize className="w-6 h-6" />}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
