// Accepts loose input like "example.com" or "https://example.com/page" and
// returns a full https URL, or null when it isn't a plausible website address.
export function normalizeUrl(input: string): string | null {
    const trimmed = input.trim();
    if (!trimmed) return null;

    const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

    try {
        const url = new URL(withProtocol);
        if (!/^[\w-]+(\.[\w-]+)+$/.test(url.hostname)) return null;
        return url.toString();
    } catch {
        return null;
    }
}

export function getHostname(url: string): string {
    try {
        return new URL(url).hostname.replace(/^www\./, "");
    } catch {
        return url;
    }
}

// "https://www.example.com/" -> "www.example.com"
export function displayUrl(url: string): string {
    return url.replace(/^https?:\/\//i, "").replace(/\/$/, "");
}
