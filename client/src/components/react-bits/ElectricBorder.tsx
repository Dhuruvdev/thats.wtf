import { useRef, useState, useEffect } from 'react';
import './ElectricBorder.css';

export default function ElectricBorder({
  children,
  primaryColor = '#00ff00',
  secondaryColor = '#0000ff',
  duration = 3,
  className = '',
  ...props
}) {
  const containerRef = useRef(null);

  return (
    <div
      ref={containerRef}
      className={`electric-border-container ${className}`}
      style={{
        '--duration': `${duration}s`,
        '--primary-color': primaryColor,
        '--secondary-color': secondaryColor,
      } as any}
      {...props}
    >
      <div className="electric-border-glow"></div>
      <div className="electric-border-content">{children}</div>
    </div>
  );
}
