import work from "@/content/work.json";

export type Role = (typeof work.roles)[number];
export type Education = (typeof work.education)[number];

export const profile = work.profile;
export const roles = work.roles as Role[];
export const education = work.education as Education[];
export const achievements = work.achievements;
export const skills = work.skills;
export const updatedAt = work.updatedAt;

export const resumeHref = work.profile.resumePdf;
