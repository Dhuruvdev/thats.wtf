import { gsap } from "gsap";

/**
 * Identity Engine Motion System
 * Powered by GSAP for physics-based deterministic animations
 */

export const springReveal = (elements: HTMLElement[]) => {
  gsap.fromTo(elements, 
    { opacity: 0, y: 30, scale: 0.95 },
    { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      duration: 1.2, 
      stagger: 0.1, 
      ease: "elastic.out(1, 0.8)",
      clearProps: "all"
    }
  );
};

export const blockHover = (el: HTMLElement, intensity: number = 1) => {
  gsap.to(el, {
    scale: 1 + (0.05 * intensity),
    y: -5 * intensity,
    rotation: 2 * (Math.random() - 0.5) * intensity,
    duration: 0.4,
    ease: "power2.out",
    boxShadow: `0 20px 40px rgba(0,0,0,0.3)`
  });
};

export const blockLeave = (el: HTMLElement) => {
  gsap.to(el, {
    scale: 1,
    y: 0,
    rotation: 0,
    duration: 0.6,
    ease: "elastic.out(1, 0.5)",
    boxShadow: "0 0px 0px rgba(0,0,0,0)"
  });
};

export const idlePulse = (el: HTMLElement) => {
  return gsap.to(el, {
    y: "-=10",
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
};

export const introPacman = (container: HTMLElement) => {
  const tl = gsap.timeline();
  
  // Create Pacman element
  const pacman = document.createElement("div");
  pacman.className = "pacman-intro";
  container.appendChild(pacman);

  tl.set(pacman, { 
    position: "fixed",
    top: "50%",
    left: "-100px",
    width: "100px",
    height: "100px",
    backgroundColor: "#FFD700",
    borderRadius: "50%",
    zIndex: 9999,
    clipPath: "polygon(100% 50%, 0% 0%, 0% 100%)" // Mock mouth
  })
  .to(pacman, {
    left: "110%",
    duration: 2,
    ease: "power1.inOut",
    onComplete: () => pacman.remove()
  });

  return tl;
};
