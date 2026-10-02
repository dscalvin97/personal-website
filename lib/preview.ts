export const PREVIEW_STORAGE_KEY = "decap-preview-draft";

/** Must match NEXT_PUBLIC_PREVIEW_TOKEN / public/admin/preview.js */
export const PREVIEW_TOKEN =
  process.env.NEXT_PUBLIC_PREVIEW_TOKEN ?? "";

export type PreviewPayload = {
  collection: "content" | "roles" | "education";
  entry: Record<string, unknown>;
  ts: number;
};

function expectedHash(): string {
  return `#preview=${PREVIEW_TOKEN}`;
}

export function isPreviewMode(): boolean {
  if (typeof window === "undefined") return false;
  if (!PREVIEW_TOKEN) return false;
  return window.location.hash === expectedHash();
}

export function readPreviewDraft(): PreviewPayload | null {
  if (typeof window === "undefined") return null;
  if (!isPreviewMode()) return null;
  try {
    const raw = window.localStorage.getItem(PREVIEW_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PreviewPayload;
    if (!parsed || typeof parsed !== "object") return null;
    if (!parsed.collection || !parsed.entry) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writePreviewDraft(payload: PreviewPayload): void {
  if (typeof window === "undefined") return;
  if (!isPreviewMode()) return;
  window.localStorage.setItem(PREVIEW_STORAGE_KEY, JSON.stringify(payload));
}

function asString(value: unknown): string {
  if (value == null) return "";
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  return "";
}

function asStringList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (item == null) return "";
      if (typeof item === "string") return item;
      if (typeof item === "object") {
        const obj = item as Record<string, unknown>;
        // Decap list widgets: { item: "..." } or { text: "..." }
        return asString(obj.item ?? obj.text ?? obj.name ?? "");
      }
      return asString(item);
    })
    .filter(Boolean);
}

/** Coerce Decap folder-entry shapes into the site's Role shape. */
export function normalizeRoleEntry(
  entry: Record<string, unknown>
): Record<string, unknown> {
  const slug = asString(entry.slug ?? entry.id ?? entry._filename ?? "");
  return {
    ...entry,
    id: asString(entry.id) || slug || undefined,
    slug: slug || undefined,
    company: asString(entry.company) || slug || "Untitled role",
    href: asString(entry.href) || undefined,
    title: asString(entry.title) || "",
    period: asString(entry.period) || "",
    location: asString(entry.location) || "",
    summary: asString(entry.summary) || "",
    highlights: asStringList(entry.highlights),
    tech: asStringList(entry.tech),
    tags: asStringList(entry.tags),
    order:
      typeof entry.order === "number"
        ? entry.order
        : Number(entry.order ?? 99) || 99,
  };
}

export function normalizeEducationEntry(
  entry: Record<string, unknown>
): Record<string, unknown> {
  const slug = asString(entry.slug ?? entry.credential ?? "");
  return {
    ...entry,
    slug: slug || undefined,
    credential: asString(entry.credential) || slug || "Entry",
    school: asString(entry.school) || "",
    year: asString(entry.year) || "",
    order:
      typeof entry.order === "number"
        ? entry.order
        : Number(entry.order ?? 99) || 99,
  };
}

export function mergeRoleDraft(
  roles: Array<Record<string, unknown>>,
  entry: Record<string, unknown>
): Array<Record<string, unknown>> {
  const draft = normalizeRoleEntry(entry);
  const key = String(draft.slug ?? draft.id ?? draft.company ?? "");
  const next = roles.filter((r) => {
    const k = String(r.slug ?? r.id ?? r.company ?? "");
    return k !== key;
  });
  next.push({ ...draft, __draft: true });
  return next.sort(
    (a, b) => Number(a.order ?? 99) - Number(b.order ?? 99)
  );
}

export function mergeEducationDraft(
  items: Array<Record<string, unknown>>,
  entry: Record<string, unknown>
): Array<Record<string, unknown>> {
  const draft = normalizeEducationEntry(entry);
  const key = String(draft.slug ?? draft.credential ?? "");
  const next = items.filter((r) => {
    const k = String(r.slug ?? r.credential ?? "");
    return k !== key;
  });
  next.push({ ...draft, __draft: true });
  return next.sort(
    (a, b) => Number(a.order ?? 99) - Number(b.order ?? 99)
  );
}
