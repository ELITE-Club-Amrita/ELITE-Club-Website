"use client";

import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
    Users,
    Code2,
    Calendar,
    Megaphone,
    Palette,
    Sparkles,
    Linkedin,
    Github,
    Mail,
    X,
    Crown
} from "lucide-react";

type Department = "all" | "leadership" | "tech" | "events" | "pr" | "media" | "research" | "ambassadors";

interface TeamMember {
    id: string;
    name: string;
    role: string;
    department: Department;
    image: string;
    rollNumber?: string;
}

const departmentConfig: Record<Department, { label: string; color: string; icon: typeof Users; glow: string }> = {
    all: { label: "All", color: "#D4AF37", icon: Users, glow: "0 0 40px rgba(212,175,55,0.6)" },
    leadership: { label: "Leadership", color: "#D4AF37", icon: Crown, glow: "0 0 40px rgba(212,175,55,0.6)" },
    tech: { label: "Tech", color: "#60A5FA", icon: Code2, glow: "0 0 40px rgba(96,165,250,0.6)" },
    events: { label: "Events", color: "#A78BFA", icon: Calendar, glow: "0 0 40px rgba(167,139,250,0.6)" },
    pr: { label: "PR", color: "#4ADE80", icon: Megaphone, glow: "0 0 40px rgba(74,222,128,0.6)" },
    media: { label: "Media", color: "#F472B6", icon: Palette, glow: "0 0 40px rgba(244,114,182,0.6)" },
    research: { label: "Research", color: "#FB923C", icon: Sparkles, glow: "0 0 40px rgba(251,146,60,0.6)" },
    ambassadors: { label: "Ambassadors", color: "#D4AF37", icon: Users, glow: "0 0 40px rgba(212,175,55,0.6)" },
};

const teamMembers: TeamMember[] = [
    // Core Leadership
    { id: "1", name: "Anu G Kumar", role: "Faculty Coordinator", department: "all", image: "/team/Anu G Kumar (faculty coordinator).jpg" },
    { id: "2", name: "Anish Visakan", role: "President", department: "all", image: "" },
    { id: "3", name: "Korukonda L K M Prem Chand", role: "Vice President", department: "all", image: "/team/Korukonda L K M PremChand (Vice_President).jpg" },
    { id: "4", name: "Kunapuli Chandra Mouli", role: "Treasurer", department: "all", image: "" },

    // Technical Team
    { id: "5", name: "Krishna", role: "Technical Head", department: "tech", image: "" },
    { id: "6", name: "Sudharshana", role: "Co-Head (Backend)", department: "tech", image: "/team/Sudharsana Saravanan S (Co-Head Technical team).png" },
    { id: "7", name: "Samith Reddy", role: "Frontend", department: "tech", image: "/team/Samith Reddy (Technical team Frontend).png", rollNumber: "CB.SC.U4CSE24111" },
    { id: "8", name: "Swetha", role: "Frontend", department: "tech", image: "/team/SWETHA C (Technical team Frontend).png" },
    { id: "9", name: "Hari Prasath", role: "Backend", department: "tech", image: "/team/Hari Prasath K [Technical team - Backend].jpg" },
    { id: "10", name: "Shruhath", role: "Backend", department: "tech", image: "", rollNumber: "CB.SC.U4CSE24124" },

    // Research Team
    { id: "11", name: "Kamal", role: "Research Head", department: "research", image: "" },
    { id: "12", name: "Pavan", role: "Research Co-Head", department: "research", image: "" },
    { id: "13", name: "Jishnu", role: "Research", department: "research", image: "/team/Jishnu Teja Dandamudi (Research).jpg" },
    { id: "14", name: "Sricharan", role: "Research", department: "research", image: "/team/Sricharan_A_[Research-Team]..png" },
    { id: "15", name: "Nishrutha", role: "Research", department: "research", image: "" },

    // Event Management
    { id: "16", name: "Arjun Gopal", role: "Events Head", department: "events", image: "/team/Arjungopal_Anilkumar_[Event Management Executive Head]" },
    { id: "17", name: "Minoti", role: "Events Co-Head", department: "events", image: "/team/Minoti K (Event management co head).jpg" },
    { id: "18", name: "Lokesh", role: "Curation Head", department: "events", image: "" },
    { id: "19", name: "Meghana", role: "Events", department: "events", image: "/team/Meghana kotharu _ EventManagement- executive.jpg" },
    { id: "20", name: "Hemanth", role: "Events", department: "events", image: "/team/PAIDI HEMANTH [EVENT MANAGEMENT].jpg" },
    { id: "21", name: "Sumedh", role: "Curation", department: "events", image: "/team/sai sumedh pedarla (team curation).JPG" },

    // Public Relations
    { id: "22", name: "Sanjit", role: "PR Head", department: "pr", image: "/team/Sanjith M (Public Relations).jpg" },
    { id: "23", name: "Noha", role: "PR Co-Head", department: "pr", image: "/team/Noha Joshy Menachery ( PR Co-head).jpg" },
    { id: "24", name: "Ishwarya", role: "PR Co-Head", department: "pr", image: "/team/Ishwarya_Murugesan_Public_Relation_CoHead.jpg" },
    { id: "25", name: "Ganesh", role: "PR", department: "pr", image: "/team/Ganesh.jpg" },
    { id: "26", name: "Harsha", role: "PR", department: "pr", image: "/team/Chinnagundam Harshavardhan (Public Relations).jpg" },
    { id: "27", name: "Thoshan", role: "PR", department: "pr", image: "/team/Raja Thoshan (Public Relations).jpg" },

    // Media Team
    { id: "28", name: "Sandheep", role: "Media Head", department: "media", image: "" },
    { id: "29", name: "Surya", role: "Media Co-Head", department: "media", image: "" },
    { id: "30", name: "Anagha", role: "Media", department: "media", image: "" },
    { id: "31", name: "Jethin M S", role: "Media", department: "media", image: "" },

    // Ambassadors
    { id: "32", name: "Bhavesh", role: "Ambassador", department: "ambassadors", image: "/team/BHAVESH K (ELITE BRAND AMBASSADOR).jpg" },
    { id: "33", name: "Kushal", role: "Ambassador", department: "ambassadors", image: "" },
    { id: "34", name: "Amitha", role: "Ambassador", department: "ambassadors", image: "" },
    { id: "35", name: "Srisha", role: "Ambassador", department: "ambassadors", image: "/team/Srisha Satish Kanna(Brand Ambassador).jpg" },
];

