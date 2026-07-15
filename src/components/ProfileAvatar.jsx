import { motion } from "framer-motion";
import profileDark from "../assets/profile-hover.jpg";

export default function ProfileAvatar() {
  return (
    <motion.figure
      className="profile-portrait"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.55 }}
    >
      <img src={profileDark} alt="Arron Tuazon portrait" draggable="false" loading="eager" decoding="async" />
    </motion.figure>
  );
}
