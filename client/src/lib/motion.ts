import gsap from "gsap";

export const initMotionEngine = () => {
  if (typeof window === "undefined") return;
  
  // Update mouse position CSS variables for reactive effects
  window.addEventListener("mousemove", (e) => {
    document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
    document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
  });

  // Track scroll progress
  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight || 1);
    document.documentElement.style.setProperty("--scroll-progress", scrolled.toString());
  });
};

export const springReveal = (element: string | HTMLElement) => {
  return gsap.fromTo(element, 
    { opacity: 0, y: 30, rotateX: -10, filter: "blur(10px)" },
    { 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      filter: "blur(0px)",
      duration: 1.2, 
      ease: "elastic.out(1, 0.75)",
      stagger: 0.1
    }
  );
};

export const blockHover = (element: HTMLElement, intensity: number = 1) => {
  gsap.to(element, {
    scale: 1 + (0.02 * intensity),
    rotateY: 5 * intensity,
    rotateX: -5 * intensity,
    boxShadow: `0 20px 40px -10px var(--accent-glow)`,
    duration: 0.4,
    ease: "power2.out"
  });
};

export const blockLeave = (element: HTMLElement) => {
  gsap.to(element, {
    scale: 1,
    rotateY: 0,
    rotateX: 0,
    boxShadow: "none",
    duration: 0.6,
    ease: "elastic.out(1, 0.5)"
  });
};
