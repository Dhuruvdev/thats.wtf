import { motion } from 'framer-motion';

export default function ProfileCard({ children, className = '' }) {
  return (
    <div className={`relative group overflow-hidden rounded-[32px] bg-[#121212] border border-white/5 shadow-2xl transition-all duration-500 hover:shadow-purple-500/10 ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="relative z-10 p-8">
        {children}
      </div>
    </div>
  );
}