function getInitials(name: string): string {
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

interface CardPosition {
    top: number;
    left: number;
    width: number;
    height: number;
}

interface GridCardProps {
    member: TeamMember;
    isActive: boolean;
    isSelected: boolean;
    isCore: boolean;
    onClick: (id: string, rect: CardPosition) => void;
}

function GridCard({ member, isActive, isSelected, isCore, onClick }: GridCardProps) {
    const config = departmentConfig[member.department === "all" ? "all" : member.department];
    const cardRef = useRef<HTMLDivElement>(null);

    const handleClick = () => {
        if (cardRef.current) {
            const rect = cardRef.current.getBoundingClientRect();
            onClick(member.id, {
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height,
            });
        }
    };

    const borderColor = isCore ? "#D4AF37" : config.color;
    const glowColor = isCore ? "rgba(212, 175, 55, 0.3)" : `${config.color}30`;

    return (
        <motion.div
            ref={cardRef}
            onClick={handleClick}
            className={`
                aspect-square rounded-xl overflow-hidden cursor-pointer
                transition-all duration-300
                ${isSelected ? "opacity-0" : ""}
            `}
            style={{
                background: isCore
                    ? "linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(10, 10, 10, 0.95) 100%)"
                    : "rgba(255, 255, 255, 0.03)",
                backdropFilter: "blur(10px)",
                border: isActive
                    ? `2px solid ${isCore ? borderColor : `${borderColor}40`}`
                    : "2px solid rgba(255,255,255,0.05)",
                boxShadow: isActive && isCore ? `0 0 20px ${glowColor}` : "none",
                opacity: isActive ? 1 : 0.3,
                transform: isActive ? "scale(1)" : "scale(0.95)",
            }}
            whileHover={isActive ? {
                scale: 1.05,
                boxShadow: `0 0 30px ${glowColor}`,
            } : {}}
            whileTap={isActive ? { scale: 0.98 } : {}}
        >
            <div className="relative w-full h-full">
                {member.image ? (
                    <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <div
                        className="w-full h-full flex items-center justify-center"
                        style={{
                            background: `linear-gradient(135deg, ${borderColor}20 0%, ${borderColor}05 100%)`,
                        }}
                    >
                        <span
                            className={`font-bold ${isCore ? "text-3xl md:text-4xl" : "text-2xl md:text-3xl"}`}
                            style={{ color: `${borderColor}60`, fontFamily: "Clash Display, sans-serif" }}
                        >
                            {getInitials(member.name)}
                        </span>
                    </div>
                )}

                <div
                    className="absolute inset-0"
                    style={{
                        background: isCore
                            ? "linear-gradient(to top, rgba(5,5,5,0.98) 0%, rgba(5,5,5,0.5) 40%, transparent 100%)"
                            : "linear-gradient(to top, rgba(5,5,5,0.95) 0%, rgba(5,5,5,0.3) 50%, transparent 100%)"
                    }}
                />

                {isCore && (
                    <div
                        className="absolute top-2 right-2 px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider"
                        style={{
                            background: "rgba(212, 175, 55, 0.2)",
                            color: "#D4AF37",
                            border: "1px solid rgba(212, 175, 55, 0.3)"
                        }}
                    >
                        Core
                    </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h3
                        className={`font-bold text-white truncate ${isCore ? "text-sm" : "text-xs"}`}
                        style={{ fontFamily: "Clash Display, sans-serif" }}
                    >
                        {member.name}
                    </h3>
                    <p
                        className={`font-medium truncate ${isCore ? "text-xs" : "text-[10px]"}`}
                        style={{ color: borderColor }}
                    >
                        {member.role}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

interface ExpandedCardProps {
    member: TeamMember;
    position: CardPosition;
    onClose: () => void;
    isCore: boolean;
}

function ExpandedCard({ member, position, onClose, isCore }: ExpandedCardProps) {
    const config = departmentConfig[member.department === "all" ? "all" : member.department];
    const borderColor = isCore ? "#D4AF37" : config.color;
    const glow = isCore ? "0 0 40px rgba(212,175,55,0.6)" : config.glow;

    const expandedWidth = Math.min(380, window.innerWidth - 32);
    const expandedHeight = Math.min(480, window.innerHeight - 150);

    const expandedLeft = Math.max(16, Math.min(
        position.left + (position.width / 2) - (expandedWidth / 2),
        window.innerWidth - expandedWidth - 16
    ));
    const expandedTop = Math.max(80, Math.min(
        position.top + (position.height / 2) - (expandedHeight / 2),
        window.innerHeight - expandedHeight - 100
    ));

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
                onClick={onClose}
            />

            <motion.div
                initial={{
                    position: "fixed",
                    top: position.top,
                    left: position.left,
                    width: position.width,
                    height: position.height,
                    borderRadius: 12,
                }}
                animate={{
                    top: expandedTop,
                    left: expandedLeft,
                    width: expandedWidth,
                    height: expandedHeight,
                    borderRadius: 24,
                }}
                exit={{
                    top: position.top,
                    left: position.left,
                    width: position.width,
                    height: position.height,
                    borderRadius: 12,
                    opacity: 0,
                }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                }}
                className="overflow-hidden border-2 z-[100]"
                style={{
                    background: "rgba(10, 10, 10, 0.98)",
                    borderColor: borderColor,
                    boxShadow: glow,
                }}
            >
                <motion.button
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                    <X size={20} className="text-white" />
                </motion.button>

                <div className="relative w-full h-[55%]">
                    {member.image ? (
                        <Image
                            src={member.image}
                            alt={member.name}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div
                            className="w-full h-full flex items-center justify-center"
                            style={{
                                background: `linear-gradient(135deg, ${borderColor}25 0%, ${borderColor}10 100%)`,
                            }}
                        >
                            <span
                                className="text-7xl font-bold"
                                style={{ color: `${borderColor}70`, fontFamily: "Clash Display, sans-serif" }}
                            >
                                {getInitials(member.name)}
                            </span>
                        </div>
                    )}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: "linear-gradient(to top, rgba(10,10,10,1) 0%, transparent 50%)"
                        }}
                    />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="text-2xl font-bold text-white"
                        style={{ fontFamily: "Clash Display, sans-serif" }}
                    >
                        {member.name}
                    </motion.h3>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-base font-semibold uppercase tracking-wider"
                        style={{ color: borderColor }}
                    >
                        {member.role}
                    </motion.p>

                    {member.rollNumber && (
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25 }}
                            className="text-sm text-white/40 font-mono"
                        >
                            {member.rollNumber}
                        </motion.p>
                    )}

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex gap-3 pt-3"
                    >
                        <motion.a
                            href="#"
                            onClick={(e) => e.stopPropagation()}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                        >
                            <Linkedin size={20} className="text-white" />
                        </motion.a>
                        <motion.a
                            href="#"
                            onClick={(e) => e.stopPropagation()}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                        >
                            <Github size={20} className="text-white" />
                        </motion.a>
                        <motion.a
                            href="#"
                            onClick={(e) => e.stopPropagation()}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                        >
                            <Mail size={20} className="text-white" />
                        </motion.a>
                    </motion.div>
                </div>
            </motion.div>
        </>
    );
}

