import React from 'react';
import {
    Circle, Defs, Document, Font, G, Link, LinearGradient, Page, Path, pdf, Rect, Stop, StyleSheet, Svg, Text, View,
} from '@react-pdf/renderer';
import { PRIORITIES, type AuditReport, type Category, type Priority } from '@/app/lib/audit';
import { getScoreTone } from '@/app/lib/score';
import { getHostname } from '@/app/lib/url';

const colors = {
    ink: "#0f172a",
    body: "#475569",
    muted: "#64748b",
    faint: "#94a3b8",
    line: "#e2e8f0",
    soft: "#f8fafc",
    track: "#f1f5f9",
    brand: "#4f46e5",
};

const categoryColor: Record<Category, { fg: string; bg: string }> = {
    UX: { fg: "#db2777", bg: "#fdf2f8" },
    SEO: { fg: "#0284c7", bg: "#f0f9ff" },
    Accessibility: { fg: "#059669", bg: "#ecfdf5" },
    Performance: { fg: "#d97706", bg: "#fffbeb" },
    Content: { fg: "#7c3aed", bg: "#f5f3ff" },
};

const priorityColor: Record<Priority, { fg: string; bg: string; border: string; label: string }> = {
    high: { fg: "#be123c", bg: "#fff1f2", border: "#fecdd3", label: "High priority" },
    medium: { fg: "#b45309", bg: "#fffbeb", border: "#fde68a", label: "Medium priority" },
    low: { fg: "#475569", bg: "#f1f5f9", border: "#e2e8f0", label: "Low priority" },
};

let fontsRegistered = false;

// baseUrl is the site origin in the browser, or a folder path when rendering in Node.
export function registerPdfFonts(baseUrl: string) {
    if (fontsRegistered) return;
    Font.register({
        family: "Geist",
        fonts: [400, 500, 600, 700].map((fontWeight) => ({ src: `${baseUrl}/fonts/geist-${fontWeight}.woff`, fontWeight })),
    });
    // Keep words whole instead of hyphenating them across lines.
    Font.registerHyphenationCallback((word) => [word]);
    fontsRegistered = true;
}

