import type { AuditReport } from "./audit";
import { getHostname } from "./url";

// The PDF renderer is large, so it is only loaded when someone downloads a report.
export async function downloadReportPdf(report: AuditReport, url: string) {
    const { renderAuditPdf } = await import("@/app/components/report/pdf/AuditPdf");
    const blob = await renderAuditPdf(report, url, window.location.origin);

    const date = new Date().toISOString().slice(0, 10);
    const slug = getHostname(url).replace(/[^a-z0-9]+/gi, "-").toLowerCase();

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `pagelens-audit-${slug}-${date}.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(link.href), 1000);
}
