"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FloatingDock } from "@/components/ui/FloatingDock";
import { MagneticWrapper, CustomCursor } from "@/components/ui/Cursor";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const navItems = [
    { label: "Home", href: "/" },
    { label: "Legacy", href: "/legacy" },
    { label: "Events", href: "/events" },
    { label: "Team", href: "/team" },
];

const acronymData = [
    { letter: "E", rest: "ntrepreneurship", description: "Building ventures from zero. Turning ideas into reality." },
    { letter: "L", rest: "eadership", description: "Guiding teams and inspiring change. Leading by example." },
    { letter: "I", rest: "nnovation", description: "Pushing boundaries. Creating solutions that reshape industries." },
    { letter: "T", rest: "raining", description: "Developing skills and expertise. Learning from the best." },
    { letter: "E", rest: "xposure", description: "Gaining real-world experience. Connecting with industry leaders." },
];

export default function Home() {
    const titleRef = useRef<HTMLHeadingElement>(null);
    const taglineRef = useRef<HTMLParagraphElement>(null);
    const scrollIndicatorRef = useRef<HTMLDivElement>(null);
    const horizontalSectionRef = useRef<HTMLElement>(null);
    const horizontalContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.3 });

            gsap.set([titleRef.current, taglineRef.current], { opacity: 0, y: 80 });
            gsap.set(scrollIndicatorRef.current, { opacity: 0, y: 20 });

            tl.to(titleRef.current, {
                opacity: 1,
                y: 0,
                duration: 1.4,
                ease: "expo.out",
            });

            tl.to(taglineRef.current, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
            }, "-=0.8");

            tl.to(scrollIndicatorRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
            }, "-=0.4");
        });

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        const section = horizontalSectionRef.current;
        const container = horizontalContainerRef.current;
        if (!section || !container) return;

        const timer = setTimeout(() => {
            const panels = container.querySelectorAll(".letter-panel");

            const scrollTween = gsap.to(container, {
                x: () => -(container.scrollWidth - window.innerWidth),
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: () => `+=${container.scrollWidth - window.innerWidth}`,
                    scrub: 1,
                    pin: true,
                    invalidateOnRefresh: true,
                },
            });

            panels.forEach((panel) => {
                const rest = panel.querySelector(".rest-word");
                const desc = panel.querySelector(".description");
                const underline = panel.querySelector(".underline");

                gsap.set(rest, { opacity: 0, x: -30 });
                gsap.set(desc, { opacity: 0, y: 30 });
                gsap.set(underline, { scaleX: 0, transformOrigin: "left" });

                ScrollTrigger.create({
                    trigger: panel,
                    containerAnimation: scrollTween,
                    start: "left 70%",
                    end: "left 30%",
                    scrub: true,
                    onUpdate: (self) => {
                        const p = self.progress;

                        gsap.set(rest, {
                            opacity: p,
                            x: -30 + (30 * p),
                        });

                        gsap.set(desc, {
                            opacity: Math.max(0, (p - 0.3) / 0.7),
                            y: 30 - (30 * Math.max(0, (p - 0.3) / 0.7)),
                        });

                        gsap.set(underline, {
                            scaleX: p,
                        });
                    },
                });
            });

            ScrollTrigger.refresh();
        }, 100);

        return () => {
            clearTimeout(timer);
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);

    return (
        <main className="bg-elite-black min-h-screen">
            <CustomCursor />
            <FloatingDock items={navItems} />

            <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <div
                        className="absolute inset-0 opacity-30"
                        style={{
                            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.1) 0%, transparent 50%)`,
                        }}
                    />
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `
                linear-gradient(rgba(42, 42, 42, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(42, 42, 42, 0.3) 1px, transparent 1px)
              `,
                            backgroundSize: "80px 80px",
                            maskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black 20%, transparent 70%)",
                        }}
                    />
                </div>

                <h1
                    ref={titleRef}
                    className="text-[4rem] sm:text-[7rem] md:text-[12rem] lg:text-[16rem] xl:text-[20rem] font-bold tracking-tighter leading-none relative z-10"
                    style={{
                        fontFamily: "Clash Display, sans-serif",
                        background: "linear-gradient(180deg, #ffffff 0%, #666666 100%)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}
                >
                    ELITE
                </h1>

                <p
                    ref={taglineRef}
                    className="text-sm sm:text-lg md:text-xl text-elite-gold tracking-[0.15em] sm:tracking-[0.3em] uppercase mt-2 relative z-10 px-4 text-center"
                >
                    Where Leaders are Forged
                </p>

                <div ref={scrollIndicatorRef} className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10">
                    <p className="text-[10px] tracking-[0.3em] text-elite-silver/50 uppercase">Scroll Down</p>
                </div>
            </section>

            <section ref={horizontalSectionRef} className="h-screen bg-elite-black overflow-hidden">
                <div ref={horizontalContainerRef} className="flex h-full items-center">
                    {acronymData.map((item, index) => (
                        <div
                            key={index}
                            className="letter-panel flex-shrink-0 w-screen h-full flex items-center justify-center"
                        >
                            <div className="flex flex-col items-center">
                                <div className="flex items-baseline">
                                    <span
                                        className="big-letter text-[6rem] sm:text-[10rem] md:text-[14rem] lg:text-[18rem] font-bold"
                                        style={{
                                            fontFamily: "Clash Display, sans-serif",
                                            background: "linear-gradient(180deg, #D4AF37 0%, #8a701e 100%)",
                                            backgroundClip: "text",
                                            WebkitBackgroundClip: "text",
                                            WebkitTextFillColor: "transparent",
                                        }}
                                    >
                                        {item.letter}
                                    </span>
                                    <span
                                        className="rest-word text-[1.5rem] sm:text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] font-bold text-elite-silver -ml-1 sm:-ml-2"
                                        style={{ fontFamily: "Clash Display, sans-serif" }}
                                    >
                                        {item.rest}
                                    </span>
                                </div>

                                <div className="underline w-16 sm:w-24 md:w-32 h-0.5 bg-elite-gold mt-2 sm:mt-4" />

                                <p className="description text-sm sm:text-base md:text-lg text-elite-silver/60 text-center mt-4 sm:mt-6 md:mt-8 max-w-xs sm:max-w-sm md:max-w-md px-4">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}

                    <div className="flex-shrink-0 w-screen h-full flex items-center justify-center px-4">
                        <div className="text-center">
                            <h2
                                className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-elite-silver mb-4 sm:mb-6"
                                style={{ fontFamily: "Clash Display, sans-serif" }}
                            >
                                This is ELITE
                            </h2>
                            <p className="text-base sm:text-lg md:text-xl text-elite-silver/50 mb-6 sm:mb-8 md:mb-10 max-w-sm sm:max-w-md md:max-w-lg mx-auto px-4">
                                A community of visionaries, leaders, and innovators.
                            </p>
                            <MagneticWrapper strength={0.2}>
                                <button className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 bg-elite-gold text-elite-black font-semibold rounded-full hover:scale-105 transition-transform duration-300 text-sm sm:text-base min-h-[44px]">
                                    Join Us
                                </button>
                            </MagneticWrapper>
                        </div>
                    </div>
                </div>
            </section>

            <section className="h-screen bg-elite-black flex items-center justify-center">
                <div className="text-center px-4 sm:px-6">
                    <h2
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-elite-silver mb-4 sm:mb-6"
                        style={{ fontFamily: "Clash Display, sans-serif" }}
                    >
                        Explore Our Legacy
                    </h2>
                    <a
                        href="/legacy"
                        className="inline-block px-6 sm:px-8 py-3 border border-elite-gold text-elite-gold rounded-full hover:bg-elite-gold hover:text-elite-black transition-all duration-300 text-sm sm:text-base min-h-[44px]"
                    >
                        View Timeline →
                    </a>
                </div>
            </section>
        </main>
    );
}
