import { useEffect, useState } from "react";

export type Trigger = "mobile" | "night" | "idle" | "scroll" | "returning";

interface LogicState {
  isMobile: boolean;
  isNight: boolean;
  isIdle: boolean;
  scrollSpeed: number;
  isReturning: boolean;
}

export function useLogicEngine() {
  const [state, setState] = useState<LogicState>({
    isMobile: false,
    isNight: false,
    isIdle: false,
    scrollSpeed: 0,
    isReturning: false,
  });

  useEffect(() => {
    // 1. Mobile Detection
    const checkMobile = () => {
      setState(s => ({ ...s, isMobile: window.innerWidth < 768 }));
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // 2. Night Detection (6 PM to 6 AM)
    const checkNight = () => {
      const hour = new Date().getHours();
      setState(s => ({ ...s, isNight: hour >= 18 || hour < 6 }));
    };
    checkNight();

    // 3. Idle Detection (3 seconds)
    let idleTimer: NodeJS.Timeout;
    const resetIdle = () => {
      setState(s => ({ ...s, isIdle: false }));
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        setState(s => ({ ...s, isIdle: true }));
      }, 3000);
    };
    window.addEventListener("mousemove", resetIdle);
    window.addEventListener("keydown", resetIdle);
    resetIdle();

    // 4. Scroll Speed Detection
    let lastScroll = window.scrollY;
    let scrollTimeout: NodeJS.Timeout;
    const checkScroll = () => {
      const currentScroll = window.scrollY;
      const speed = Math.abs(currentScroll - lastScroll);
      lastScroll = currentScroll;
      setState(s => ({ ...s, scrollSpeed: speed }));
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setState(s => ({ ...s, scrollSpeed: 0 }));
      }, 100);
    };
    window.addEventListener("scroll", checkScroll);

    // 5. Returning Visitor Detection
    const hasVisited = localStorage.getItem("lab_visited");
    setState(s => ({ ...s, isReturning: !!hasVisited }));
    if (!hasVisited) {
      localStorage.setItem("lab_visited", "true");
    }

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mousemove", resetIdle);
      window.removeEventListener("keydown", resetIdle);
      window.removeEventListener("scroll", checkScroll);
      clearTimeout(idleTimer);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return state;
}
