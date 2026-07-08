import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ZoomOut } from "lucide-react";
import { cn } from "../lib/utils";

export default function ImageModal({ isOpen, onClose, imageSrc, isDark }) {
    const [zoom, setZoom] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const imageRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
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

    const resetZoom = () => {
        setZoom(1);
        setPosition({ x: 0, y: 0 });
    };

    const handleZoomIn = () => {
        setZoom((prev) => Math.min(prev + 0.5, 5));
    };

    const handleZoomOut = () => {
        setZoom((prev) => {
            const newZoom = Math.max(prev - 0.5, 1);
            if (newZoom === 1) {
                setPosition({ x: 0, y: 0 });
            }
            return newZoom;
        });
    };

    const handleMouseDown = (e) => {
        if (zoom > 1) {
            setIsDragging(true);
            setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
        }
    };

    const handleMouseMove = (e) => {
        if (isDragging && zoom > 1) {
            e.preventDefault();
            setPosition({
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y,
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleWheel = (e) => {
        e.preventDefault();
        if (e.deltaY < 0) {
            handleZoomIn();
        } else {
            handleZoomOut();
        }
    };

    const handleImageClick = (e) => {
        e.stopPropagation();
    };

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
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                        className="relative w-full h-full max-w-6xl max-h-[90vh] flex flex-col pointer-events-auto"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-20 p-2 rounded-full shadow-lg border hover:scale-110 transition-all duration-200 bg-white/90 text-slate-900 border-slate-200"
                            aria-label="Close modal"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Zoom Controls */}
                        <div className="absolute top-4 left-4 z-20 flex gap-2">
                            <button
                                onClick={handleZoomOut}
                                disabled={zoom <= 1}
                                className="p-2 rounded-full shadow-lg border hover:scale-110 transition-all duration-200 bg-white/90 text-slate-900 border-slate-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                aria-label="Zoom out"
                            >
                                <ZoomOut className="w-5 h-5" />
                            </button>
                            <button
                                onClick={handleZoomIn}
                                disabled={zoom >= 5}
                                className="p-2 rounded-full shadow-lg border hover:scale-110 transition-all duration-200 bg-white/90 text-slate-900 border-slate-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                aria-label="Zoom in"
                            >
                                <ZoomIn className="w-5 h-5" />
                            </button>
                            <button
                                onClick={resetZoom}
                                disabled={zoom === 1}
                                className="px-3 py-2 rounded-full shadow-lg border hover:scale-110 transition-all duration-200 bg-white/90 text-slate-900 border-slate-200 text-xs font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Reset
                            </button>
                        </div>

                        {/* Image Container */}
                        <div
                            ref={containerRef}
                            className="flex-1 flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                            onWheel={handleWheel}
                        >
                            <div
                                className="relative"
                                style={{
                                    transform: `scale(${zoom}) translate(${position.x}px, ${position.y}px)`,
                                    transition: isDragging ? "none" : "transform 0.2s ease-out",
                                }}
                            >
                                <img
                                    ref={imageRef}
                                    src={imageSrc}
                                    alt="Design project"
                                    className="max-w-full max-h-[85vh] object-contain select-none pointer-events-none"
                                    draggable={false}
                                    onContextMenu={(e) => e.preventDefault()}
                                    onClick={handleImageClick}
                                    style={{
                                        userSelect: "none",
                                        WebkitUserSelect: "none",
                                        MozUserSelect: "none",
                                        msUserSelect: "none",
                                    }}
                                />
                            </div>
                        </div>

                        {/* Zoom Level Indicator */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
                            <span className="px-3 py-1 rounded-full bg-white/90 text-slate-900 text-xs font-bold border border-slate-200">
                                {Math.round(zoom * 100)}%
                            </span>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