export default function BentoTeamGrid() {
    const [activeFilter, setActiveFilter] = useState<Department>("all");
    const [selectedCard, setSelectedCard] = useState<{ member: TeamMember; position: CardPosition; isCore: boolean } | null>(null);

    const handleCardClick = useCallback((id: string, position: CardPosition) => {
        const index = teamMembers.findIndex(m => m.id === id);
        const member = teamMembers[index];
        if (member) {
            setSelectedCard({ member, position, isCore: index < 4 });
        }
    }, []);

    const handleClose = useCallback(() => {
        setSelectedCard(null);
    }, []);

    const filters: Department[] = ["all", "leadership", "tech", "research", "events", "pr", "media", "ambassadors"];

    return (
        <div className="min-h-screen bg-[#050505] py-20 px-4 md:px-8">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-8"
            >
                <h1
                    className="text-5xl md:text-7xl lg:text-9xl font-bold text-white/90 mb-6"
                    style={{ fontFamily: "Clash Display, sans-serif" }}
                >
                    The Team
                </h1>
                <p className="text-lg text-white/40 max-w-2xl mx-auto mb-8">
                    The constellation of minds driving ELITE forward. Click to explore.
                </p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="flex justify-center"
                >
                    <div
                        className="inline-flex items-center gap-1 md:gap-2 p-2 rounded-full border border-white/10"
                        style={{
                            background: "rgba(255, 255, 255, 0.03)",
                            backdropFilter: "blur(20px)",
                        }}
                    >
                        {filters.map((filter) => {
                            const config = departmentConfig[filter];
                            const Icon = config.icon;
                            const isActive = activeFilter === filter;

                            return (
                                <motion.button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    className={`
                                        flex items-center gap-2 px-3 md:px-4 py-2 md:py-2.5 rounded-full
                                        transition-all duration-300 text-sm font-medium
                                        ${isActive
                                            ? "text-black"
                                            : "text-white/60 hover:text-white hover:bg-white/5"
                                        }
                                    `}
                                    style={{
                                        backgroundColor: isActive ? config.color : "transparent",
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Icon size={16} />
                                    <span className="hidden md:inline">{config.label}</span>
                                </motion.button>
                            );
                        })}
                    </div>
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 md:gap-3 max-w-7xl mx-auto pb-20"
            >
                {teamMembers.map((member, index) => {
                    const isCore = index < 4;
                    const isActive = activeFilter === "all" ||
                        (activeFilter === "leadership" && isCore) ||
                        activeFilter === member.department;

                    return (
                        <GridCard
                            key={member.id}
                            member={member}
                            isActive={isActive}
                            isSelected={selectedCard?.member.id === member.id}
                            isCore={isCore}
                            onClick={handleCardClick}
                        />
                    );
                })}
            </motion.div>

            <AnimatePresence>
                {selectedCard && (
                    <ExpandedCard
                        key={selectedCard.member.id}
                        member={selectedCard.member}
                        position={selectedCard.position}
                        onClose={handleClose}
                        isCore={selectedCard.isCore}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
