# Profile Lab - Animated Entrance Effects

## Overview
This directory contains reusable animated entrance effects for the Profile Lab customizable profile editor. Effects are built with **Framer Motion** and exported as **Lottie JSON assets** for integration across platforms.

## Effects

### 1. Neon Aura Glow
- **File**: `aura-glow.json`
- **Component**: `AuraGlowEffect.tsx`
- **Description**: Animated glow ring around profile avatar with pulsing purple + pink neon colors
- **Properties**:
  - `intensity`: 0.5-1.5 (controls glow brightness)
  - `speed`: 0.5-2 (controls animation speed)
- **Duration**: 2 seconds (looping)

### 2. Sparkle Particles
- **File**: `sparkles.json`
- **Component**: `SparkleEffect.tsx`
- **Description**: Floating sparkle particles with parallax motion and random opacity
- **Properties**:
  - `intensity`: 0.5-2 (controls particle count)
  - `speed`: 0.5-2 (controls animation speed)
  - `particleCount`: 8-20 (customizable particle count)
- **Duration**: 2.5 seconds (looping)

### 3. Burst Entrance Pop
- **File**: `burst.json`
- **Component**: `BurstEntranceEffect.tsx`
- **Description**: Quick glow burst with scale animation and shockwave ring
- **Properties**:
  - `intensity`: 0.5-1.5 (controls burst size)
  - `speed`: 0.5-2 (controls animation speed)
- **Duration**: 0.8 seconds (plays once on entrance)

## Integration Guide

### Using Effects in React Components

```jsx
import { AuraGlowEffect, SparkleEffect, BurstEntranceEffect } from "@/components/effects";

function MyProfile() {
  return (
    <div className="relative w-32 h-32 rounded-full overflow-hidden">
      <AuraGlowEffect enabled={true} intensity={1} speed={1} />
      {/* Your profile content */}
    </div>
  );
}
```

### Adding to Profile Preview

Effects are positioned absolutely within the profile card container:

```jsx
<div className="relative">
  {selectedEffect === "aura" && <AuraGlowEffect {...effectProps} />}
  {selectedEffect === "sparkles" && <SparkleEffect {...effectProps} />}
  {selectedEffect === "burst" && <BurstEntranceEffect {...effectProps} />}
</div>
```

### State Management

Store selected effect in your profile configuration:

```typescript
interface ProfileConfig {
  entranceEffect: "aura" | "sparkles" | "burst" | "none";
  effectIntensity: number;
  effectSpeed: number;
}
```

## Creating New Effects

### Template

```jsx
import { motion } from "framer-motion";

interface YourEffectProps {
  enabled?: boolean;
  intensity?: number;
  speed?: number;
}

export function YourEffect({ 
  enabled = true, 
  intensity = 1, 
  speed = 1 
}: YourEffectProps) {
  if (!enabled) return null;

  return (
    <motion.div
      // Your animation here
    />
  );
}
```

### Export as Lottie

1. Create animation in component
2. Export frame data using `framer-motion` with fixed viewport
3. Convert to Lottie JSON format
4. Place in `/public/assets/effects/`

## Performance Optimization

- All effects use GPU-accelerated transforms (scale, opacity)
- Particle counts scale with intensity
- Animations loop smoothly at 60fps
- Effects disable when `enabled={false}`

## File Structure

```
/src/components/effects/
├── index.ts                 # Barrel export
├── AuraGlowEffect.tsx
├── SparkleEffect.tsx
└── BurstEntranceEffect.tsx

/public/assets/effects/
├── aura-glow.json
├── sparkles.json
├── burst.json
└── EFFECTS_README.md (this file)
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

MIT - Free to use in Profile Lab and derivative works

## Future Enhancements

- [ ] WebGL particle system for better performance
- [ ] Custom color palette support
- [ ] Timeline editor for effect sequencing
- [ ] Mobile-optimized variants
- [ ] Sound design integration
- [ ] Effect presets library
