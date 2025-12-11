"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { FloatingDock } from "@/components/ui/FloatingDock";
import { CustomCursor } from "@/components/ui/Cursor";

const navItems = [
    { label: "Home", href: "/" },
    { label: "Legacy", href: "/legacy" },
    { label: "Events", href: "/events" },
    { label: "Team", href: "/team" },
];

export default function EventsPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const linesRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set(titleRef.current, { opacity: 0, y: 100 });
            gsap.set(subtitleRef.current, { opacity: 0, y: 50 });
            gsap.set(glowRef.current, { opacity: 0, scale: 0.5 });

            const lines = linesRef.current?.querySelectorAll(".line");
            if (lines) {
                gsap.set(lines, { scaleY: 0 });
            }

            const tl = gsap.timeline({ delay: 0.3 });

            tl.to(glowRef.current, {
                opacity: 1,
                scale: 1,
                duration: 1.5,
                ease: "expo.out",
            });

            if (lines) {
                tl.to(lines, {
                    scaleY: 1,
                    duration: 1,
                    stagger: 0.1,
                    ease: "expo.out",
                }, "-=1");
            }

            tl.to(titleRef.current, {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: "expo.out",
            }, "-=0.8");

            tl.to(subtitleRef.current, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
            }, "-=0.6");

            gsap.to(glowRef.current, {
                scale: 1.1,
                opacity: 0.8,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut",
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <main className="bg-elite-black min-h-screen relative overflow-hidden">
            <CustomCursor />
            <FloatingDock items={navItems} />

            <div ref={linesRef} className="absolute inset-0 hidden md:flex justify-between px-20 pointer-events-none">
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className="line w-px h-full origin-top"
                        style={{
                            background: `linear-gradient(180deg, transparent 0%, rgba(212, 175, 55, ${0.1 - i * 0.01}) 50%, transparent 100%)`,
                        }}
                    />
                ))}
            </div>

            <div
                ref={glowRef}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] rounded-full pointer-events-none"
                style={{
                    background: "radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%)",
                    filter: "blur(40px)",
                }}
            />

            <div
                ref={containerRef}
                className="relative z-10 h-screen flex flex-col items-center justify-center px-6"
            >
                <h1
                    ref={titleRef}
                    className="text-[3rem] md:text-[6rem] lg:text-[8rem] font-bold text-center leading-tight"
                    style={{ fontFamily: "Clash Display, sans-serif" }}
                >
                    <span className="text-elite-silver">EVENTS</span>
                    <br />
                    <span
                        style={{
                            background: "linear-gradient(90deg, #D4AF37 0%, #F2D06B 50%, #D4AF37 100%)",
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        LOADING...
                    </span>
                </h1>

                <p
                    ref={subtitleRef}
                    className="text-base sm:text-lg md:text-xl text-elite-silver/50 text-center mt-6 sm:mt-8 max-w-sm sm:max-w-md px-4"
                >
                    Epic experiences are being crafted. Stay tuned for events that will redefine excellence.
                </p>

                <div className="mt-12 flex items-center gap-3">
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            className="w-3 h-3 rounded-full bg-elite-gold"
                            style={{
                                animation: `pulse 1.5s ease-in-out ${i * 0.2}s infinite`,
                            }}
                        />
                    ))}
                </div>

                <button className="mt-8 sm:mt-12 px-6 sm:px-8 py-3 sm:py-4 bg-elite-gold text-elite-black font-semibold rounded-full hover:scale-105 transition-transform duration-300 text-xs sm:text-sm uppercase tracking-widest min-h-[44px]">
                    Get Notified
                </button>
            </div>

            <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 text-elite-silver/20 text-xs sm:text-sm uppercase tracking-widest">
                Events
            </div>
        </main>
    );
}
