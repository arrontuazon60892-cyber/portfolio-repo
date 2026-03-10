import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Award } from "lucide-react";
import Modal from "./Modal";
import { cn } from "../lib/utils";

// Import certificates
import cert1 from "../assets/certicate/Arduino For Begginners - 2025 Complete Course.jpg";
import cert2 from "../assets/certicate/Arduino Masterclass For Begginers Ai, Robotics & ChatGPT.jpg";
import cert3 from "../assets/certicate/Basics of PowerBI Pros and Cons .jpg";
import cert4 from "../assets/certicate/Chatbot using Natural Language Processing with Regex.jpg";
import cert5 from "../assets/certicate/The Road to IT Consulting Opportunities from Nothing.jpg";
import cert6 from "../assets/certicate/Transforming industries Through Technology Closing the Digital Divide for a Better Process.jpg";

const certificates = [
    { img: cert1, filename: "Arduino For Begginners - 2025 Complete Course.jpg" },
    { img: cert2, filename: "Arduino Masterclass For Begginers Ai, Robotics & ChatGPT.jpg" },
    { img: cert3, filename: "Basics of PowerBI Pros and Cons .jpg" },
    { img: cert4, filename: "Chatbot using Natural Language Processing with Regex.jpg" },
    { img: cert5, filename: "The Road to IT Consulting Opportunities from Nothing.jpg" },
    { img: cert6, filename: "Transforming industries Through Technology Closing the Digital Divide for a Better Process.jpg" }
];

const formatTitle = (filename) => {
    return filename
        .replace(/\.[^/.]+$/, "") // Remove extension
        .replace(/-/g, " ")        // Replace dashes with spaces
        .replace(/\s+/g, " ")      // Trim extra spaces
        .trim();
};

export default function Certifications({ isDark }) {
    const [selectedCert, setSelectedCert] = useState(null);

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-black flex items-center gap-2 italic">
                    <Award className="w-5 h-5 text-blue-600" />
                    Recent Certifications
                </h3>
                <span className="text-xs font-bold opacity-40 hover:opacity-100 cursor-pointer transition-opacity">View All →</span>
            </div>

            <div className="grid gap-3">
                {certificates.map((cert, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        viewport={{ once: true }}
                        onClick={() => setSelectedCert(cert)}
                        className={cn(
                            "flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 cursor-pointer group",
                            isDark
                                ? "bg-slate-900/40 border-slate-800 hover:border-blue-500/30 hover:bg-slate-800/60"
                                : "bg-white border-slate-200 hover:border-blue-500/20 hover:bg-slate-50"
                        )}
                    >
                        <div className="flex flex-col">
                            <span className="font-bold text-sm sm:text-base leading-tight group-hover:text-blue-600 transition-colors">
                                {formatTitle(cert.filename)}
                            </span>
                            <span className="text-[0.7rem] font-bold opacity-40 uppercase tracking-widest mt-1">
                                Course Completion
                            </span>
                        </div>
                        <ChevronRight className="w-5 h-5 opacity-20 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </motion.div>
                ))}
            </div>

            <Modal
                isOpen={!!selectedCert}
                onClose={() => setSelectedCert(null)}
            >
                {selectedCert && (
                    <div className="flex flex-col items-center">
                        <img
                            src={selectedCert.img}
                            alt={formatTitle(selectedCert.filename)}
                            className="w-full max-h-[80vh] object-contain rounded-xl"
                        />
                        <div className="mt-4 text-center">
                            <h4 className="text-lg font-bold">{formatTitle(selectedCert.filename)}</h4>
                            <p className="text-sm opacity-60">Professional Certification</p>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}
