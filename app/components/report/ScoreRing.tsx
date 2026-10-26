import React from 'react';
import { getScoreTone } from '@/app/lib/score';

type Props = {
    score: number;
    size?: number;
    strokeWidth?: number;
    label?: string;
};

const ScoreRing = ({ score, size = 120, strokeWidth = 10, label }: Props) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference * (1 - score / 100);
    const tone = getScoreTone(score);

    return (
        <div
            className="relative inline-flex shrink-0 items-center justify-center"
            style={{ width: size, height: size }}
            role="img"
            aria-label={`${label ?? "Score"}: ${score} out of 100`}
        >
            <svg width={size} height={size} className="-rotate-90">
                <circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={strokeWidth} className="stroke-slate-100" />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={tone.stroke}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    className="transition-[stroke-dashoffset] duration-1000 ease-out"
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`font-semibold leading-none tabular-nums ${tone.text}`} style={{ fontSize: size * 0.28 }}>
                    {score}
                </span>
                {label && <span className="mt-1 text-xs font-medium text-slate-500">{label}</span>}
            </div>
        </div>
    )
}

export default ScoreRing
