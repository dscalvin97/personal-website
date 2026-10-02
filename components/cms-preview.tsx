"use client";

import { useEffect, useState } from "react";
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

export function useCmsPreview() {
  const [state, setState] = useState<PreviewState>({
    mode: false,
    payload: null,
    nonce: 0,
  });

  useEffect(() => {
    if (!isPreviewMode()) return;

    const refresh = () => {
      setState((prev) => ({
        mode: true,
        payload: readPreviewDraft(),
        nonce: prev.nonce + 1,
      }));
    };

    refresh();
    window.addEventListener("message", refresh);
    window.addEventListener("storage", refresh);
    const interval = window.setInterval(refresh, 800);

    return () => {
      window.removeEventListener("message", refresh);
      window.removeEventListener("storage", refresh);
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
  const entry = payload.entry as Partial<T>;
  return {
    ...content,
    ...(entry.profile ? { profile: { ...content.profile, ...entry.profile } } : {}),
    ...(entry.skills ? { skills: { ...content.skills, ...entry.skills } } : {}),
    ...(entry.achievements
      ? {
          achievements: {
            ...content.achievements,
            ...entry.achievements,
          },
        }
      : {}),
    ...(entry.site ? { site: { ...content.site, ...entry.site } } : {}),
  };
}
