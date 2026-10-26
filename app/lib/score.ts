export type ScoreTone = {
    label: string;
    stroke: string;
    text: string;
    badge: string;
    bar: string;
};

export function getScoreTone(score: number): ScoreTone {
    if (score >= 80) {
        return {
            label: "Great",
            stroke: "#10b981",
            text: "text-emerald-600",
            badge: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
            bar: "bg-emerald-500",
        };
    }
    if (score >= 50) {
        return {
            label: "Needs work",
            stroke: "#f59e0b",
            text: "text-amber-600",
            badge: "bg-amber-50 text-amber-700 ring-amber-600/20",
            bar: "bg-amber-500",
        };
    }
    return {
        label: "Poor",
        stroke: "#f43f5e",
        text: "text-rose-600",
        badge: "bg-rose-50 text-rose-700 ring-rose-600/20",
        bar: "bg-rose-500",
    };
}
