import achievementsJson from "@/content/achievements.json";
import educationBsc from "@/content/education/bsc-computer-science.json";
import educationHsc from "@/content/education/hsc.json";
import educationMaac from "@/content/education/maac-game-design.json";
import educationSsc from "@/content/education/ssc.json";
import profileJson from "@/content/profile.json";
import roleFynd from "@/content/roles/fynd.json";
import roleHere from "@/content/roles/here.json";
import roleKolors from "@/content/roles/kolors.json";
import rolePowerweave from "@/content/roles/powerweave.json";
import roleSnapwork from "@/content/roles/snapwork.json";
import siteJson from "@/content/site.json";
import skillsJson from "@/content/skills.json";

export type Role = {
  id?: string;
  slug?: string;
  company: string;
  href?: string;
  title: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
  tech?: string[];
  tags?: string[];
  order?: number;
};

export type Education = {
  credential: string;
  school: string;
  year: string;
  order?: number;
};

function byOrder<T extends { order?: number }>(items: T[]): T[] {
  return [...items].sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

export const profile = profileJson;
export const skills = skillsJson;
export const site = siteJson;
export const updatedAt = siteJson.updatedAt;
export const achievements = (achievementsJson.items ?? []).map(
  (item: { text: string }) => item.text
);

export const roles = byOrder([
  roleKolors,
  roleSnapwork,
  roleFynd,
  roleHere,
  rolePowerweave,
]) as Role[];

export const education = byOrder([
  educationBsc,
  educationMaac,
  educationHsc,
  educationSsc,
]) as Education[];

export const resumeHref = profile.resumePdf;
