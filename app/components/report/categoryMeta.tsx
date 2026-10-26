import { IconType } from 'react-icons';
import { LuAccessibility, LuFileText, LuGauge, LuMousePointerClick, LuSearch } from 'react-icons/lu';
import type { Category, Priority } from '@/app/lib/audit';

export const categoryMeta: Record<Category, { icon: IconType; tint: string }> = {
    UX: { icon: LuMousePointerClick, tint: "bg-pink-50 text-pink-600" },
    SEO: { icon: LuSearch, tint: "bg-sky-50 text-sky-600" },
    Accessibility: { icon: LuAccessibility, tint: "bg-emerald-50 text-emerald-600" },
    Performance: { icon: LuGauge, tint: "bg-amber-50 text-amber-600" },
    Content: { icon: LuFileText, tint: "bg-violet-50 text-violet-600" },
};

export const priorityMeta: Record<Priority, { label: string; className: string }> = {
    high: { label: "High", className: "bg-rose-50 text-rose-700 ring-rose-600/20" },
    medium: { label: "Medium", className: "bg-amber-50 text-amber-700 ring-amber-600/20" },
    low: { label: "Low", className: "bg-slate-100 text-slate-600 ring-slate-500/20" },
};
