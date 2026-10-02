"use client";

import { useEffect, useRef, useState } from "react";
import {
  isPreviewMode,
  mergeEducationDraft,
  mergeRoleDraft,
  readPreviewDraft,
  type PreviewPayload,
} from "@/lib/preview";

type PreviewState = {
  mode: boolean;
  payload: PreviewPayload | null;
  nonce: number;
};

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
      if (fromDraft) {
        apply(fromDraft);
        return;
      }
    };

    const onStorage = (event: StorageEvent) => {
      if (event.key && event.key !== "decap-preview-draft") return;
      apply(readPreviewDraft());
    };

    apply(readPreviewDraft());
    window.addEventListener("message", onMessage);
    window.addEventListener("storage", onStorage);

    // Light backup only — primary path is postMessage while typing
    const interval = window.setInterval(() => apply(readPreviewDraft()), 1000);

    return () => {
      window.removeEventListener("message", onMessage);
      window.removeEventListener("storage", onStorage);
      window.clearInterval(interval);
    };
  }, []);

  return state;
}

export function applyPreviewToRoles<T extends Record<string, unknown>>(
  roles: T[],
  payload: PreviewPayload | null,
  nonce: number
): T[] {
  if (!payload || payload.collection !== "roles") return roles;
  void nonce;
  return mergeRoleDraft(roles, payload.entry) as T[];
}

export function applyPreviewToEducation<T extends Record<string, unknown>>(
  items: T[],
  payload: PreviewPayload | null,
  nonce: number
): T[] {
  if (!payload || payload.collection !== "education") return items;
  void nonce;
  return mergeEducationDraft(items, payload.entry) as T[];
}

export function applyPreviewToContent<
  T extends {
    profile: Record<string, unknown>;
    skills: Record<string, unknown>;
    achievements: { items: Array<{ text: string }> };
    site: Record<string, unknown>;
  },
>(content: T, payload: PreviewPayload | null, nonce: number): T {
  if (!payload || payload.collection !== "content") return content;
  void nonce;
  const entry = payload.entry as Partial<T> & Record<string, unknown>;
  const profile = {
    ...content.profile,
    ...((entry.profile as Record<string, unknown>) || {}),
  };
  if (typeof entry.name === "string") profile.name = entry.name;
  if (typeof entry.email === "string") profile.email = entry.email;
  if (typeof entry.location === "string") profile.location = entry.location;
  if (typeof entry.headline === "string") profile.headline = entry.headline;
  if (typeof entry.summary === "string") profile.summary = entry.summary;
  if (typeof entry.resumePdf === "string") profile.resumePdf = entry.resumePdf;
  if (entry.links && typeof entry.links === "object") {
    profile.links = {
      ...(profile.links as Record<string, unknown>),
      ...(entry.links as Record<string, unknown>),
    };
  }

  const skills = {
    ...content.skills,
    ...((entry.skills as Record<string, unknown>) || {}),
  };
  if (typeof entry.languages === "string") skills.languages = entry.languages;

  const achievements = entry.achievements
    ? {
        ...content.achievements,
        ...(entry.achievements as { items: Array<{ text: string }> }),
      }
    : content.achievements;

  const site = {
    ...content.site,
    ...((entry.site as Record<string, unknown>) || {}),
  };
  if (typeof entry.updatedAt === "string") site.updatedAt = entry.updatedAt;

  return { ...content, profile, skills, achievements, site };
}
