"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FloatingDock } from "@/components/ui/FloatingDock";
import { CustomCursor } from "@/components/ui/Cursor";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const navItems = [
    { label: "Home", href: "/" },
    { label: "Legacy", href: "/legacy" },
    { label: "Events", href: "/events" },
    { label: "Team", href: "/team" },
];

const coreTeam = [
    { name: "Anu G Kumar", role: "Faculty Coordinator", id: "" },
    { name: "Anish Visakan", role: "President", id: "CB.SC.U4ARE23007" },
    { name: "Korukonda L K M Prem Chand", role: "Vice President", id: "CB.EN.U4ELC23024" },
    { name: "Kunapuli Chandra Mouli", role: "Treasurer", id: "CB.EN.U4EEE23053" },
];

const departments = [
    {
        name: "Research",
        color: "#FB923C",
        members: [
            { name: "Kamal", role: "Head", id: "CB.EN.U4EEE23030" },
            { name: "Pavan", role: "Co-Head", id: "CB.EN.U4EEE24147" },
            { name: "Jishnu", role: "Member", id: "CB.SC.U4AIE24019" },
            { name: "Nishrutha", role: "Member", id: "CB.EN.U4AEE24036" },
            { name: "Sricharan", role: "Member", id: "CB.SC.U4CSE23764" },
        ],
    },
    {
        name: "Technical",
        color: "#60A5FA",
        members: [
            { name: "Krishna", role: "Head", id: "CB.EN.U4ELC23048" },
            { name: "Sudharshana", role: "Co-Head (Backend)", id: "CB.SC.U4CSE23054" },
            { name: "Samith Reddy", role: "Frontend", id: "CB.SC.U4CSE24111" },
            { name: "Swetha", role: "Frontend", id: "CB.SC.U4CSE23050" },
            { name: "Hari Prasath", role: "Backend", id: "CB.SC.U4CSE23515" },
        ],
    },
    {
        name: "Event Management - Execution",
        color: "#A78BFA",
        members: [
            { name: "Arjun Gopal", role: "Head", id: "CB.SC.U4AIE23271" },
            { name: "Minoti", role: "Co-Head", id: "CB.AI.U4AIM24130" },
            { name: "Meghana", role: "Member", id: "CB.SC.U4AIE24232" },
            { name: "Meera", role: "Member", id: "CB.AI.U4AID24031" },
            { name: "Hemanth", role: "Member", id: "CB.EN.U4MEE23030" },
        ],
    },
    {
        name: "Event Management - Curation",
        color: "#22D3EE",
        members: [
            { name: "Lokesh", role: "Head", id: "CB.SC.U4AIE23123" },
            { name: "Jayanth", role: "Co-Head", id: "" },
            { name: "P. Tarun", role: "Member", id: "CB.EN.U4ELC23034" },
            { name: "Sukanthan", role: "Member", id: "CB.SC.U4AIE24056" },
            { name: "Sumedh", role: "Member", id: "CB.EN.U4ARE24033" },
            { name: "Madhubala Murugesan", role: "Member", id: "CB.EN.U4EEE23118" },
        ],
    },
    {
        name: "Public Relations",
        color: "#4ADE80",
        members: [
            { name: "Sanjit", role: "Head", id: "CB.SC.U4CSE23243" },
            { name: "Noha", role: "Co-Head", id: "CB.SC.U4AIE24336" },
            { name: "Ishwarya", role: "Co-Head", id: "CB.SC.U4AIE24220" },
            { name: "Ganesh", role: "Member", id: "CB.EN.U4ECE24116" },
            { name: "Harsha", role: "Member", id: "CB.EN.U4ELC24011" },
            { name: "Thoshan", role: "Member", id: "CB.EN.U4ELC24029" },
        ],
    },
    {
        name: "Media",
        color: "#F472B6",
        members: [
            { name: "Sandheep", role: "Head", id: "CB.SC.U4CSE23144" },
            { name: "Surya", role: "Co-Head", id: "CB.EN.U4EEE24128" },
            { name: "Anagha", role: "Member", id: "CB.SC.U4AIE23212" },
            { name: "Jethin M S", role: "Member", id: "CB.EN.U4ELC24050" },
        ],
    },
    {
        name: "ELITE Ambassadors",
        color: "#D4AF37",
        members: [
            { name: "Bhavesh", role: "Ambassador", id: "CB.EN.U4CCE24014" },
            { name: "Kushal", role: "Ambassador", id: "CB.EN.U4CCE23065" },
            { name: "Amitha", role: "Ambassador", id: "CB.AI.U4AID24105" },
            { name: "Srisha Satish Kanna", role: "Ambassador", id: "CB.AI.U4AIM24046" },
        ],
    },
];

