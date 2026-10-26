export type ScoreTone = {
    label: string;
    stroke: string;
    // Hex values for contexts without Tailwind (e.g. the PDF report).
    ink: string;
    tint: string;
    text: string;
    badge: string;
    bar: string;
};

export function getScoreTone(score: number): ScoreTone {
    if (score >= 80) {
        return {
            label: "Great",
            stroke: "#10b981",
            ink: "#047857",
            tint: "#ecfdf5",
            text: "text-emerald-600",
            badge: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
            bar: "bg-emerald-500",
        };
    }
    if (score >= 50) {
        return {
            label: "Needs work",
            stroke: "#f59e0b",
            ink: "#b45309",
            tint: "#fffbeb",
            text: "text-amber-600",
            badge: "bg-amber-50 text-amber-700 ring-amber-600/20",
            bar: "bg-amber-500",
        };
    }
    return {
        label: "Poor",
        stroke: "#f43f5e",
        ink: "#be123c",
        tint: "#fff1f2",
        text: "text-rose-600",
        badge: "bg-rose-50 text-rose-700 ring-rose-600/20",
        bar: "bg-rose-500",
    };
}