const s = StyleSheet.create({
    // No lineHeight here: react-pdf drops render() text (page numbers) that inherits one, so text styles set their own.
    page: { fontFamily: "Geist", fontSize: 10, color: colors.body, paddingTop: 76, paddingBottom: 64, paddingHorizontal: 44 },
    header: { position: "absolute", top: 28, left: 44, right: 44, flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: colors.line },
    brand: { flexDirection: "row", alignItems: "center" },
    brandName: { marginLeft: 7, fontSize: 12, fontWeight: 600, color: colors.ink },
    headerMeta: { fontSize: 8.5, color: colors.faint },
    footerRule: { position: "absolute", bottom: 46, left: 44, right: 44, height: 1, backgroundColor: colors.line },
    footerLeft: { position: "absolute", bottom: 30, left: 44, fontSize: 8, color: colors.faint },
    footerRight: { position: "absolute", bottom: 30, left: 44, right: 44, textAlign: "right", fontSize: 8, color: colors.faint },

    eyebrow: { fontSize: 8.5, fontWeight: 600, color: colors.brand, letterSpacing: 1.2, textTransform: "uppercase", lineHeight: 1.5 },
    title: { marginTop: 6, fontSize: 24, fontWeight: 700, color: colors.ink, lineHeight: 1.2 },
    url: { marginTop: 3, fontSize: 10, color: colors.muted, textDecoration: "none", lineHeight: 1.5 },
    meta: { marginTop: 2, fontSize: 9, color: colors.faint, lineHeight: 1.5 },

    card: { borderWidth: 1, borderColor: colors.line, borderRadius: 10, padding: 18 },
    overview: { marginTop: 20, flexDirection: "row", alignItems: "center", backgroundColor: colors.soft },
    overviewText: { flex: 1, marginLeft: 20 },
    badge: { alignSelf: "flex-start", borderRadius: 20, paddingVertical: 2, paddingHorizontal: 8, fontSize: 8.5, fontWeight: 600, lineHeight: 1.5 },
    summary: { marginTop: 8, fontSize: 10.5, color: colors.body, lineHeight: 1.6 },

    section: { marginTop: 26 },
    sectionTitle: { fontSize: 13, fontWeight: 600, color: colors.ink, lineHeight: 1.5 },
    sectionHint: { marginTop: 2, fontSize: 9, color: colors.muted, lineHeight: 1.5 },

    categoryRow: { flexDirection: "row", alignItems: "flex-start", paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.track },
    categoryIcon: { width: 22, height: 22, borderRadius: 6, alignItems: "center", justifyContent: "center", marginRight: 10 },
    categoryInitial: { fontSize: 9, fontWeight: 700, lineHeight: 1.5 },
    categoryBody: { flex: 1 },
    categoryHead: { flexDirection: "row", alignItems: "center" },
    categoryName: { width: 92, fontSize: 10.5, fontWeight: 600, color: colors.ink, lineHeight: 1.5 },
    barTrack: { flex: 1, height: 5, borderRadius: 3, backgroundColor: colors.track },
    barFill: { height: 5, borderRadius: 3 },
    categoryScore: { width: 34, textAlign: "right", fontSize: 12, fontWeight: 700, lineHeight: 1.5 },
    verdict: { marginTop: 3, fontSize: 9, color: colors.muted, lineHeight: 1.5 },

    groupTitle: { marginTop: 14, marginBottom: 6, flexDirection: "row", alignItems: "center" },
    groupDot: { width: 6, height: 6, borderRadius: 3, marginRight: 6 },
    groupLabel: { fontSize: 9.5, fontWeight: 600, lineHeight: 1.5 },
    rec: { flexDirection: "row", marginTop: 6, padding: 12, borderWidth: 1, borderColor: colors.line, borderRadius: 8 },
    recNumber: { width: 18, height: 18, borderRadius: 9, backgroundColor: colors.track, alignItems: "center", justifyContent: "center", marginRight: 10 },
    recNumberText: { fontSize: 8, fontWeight: 600, color: colors.body, lineHeight: 1.5 },
    recBody: { flex: 1 },
    recHead: { flexDirection: "row", alignItems: "center", flexWrap: "wrap" },
    recTitle: { fontSize: 10.5, fontWeight: 600, color: colors.ink, marginRight: 6, lineHeight: 1.5 },
    tag: { borderRadius: 4, paddingVertical: 1, paddingHorizontal: 5, fontSize: 7.5, fontWeight: 600, lineHeight: 1.5 },
    recDetail: { marginTop: 3, fontSize: 9.5, color: colors.body, lineHeight: 1.5 },

    strength: { flexDirection: "row", alignItems: "flex-start", marginTop: 8 },
    strengthText: { flex: 1, marginLeft: 8, fontSize: 10, color: colors.body, lineHeight: 1.5 },

    note: { marginTop: 26, padding: 12, borderRadius: 8, backgroundColor: colors.soft },
    noteText: { fontSize: 8.5, color: colors.muted, lineHeight: 1.5 },
});

const PdfLogo = ({ size = 20 }: { size?: number }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24">
        <Defs>
            <LinearGradient id="logoGradient" x1="0" y1="0" x2="1" y2="1">
                <Stop offset="0" stopColor="#6366f1" />
                <Stop offset="1" stopColor="#7c3aed" />
            </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="24" height="24" rx="6" ry="6" fill="url(#logoGradient)" />
        {/* Lucide "scan-search", the same icon as the site logo */}
        <G transform="translate(5, 5) scale(0.5833)">
            {["M3 7V5a2 2 0 0 1 2-2h2", "M17 3h2a2 2 0 0 1 2 2v2", "M21 17v2a2 2 0 0 1-2 2h-2", "M7 21H5a2 2 0 0 1-2-2v-2", "m16 16-1.9-1.9"].map((d) => (
                <Path key={d} d={d} stroke="#ffffff" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" fill="none" />
            ))}
            <Circle cx="12" cy="12" r="3" stroke="#ffffff" strokeWidth={2.4} fill="none" />
        </G>
    </Svg>
);