function getInitials(name: string): string {
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

export default function TeamPage() {
    const headerRef = useRef<HTMLDivElement>(null);
    const coreRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const title = headerRef.current?.querySelector("h1");
            const subtitle = headerRef.current?.querySelector("p");

            if (title) {
                gsap.set(title, { opacity: 0, y: 80 });
                gsap.to(title, { opacity: 1, y: 0, duration: 1.2, delay: 0.3, ease: "power4.out" });
            }
            if (subtitle) {
                gsap.set(subtitle, { opacity: 0, y: 40 });
                gsap.to(subtitle, { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "power3.out" });
            }
        });
        return () => ctx.revert();
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = coreRef.current?.querySelectorAll(".core-card");
            if (!cards) return;

            gsap.set(cards, { opacity: 0, y: 60, scale: 0.9 });

            ScrollTrigger.batch(cards, {
                onEnter: (batch) => {
                    gsap.to(batch, {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 1,
                        stagger: 0.15,
                        ease: "power3.out",
                    });
                },
                start: "top 85%",
            });
        });
        return () => ctx.revert();
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const depts = gridRef.current?.querySelectorAll(".department");
            if (!depts) return;

            gsap.set(depts, { opacity: 0, y: 60 });

            ScrollTrigger.batch(depts, {
                onEnter: (batch) => {
                    gsap.to(batch, {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: "power3.out",
                    });
                },
                start: "top 85%",
            });
        });
        return () => ctx.revert();
    }, []);

    return (
        <main className="bg-elite-black min-h-screen pt-24 pb-32">
            <CustomCursor />
            <FloatingDock items={navItems} />

            <section ref={headerRef} className="container mx-auto px-8 mb-16 text-center">
                <h1
                    className="text-6xl md:text-8xl lg:text-9xl font-bold text-elite-silver mb-8"
                    style={{ fontFamily: "Clash Display, sans-serif" }}
                >
                    The Team
                </h1>
                <p className="text-xl text-elite-silver/50 max-w-2xl mx-auto leading-relaxed">
                    The constellation of minds driving ELITE forward. Leaders, innovators, and dreamers united by a common vision.
                </p>
            </section>

            <section ref={coreRef} className="container mx-auto px-8 mb-24">
                <div className="text-center mb-12">
                    <h2
                        className="text-3xl md:text-4xl font-bold text-elite-gold mb-4"
                        style={{ fontFamily: "Clash Display, sans-serif" }}
                    >
                        Core Leadership
                    </h2>
                    <div className="w-24 h-0.5 bg-elite-gold mx-auto" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {coreTeam.map((member, index) => (
                        <div
                            key={member.name}
                            className="core-card group relative p-8 rounded-2xl bg-gradient-to-b from-elite-dark to-elite-black border border-elite-gold/30 hover:border-elite-gold/60 transition-all duration-500"
                        >
                            <div
                                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{
                                    background: "radial-gradient(circle at 50% 0%, rgba(212, 175, 55, 0.1) 0%, transparent 60%)",
                                }}
                            />

                            <div className="relative z-10 text-center">
                                <div
                                    className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 border-2 border-elite-gold/50 group-hover:border-elite-gold transition-colors duration-300"
                                    style={{
                                        background: "linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(212, 175, 55, 0.05) 100%)",
                                    }}
                                >
                                    <span
                                        className="text-2xl font-bold text-elite-gold"
                                        style={{ fontFamily: "Clash Display, sans-serif" }}
                                    >
                                        {getInitials(member.name)}
                                    </span>
                                </div>

                                <h3
                                    className="text-xl font-bold text-elite-silver group-hover:text-white transition-colors duration-300 mb-2"
                                    style={{ fontFamily: "Clash Display, sans-serif" }}
                                >
                                    {member.name}
                                </h3>

                                <p className="text-sm font-semibold text-elite-gold uppercase tracking-wider mb-3">
                                    {member.role}
                                </p>

                                {member.id && (
                                    <p className="text-xs text-elite-silver/30 font-mono">
                                        {member.id}
                                    </p>
                                )}
                            </div>

                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-elite-gold/50 to-transparent" />
                        </div>
                    ))}
                </div>
            </section>

            <section ref={gridRef} className="container mx-auto px-8">
                <div className="space-y-16">
                    {departments.map((dept) => (
                        <div key={dept.name} className="department">
                            <div className="flex items-center gap-4 mb-8">
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: dept.color }}
                                />
                                <h2
                                    className="text-2xl md:text-3xl font-bold text-elite-silver"
                                    style={{ fontFamily: "Clash Display, sans-serif" }}
                                >
                                    {dept.name}
                                </h2>
                                <div className="flex-1 h-px bg-elite-graphite/30" />
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                {dept.members.map((member) => (
                                    <div
                                        key={member.name}
                                        className="group p-4 rounded-xl bg-elite-dark border border-elite-graphite/30 hover:border-opacity-0 transition-all duration-300 relative overflow-hidden"
                                    >
                                        <div
                                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                            style={{
                                                background: `radial-gradient(circle at 50% 0%, ${dept.color}15 0%, transparent 70%)`,
                                            }}
                                        />

                                        <div className="relative z-10">
                                            <div
                                                className="w-12 h-12 rounded-full flex items-center justify-center mb-3 border transition-colors duration-300"
                                                style={{
                                                    backgroundColor: `${dept.color}15`,
                                                    borderColor: `${dept.color}30`,
                                                }}
                                            >
                                                <span
                                                    className="text-sm font-bold"
                                                    style={{ color: dept.color }}
                                                >
                                                    {getInitials(member.name)}
                                                </span>
                                            </div>

                                            <h3 className="text-sm font-semibold text-elite-silver group-hover:text-white transition-colors duration-300">
                                                {member.name}
                                            </h3>

                                            <p
                                                className="text-xs font-medium mt-1"
                                                style={{ color: dept.color }}
                                            >
                                                {member.role}
                                            </p>

                                            {member.id && (
                                                <p className="text-[10px] text-elite-silver/30 mt-2 font-mono">
                                                    {member.id}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="container mx-auto px-8 mt-24">
                <div className="text-center p-12 rounded-3xl bg-elite-dark border border-elite-graphite/30">
                    <h2
                        className="text-3xl md:text-4xl font-bold text-elite-silver mb-4"
                        style={{ fontFamily: "Clash Display, sans-serif" }}
                    >
                        Want to Join Us?
                    </h2>
                    <p className="text-lg text-elite-silver/50 max-w-xl mx-auto mb-8">
                        We are always looking for passionate individuals to join our team.
                    </p>
                    <button className="px-10 py-4 bg-elite-gold text-elite-black font-semibold rounded-full hover:scale-105 transition-transform duration-300">
                        Apply Now
                    </button>
                </div>
            </section>
        </main>
    );
}
