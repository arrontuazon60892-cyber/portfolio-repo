import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
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
    { img: cert1, filename: "Arduino For Begginners - 2025 Complete Course.jpg", issuer: "Udemy" },
    { img: cert2, filename: "Arduino Masterclass For Begginers Ai, Robotics & ChatGPT.jpg", issuer: "Udemy" },
    { img: cert3, filename: "Basics of PowerBI Pros and Cons .jpg", issuer: "Microsoft" },
    { img: cert4, filename: "Chatbot using Natural Language Processing with Regex.jpg", issuer: "Coursera" },
    { img: cert5, filename: "The Road to IT Consulting Opportunities from Nothing.jpg", issuer: "LinkedIn" },
    { img: cert6, filename: "Transforming industries Through Technology Closing the Digital Divide for a Better Process.jpg", issuer: "Google" }
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
        <div className="space-y-3">
            <div className="grid gap-1">
                {certificates.map((cert, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        viewport={{ once: true }}
                        onClick={() => setSelectedCert(cert)}
                        className={cn(
                            "flex items-center justify-between p-3 rounded-lg transition-colors cursor-pointer group",
                            isDark ? "hover:bg-gray-900" : "hover:bg-gray-100"
                        )}
                    >
                        <div className="flex flex-col">
                            <span className="font-bold text-sm leading-snug">
                                {formatTitle(cert.filename)}
                            </span>
                            <span className="text-[0.7rem] font-bold uppercase tracking-wider mt-0.5">
                                {cert.issuer}
                            </span>
                        </div>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-all" />
                    </motion.div>
                ))}
            </div>

            <Modal
                isOpen={!!selectedCert}
                onClose={() => setSelectedCert(null)}
                isDark={isDark}
            >
                {selectedCert && (
                    <div className="flex flex-col items-center">
                        <img
                            src={selectedCert.img}
                            alt={formatTitle(selectedCert.filename)}
                            className="w-full max-h-[80vh] object-contain rounded-lg"
                        />
                        <div className="mt-6 text-center">
                            <h4 className="text-lg font-bold">{formatTitle(selectedCert.filename)}</h4>
                            <p className="text-sm font-bold uppercase tracking-widest mt-1">{selectedCert.issuer}</p>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}
