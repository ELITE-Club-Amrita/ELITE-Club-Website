"use client";

import BentoTeamGrid from "@/components/BentoTeamGrid";
import { FloatingDock } from "@/components/ui/FloatingDock";
import { CustomCursor } from "@/components/ui/Cursor";

const navItems = [
    { label: "Home", href: "/" },
    { label: "Legacy", href: "/legacy" },
    { label: "Events", href: "/events" },
    { label: "Team", href: "/team" },
];

export default function TeamPage() {
    return (
        <main className="bg-elite-black min-h-screen">
            <CustomCursor />
            <FloatingDock items={navItems} />
            <BentoTeamGrid />
        </main>
    );
}