import { motion } from 'framer-motion';

export default function PixelCard({ children, variant = 'default', className = '' }) {
  return (
    <div className={`relative p-1 bg-black rounded-3xl overflow-hidden ${className}`}>
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `radial-gradient(var(--accent-color, #7c3aed) 1px, transparent 0)`,
        backgroundSize: '4px 4px'
      }} />
      <div className="relative bg-zinc-900/90 rounded-[22px] p-6 h-full border border-white/5">
        {children}
      </div>
    </div>
  );
}