const arcPath = (center: number, radius: number, score: number) => {
    const angle = (Math.min(score, 99.99) / 100) * 2 * Math.PI;
    const x = center + radius * Math.sin(angle);
    const y = center - radius * Math.cos(angle);
    return `M ${center} ${center - radius} A ${radius} ${radius} 0 ${angle > Math.PI ? 1 : 0} 1 ${x} ${y}`;
};

const PdfScoreRing = ({ score, size = 92 }: { score: number; size?: number }) => {
    const stroke = 8;
    const center = size / 2;
    const radius = center - stroke / 2;
    const tone = getScoreTone(score);
    return (
        <View style={{ width: size, height: size }}>
            <Svg width={size} height={size}>
                <Circle cx={center} cy={center} r={radius} stroke={colors.line} strokeWidth={stroke} fill="none" />
                {score > 0 && (
                    <Path d={arcPath(center, radius, score)} stroke={tone.stroke} strokeWidth={stroke} strokeLinecap="round" fill="none" />
                )}
            </Svg>
            <View style={{ position: "absolute", top: 0, left: 0, width: size, height: size, alignItems: "center", justifyContent: "center" }}>
                <Text style={{ fontSize: size * 0.3, fontWeight: 700, color: tone.ink, lineHeight: 1 }}>{score}</Text>
                <Text style={{ marginTop: 3, fontSize: 7.5, color: colors.muted, lineHeight: 1.5 }}>out of 100</Text>
            </View>
        </View>
    );
};

const CheckIcon = () => (
    <Svg width={12} height={12} viewBox="0 0 24 24" style={{ marginTop: 1.5 }}>
        <Circle cx="12" cy="12" r="11" fill="#d1fae5" />
        <Path d="m7.5 12.5 3 3 6-6.5" stroke="#059669" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
);

type Props = { report: AuditReport; url: string; generatedAt: Date };

