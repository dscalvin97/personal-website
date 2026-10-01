import type { Metadata } from "next";
import {
  LinkLine,
  PageHeader,
  Section,
  SpecList,
} from "@/components/page-parts";

export const metadata: Metadata = {
  title: "Craft",
  description:
    "Calvin Dsouza — crochet and handmade work. Tension, loops, gauge.",
};

export default function CraftPage() {
  return (
    <main id="main">
      <PageHeader
        index="04"
        eyebrow="Craft"
        title={
          <>
            Same hands,{" "}
            <span className="italic text-brass">slower problem</span>.
          </>
        }
        lede="Crochet is how I remember that not everything needs a deploy. Tension control, gauge swatches, frogging when the row is wrong — process vocabulary that transfers."
      />

      <Section label="Why it stays">
        <div className="measure">
          <p>
            Screen work rewards speed. Craft punishes it. A skein and a hook
            reset the part of my brain that wants every problem to be a
            sprint ticket.
          </p>
          <p>
            Stitch patterns are algorithms. Increases are topology. A bad join
            looks exactly like a bad mesh edge. The 3D work got sharper after I
            started crocheting — and crochet got sharper when I stopped
            treating every project like it had to ship on a deadline.
          </p>
        </div>
      </Section>

      <Section label="How patterns are written">
        <SpecList
          items={[
            {
              k: "Front-load",
              v: "Skill level, yarn weight, hook, finished size — not buried on page nine",
            },
            {
              k: "Terms",
              v: "US terms by default; UK called out when I use it",
            },
            {
              k: "Voice",
              v: "Short steps. No filler. If a line doesn’t help, it isn’t in the PDF",
            },
            {
              k: "Where",
              v: "Digital patterns on Gumroad as they land",
            },
          ]}
        />
      </Section>

      <Section label="Tension notes">
        <div className="measure">
          <p>
            Digital goods live on{" "}
            <LinkLine href="https://dscalvin.gumroad.com/" external>
              Gumroad
            </LinkLine>
            . Patterns, materials, or a commission —{" "}
            <LinkLine href="https://www.linkedin.com/in/dscalvin" external>
              LinkedIn
            </LinkLine>
            .
          </p>
          <p>
            The copper loop on the{" "}
            <LinkLine href="/studio/">studio page</LinkLine> is this
            practice as geometry. Web software and yarn share one habit:
            finish the edge cleanly.
          </p>
        </div>
      </Section>
    </main>
  );
}
