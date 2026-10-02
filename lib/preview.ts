export const PREVIEW_STORAGE_KEY = "decap-preview-draft";

export type PreviewPayload = {
  collection: "content" | "roles" | "education";
  entry: Record<string, unknown>;
  ts: number;
};

export function isPreviewMode(): boolean {
  if (typeof window === "undefined") return false;
  return new URLSearchParams(window.location.search).get("preview") === "1";
}

export function readPreviewDraft(): PreviewPayload | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(PREVIEW_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PreviewPayload;
  } catch {
    return null;
  }
}

export function writePreviewDraft(payload: PreviewPayload): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PREVIEW_STORAGE_KEY, JSON.stringify(payload));
}

export function mergeRoleDraft(
  roles: Array<Record<string, unknown>>,
  entry: Record<string, unknown>
): Array<Record<string, unknown>> {
  const slug = String(entry.slug ?? entry.id ?? "");
  const next = roles.filter((r) => String(r.slug ?? r.id ?? "") !== slug);
  next.push(entry);
  return next.sort(
    (a, b) => Number(a.order ?? 99) - Number(b.order ?? 99)
  );
}

export function mergeEducationDraft(
  items: Array<Record<string, unknown>>,
  entry: Record<string, unknown>
): Array<Record<string, unknown>> {
  const slug = String(entry.slug ?? entry.credential ?? "");
  const next = items.filter(
    (r) => String(r.slug ?? r.credential ?? "") !== slug
  );
  next.push(entry);
  return next.sort(
    (a, b) => Number(a.order ?? 99) - Number(b.order ?? 99)
  );
}