const AuditPdf = ({ report, url, generatedAt }: Props) => {
    const hostname = getHostname(url);
    const overallTone = getScoreTone(report.overallScore);
    const date = generatedAt.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

    const categoryRows = report.categories.map((category, index) => {
        const tone = getScoreTone(category.score);
        const color = categoryColor[category.name] ?? categoryColor.UX;
        return (
            <View key={category.name} style={s.categoryRow} wrap={index === 0 ? undefined : false}>
                <View style={[s.categoryIcon, { backgroundColor: color.bg }]}>
                    <Text style={[s.categoryInitial, { color: color.fg }]}>{category.name.charAt(0)}</Text>
                </View>
                <View style={s.categoryBody}>
                    <View style={s.categoryHead}>
                        <Text style={s.categoryName}>{category.name}</Text>
                        <View style={s.barTrack}>
                            <View style={[s.barFill, { width: `${category.score}%`, backgroundColor: tone.stroke }]} />
                        </View>
                        <Text style={[s.categoryScore, { color: tone.ink }]}>{category.score}</Text>
                    </View>
                    <Text style={s.verdict}>{category.verdict}</Text>
                </View>
            </View>
        );
    });

    // Numbered in priority order, then split into groups.
    const groups = PRIORITIES.map((priority) => ({
        priority,
        items: report.recommendations.filter((r) => r.priority === priority),
    })).filter((group) => group.items.length > 0);

    let number = 0;
    const recGroups = groups.map(({ priority, items }) => {
        const p = priorityColor[priority];
        const cards = items.map((rec, index) => {
            number += 1;
            const color = categoryColor[rec.category] ?? categoryColor.UX;
            return (
                <View key={number} style={[s.rec, { borderLeftWidth: 3, borderLeftColor: p.border }]} wrap={index === 0 ? undefined : false}>
                    <View style={s.recNumber}>
                        <Text style={s.recNumberText}>{number}</Text>
                    </View>
                    <View style={s.recBody}>
                        <View style={s.recHead}>
                            <Text style={s.recTitle}>{rec.title}</Text>
                            <Text style={[s.tag, { color: color.fg, backgroundColor: color.bg }]}>{rec.category}</Text>
                        </View>
                        <Text style={s.recDetail}>{rec.detail}</Text>
                    </View>
                </View>
            );
        });
        const title = (
            <View style={s.groupTitle}>
                <View style={[s.groupDot, { backgroundColor: p.fg }]} />
                <Text style={[s.groupLabel, { color: p.fg }]}>{p.label} ({items.length})</Text>
            </View>
        );
        return { priority, title, cards };
    });

    const strengthRows = report.strengths.map((strength, index) => (
        <View key={strength} style={s.strength} wrap={index === 0 ? undefined : false}>
            <CheckIcon />
            <Text style={s.strengthText}>{strength}</Text>
        </View>
    ));

    return (
        <Document title={`Website audit: ${hostname}`} author="PageLens" subject="Website UX, SEO, accessibility and performance audit" creator="PageLens">
            <Page size="A4" style={s.page}>
                {/* Fixed elements go first: react-pdf can skip ones declared after content that wraps pages. */}
                <View style={s.header} fixed>
                    <View style={s.brand}>
                        <PdfLogo />
                        <Text style={s.brandName}>PageLens</Text>
                    </View>
                    <Text style={s.headerMeta}>Website Audit Report</Text>
                </View>
                <View style={s.footerRule} fixed />
                <Text style={s.footerLeft} fixed>PageLens · Audit of {hostname} · {date}</Text>
                <Text style={s.footerRight} fixed render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} />


                <View>
                    <Text style={s.eyebrow}>Audit report</Text>
                    <Text style={s.title}>{hostname}</Text>
                    <Link src={url} style={s.url}>{url}</Link>
                    <Text style={s.meta}>Generated on {date}</Text>
                </View>

                <View style={[s.card, s.overview]} wrap={false}>
                    <PdfScoreRing score={report.overallScore} />
                    <View style={s.overviewText}>
                        <Text style={[s.badge, { color: overallTone.ink, backgroundColor: overallTone.tint }]}>
                            Overall: {overallTone.label}
                        </Text>
                        <Text style={s.summary}>{report.summary}</Text>
                    </View>
                </View>

                {/* Each heading shares an unbreakable block with its first item so it is never left alone at a page end.
                    The first item is not unbreakable itself: nested wrap={false} views overlap at page breaks. */}
                <View style={s.section}>
                    <View wrap={false}>
                        <Text style={s.sectionTitle}>Category scores</Text>
                        <Text style={s.sectionHint}>How the site performs in each area we checked.</Text>
                        {categoryRows[0]}
                    </View>
                    {categoryRows.slice(1)}
                </View>

                {recGroups.length > 0 && (
                    <View style={s.section}>
                        {recGroups.flatMap((group, index) => [
                            <View key={`${group.priority}-title`} wrap={false}>
                                {index === 0 && (
                                    <View>
                                        <Text style={s.sectionTitle}>Recommendations</Text>
                                        <Text style={s.sectionHint}>
                                            {report.recommendations.length} improvements, ordered by impact. Start with the high priority items.
                                        </Text>
                                    </View>
                                )}
                                {group.title}
                                {group.cards[0]}
                            </View>,
                            ...group.cards.slice(1),
                        ])}
                    </View>
                )}

                {strengthRows.length > 0 && (
                    <View style={s.section}>
                        <View wrap={false}>
                            <Text style={s.sectionTitle}>What&apos;s working</Text>
                            <Text style={s.sectionHint}>Strengths worth keeping as you make changes.</Text>
                            {strengthRows[0]}
                        </View>
                        {strengthRows.slice(1)}
                    </View>
                )}

                <View style={s.note} wrap={false}>
                    <Text style={s.noteText}>
                        This report was generated by PageLens using Google Gemini AI. Scores are AI-based estimates intended as a
                        starting point for improvements, not exact measurements. Run a fresh audit at page-lens.netlify.app.
                    </Text>
                </View>
            </Page>
        </Document>
    );
};

export async function renderAuditPdf(report: AuditReport, url: string, fontBaseUrl: string): Promise<Blob> {
    registerPdfFonts(fontBaseUrl);
    return pdf(<AuditPdf report={report} url={url} generatedAt={new Date()} />).toBlob();
}

export default AuditPdf;
