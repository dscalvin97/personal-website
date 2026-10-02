"use client";

import { useEffect, useRef, useState } from "react";
import {
  isPreviewMode,
  mergeEducationDraft,
  mergeRoleDraft,
  normalizeRoleEntry,
  readPreviewDraft,
  type PreviewPayload,
} from "@/lib/preview";

type PreviewState = {
  mode: boolean;
  payload: PreviewPayload | null;
  nonce: number;
};

export type PreviewCollection =
  | "shared"
  | "home"
  | "profile"
  | "skills"
  | "achievements"
  | "site-meta"
  | "work-page"
  | "developer"
  | "studio"
  | "craft"
  | "roles"
  | "education";

function normalizeMessage(data: unknown): PreviewPayload | null {
  if (!data || typeof data !== "object") return null;
  const msg = data as Record<string, unknown>;
  if (msg.source !== "decap-preview" || msg.type !== "draft") return null;
  if (!msg.collection || !msg.entry) return null;
  return {
    collection: msg.collection as PreviewPayload["collection"],
    entry: msg.entry as Record<string, unknown>,
    ts: Number(msg.ts || Date.now()),
  };
}

export function useCmsPreview() {
  const [state, setState] = useState<PreviewState>({
    mode: false,
    payload: null,
    nonce: 0,
  });
  const lastTs = useRef(0);

  useEffect(() => {
    if (!isPreviewMode()) return;

    const apply = (payload: PreviewPayload | null) => {
      if (payload && payload.ts && payload.ts <= lastTs.current) return;
      if (payload?.ts) lastTs.current = payload.ts;
      setState((prev) => ({
        mode: true,
        payload,
        nonce: prev.nonce + 1,
      }));
    };

    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      const fromDraft = normalizeMessage(event.data);
      if (fromDraft) apply(fromDraft);
    };

    const onStorage = (event: StorageEvent) => {
      if (event.key && event.key !== "decap-preview-draft") return;
      apply(readPreviewDraft());
    };

    apply(readPreviewDraft());
    window.addEventListener("message", onMessage);
    window.addEventListener("storage", onStorage);
    const interval = window.setInterval(() => apply(readPreviewDraft()), 1000);

    return () => {
      window.removeEventListener("message", onMessage);
      window.removeEventListener("storage", onStorage);
      window.clearInterval(interval);
    };
  }, []);

  return state;
}

function isCollection(
  payload: PreviewPayload | null,
  ...names: string[]
): boolean {
  return !!payload && names.includes(payload.collection);
}

function deepMerge<T>(base: T, patch: Record<string, unknown>): T {
  const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
  for (const [key, value] of Object.entries(patch)) {
    if (value === undefined) continue;
    const prev = out[key];
    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      prev &&
      typeof prev === "object" &&
      !Array.isArray(prev)
    ) {
      out[key] = deepMerge(prev, value as Record<string, unknown>);
    } else {
      out[key] = value;
    }
  }
  return out as T;
}

export function applyPreviewPage<T>(
  base: T,
  payload: PreviewPayload | null,
  collection: PreviewCollection,
  nonce: number
): T {
  if (!isCollection(payload, collection)) return base;
  void nonce;
  return deepMerge(base, payload!.entry);
}

export function applyPreviewRoles<T extends Record<string, unknown>>(
  roles: T[],
  payload: PreviewPayload | null,
  nonce: number
): T[] {
  if (!isCollection(payload, "roles")) return roles;
  void nonce;
  return mergeRoleDraft(roles, payload!.entry) as T[];
}

export function applyPreviewEducation<T extends Record<string, unknown>>(
  items: T[],
  payload: PreviewPayload | null,
  nonce: number
): T[] {
  if (!isCollection(payload, "education")) return items;
  void nonce;
  return mergeEducationDraft(items, payload!.entry) as T[];
}

export function draftCollection(
  payload: PreviewPayload | null
): PreviewCollection | null {
  if (!payload) return null;
  return payload.collection as PreviewCollection;
}

export function draftLabel(payload: PreviewPayload | null): string {
  const c = draftCollection(payload);
  const map: Record<string, string> = {
    shared: "Shared",
    home: "Home",
    profile: "Profile",
    skills: "Skills",
    achievements: "Achievements",
    "site-meta": "Site meta",
    "work-page": "Work page",
    developer: "Developer",
    studio: "3D",
    craft: "Craft",
    roles: "Role",
    education: "Education",
  };
  return c ? map[c] || c : "";
}

export function draftDetail(payload: PreviewPayload | null): string {
  if (!payload) return "";
  const e = payload.entry as Record<string, unknown>;
  const c = payload.collection;

  if (c === "roles") {
    const draft = normalizeRoleEntry(e) as { company: string; title: string };
    const company = String(draft.company || "");
    const title = String(draft.title || "");
    if (!company && !title) return "role draft (empty entry?)";
    return [company, title].filter(Boolean).join(" — ");
  }
  if (c === "education") {
    return String(e.credential || e.slug || "entry");
  }
  if (c === "profile") {
    return String(e.name || e.headline || "profile");
  }
  if (c === "home") {
    return String(e.nameLast || e.meta || "home");
  }
  if (c === "developer" || c === "studio" || c === "craft" || c === "work-page") {
    return String(e.title || e.eyebrow || c);
  }
  if (c === "skills") {
    return String(e.languages || "skills");
  }
  if (c === "achievements") {
    const items = e.items;
    if (Array.isArray(items)) return `${items.length} highlight(s)`;
    return "achievements";
  }
  if (c === "shared") {
    return String(e.brandName || e.tagline || "shared");
  }
  if (c === "site-meta") {
    return String(e.updatedAt || "site meta");
  }
  return c || "";
}

export function PreviewBanner({
  label,
  detail,
}: {
  label: string;
  detail?: string;
}) {
  return (
    <div
      className="border-b border-copper/50 bg-copper/10 px-5 py-2 text-center font-mono text-[0.7rem] tracking-[0.16em] text-copper uppercase"
      role="status"
    >
      CMS preview · {label}
      {detail ? ` · ${detail}` : ""} · not published
    </div>
  );
}
