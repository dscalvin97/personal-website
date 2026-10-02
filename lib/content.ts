import achievementsJson from "@/content/achievements.json";
import educationBsc from "@/content/education/bsc-computer-science.json";
import educationHsc from "@/content/education/hsc.json";
import educationMaac from "@/content/education/maac-game-design.json";
import educationSsc from "@/content/education/ssc.json";
import homeJson from "@/content/home.json";
import craftJson from "@/content/pages/craft.json";
import developerJson from "@/content/pages/developer.json";
import studioJson from "@/content/pages/studio.json";
import workPageJson from "@/content/pages/work.json";
import profileJson from "@/content/profile.json";
import roleFynd from "@/content/roles/fynd.json";
import roleHere from "@/content/roles/here.json";
import roleKolors from "@/content/roles/kolors.json";
import rolePowerweave from "@/content/roles/powerweave.json";
import roleSnapwork from "@/content/roles/snapwork.json";
import sharedJson from "@/content/shared.json";
import siteMetaJson from "@/content/site-meta.json";
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
  __draft?: boolean;
};

export type Education = {
  slug?: string;
  credential: string;
  school: string;
  year: string;
  order?: number;
  __draft?: boolean;
};

export type SpecItem = { k: string; v: string };
export type CaseItem = { n: string; title: string; meta: string; body: string };
export type IndexLink = {
  href: string;
  n: string;
  title: string;
  meta: string;
  blurb: string;
};

export type SharedContent = typeof sharedJson;
export type HomeContent = typeof homeJson;
export type ProfileContent = typeof profileJson;
export type SkillsContent = typeof skillsJson;
export type SiteMetaContent = typeof siteMetaJson;
export type WorkPageContent = typeof workPageJson;
export type DeveloperContent = typeof developerJson;
export type StudioContent = typeof studioJson;
export type CraftContent = typeof craftJson;

function byOrder<T extends { order?: number }>(items: T[]): T[] {
  return [...items].sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

export const shared = sharedJson as SharedContent;
export const home = homeJson as HomeContent;
export const profile = profileJson as ProfileContent;
export const skills = skillsJson as SkillsContent;
export const siteMeta = siteMetaJson as SiteMetaContent;
export const workPage = workPageJson as WorkPageContent;
export const developer = developerJson as DeveloperContent;
export const studio = studioJson as StudioContent;
export const craft = craftJson as CraftContent;

export const updatedAt = siteMeta.updatedAt;
export const resumeHref = profile.resumePdf;

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

export const educationList = education;
export const profileLinks = profile.links;
export const skillsList = skills;
export const site = siteMeta;
