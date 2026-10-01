import type { Metadata } from "next";
import {
  LinkLine,
  PageHeader,
  Section,
  SpecList,
} from "@/components/page-parts";

export const metadata: Metadata = {
  title: "Craft",
  description: "Calvin Dsouza — crochet and handmade work.",
};

export default function CraftPage() {
  return (
    <main id="main">
      <PageHeader
        index="04"
        eyebrow="Craft"
        title="Crochet."
        lede="Hooks, yarn, and slow making. Same curiosity as the 3D work — tension, topology, how a curve sits in space."
      />

      <Section label="What I make">
        <div className="measure">
          <p>
            Amigurumi, homeware, and whatever keeps my hands busy. Patterns
            and finished pieces show up on{" "}
            <LinkLine href="https://dscalvin.gumroad.com/" external>
              Gumroad
            </LinkLine>{" "}
            as they land.
          </p>
          <p>
            Stitch patterns are algorithms. Increases are topology. A bad join
            looks like a bad mesh edge.
          </p>
        </div>
      </Section>

      <Section label="How patterns are written">
        <SpecList
          items={[
            {
              k: "Front-load",
              v: "Skill level, yarn weight, hook, finished size — up front",
            },
            { k: "Terms", v: "US terms by default; UK called out when used" },
            {
              k: "Voice",
              v: "Short steps. No filler. If a line doesn’t help, it isn’t in the PDF",
            },
            { k: "Where", v: "Digital patterns on Gumroad" },
          ]}
        />
      </Section>

      <Section label="Contact">
        <div className="measure">
          <p>
            Patterns, materials, commissions —{" "}
            <LinkLine href="https://www.linkedin.com/in/dscalvin" external>
              LinkedIn
            </LinkLine>
            . Shop:{" "}
            <LinkLine href="https://dscalvin.gumroad.com/" external>
              Gumroad
            </LinkLine>
            . 3D side:{" "}
            <LinkLine href="/studio/">studio</LinkLine>
            .
          </p>
        </div>
      </Section>
    </main>
  );
}
