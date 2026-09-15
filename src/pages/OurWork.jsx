import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import Reveal, { RevealGroup, RevealItem } from "../components/Reveal";
import { TiltCard } from "../components/Motion";
import {
  IconDoc,
  IconChart,
  IconUsers,
  IconGlobe,
  IconBulb,
  IconDb,
  IconFlask,
  IconInstitution,
  IconGradCap,
  IconHandshake,
  IconScale,
  IconLeaf,
  IconBriefcase,
  IconGear,
  IconCoins,
} from "../components/Icons";

// Icon key -> component. Used both here and in the admin editor
// (Admin > Our Work Settings) so editors can pick an icon per card.
export const OUR_WORK_ICONS = {
  doc: IconDoc,
  chart: IconChart,
  users: IconUsers,
  globe: IconGlobe,
  bulb: IconBulb,
  db: IconDb,
  flask: IconFlask,
  institution: IconInstitution,
  gradcap: IconGradCap,
  handshake: IconHandshake,
  scale: IconScale,
  leaf: IconLeaf,
  briefcase: IconBriefcase,
  gear: IconGear,
  coins: IconCoins,
};

// Default content — shown until (or unless) an admin saves custom content
// in Firestore at siteSettings/ourWork.
const DEFAULT_HERO = {
  eyebrow: "Our Work",
  title: "How SOSARI works.",
  lead:
    "Six integrated areas — research, data and statistics, policy and advisory, monitoring and evaluation, knowledge sharing, and capacity building — all designed to turn evidence into impact.",
};

const DEFAULT_CTA = {
  eyebrow: "Work with SOSARI",
  title: "Have a research, data, policy or evaluation challenge?",
  text: "Bring the question. SOSARI can assemble the appropriate methods, expertise and evidence pathway.",
};

const DEFAULT_AREAS = [
  {
    num: "01",
    icon: "doc",
    title: "Research",
    text: "Applied and policy research built around Somalia's most pressing questions.",
    to: "/section/research",
  },
  {
    num: "02",
    icon: "chart",
    title: "Data & Statistics",
    text: "Survey design, field data collection, digital data systems and statistical analysis.",
    to: "/section/data",
  },
  {
    num: "03",
    icon: "users",
    title: "Policy & Advisory",
    text: "Policy analysis, strategic advisory and institutional development for national and local institutions.",
    to: "/section/policies",
  },
  {
    num: "04",
    icon: "globe",
    title: "M&E & Impact",
    text: "Baseline, midline and endline evaluations, third-party monitoring and learning.",
    to: "/section/evaluations",
  },
  {
    num: "05",
    icon: "bulb",
    title: "Knowledge",
    text: "Sharing knowledge, briefs and research findings with policymakers and the public.",
    to: "/section/knowledge",
  },
  {
    num: "06",
    icon: "db",
    title: "Capacity Building",
    text: "Training and sustainable technical support to strengthen institutional capacity.",
    to: "/section/dialogue",
  },
];

export default function OurWork() {
  const [hero, setHero] = useState(DEFAULT_HERO);
  const [cta, setCta] = useState(DEFAULT_CTA);
  const [areas, setAreas] = useState(DEFAULT_AREAS);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const snap = await getDoc(doc(db, "siteSettings", "ourWork"));
        if (mounted && snap.exists()) {
          const data = snap.data();
          setHero({
            eyebrow: data.eyebrow || DEFAULT_HERO.eyebrow,
            title: data.title || DEFAULT_HERO.title,
            lead: data.lead || DEFAULT_HERO.lead,
          });
          setCta({
            eyebrow: data.ctaEyebrow || DEFAULT_CTA.eyebrow,
            title: data.ctaTitle || DEFAULT_CTA.title,
            text: data.ctaText || DEFAULT_CTA.text,
          });
          if (Array.isArray(data.areas) && data.areas.length > 0) {
            setAreas(data.areas);
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  return (
    <>
      <header className="hero heroV2" style={{ minHeight: "auto", paddingBottom: 60 }}>
        <div className="wrap">
          <Reveal className="eyebrow2">{hero.eyebrow}</Reveal>
          <Reveal as="h1" delay={0.05}>{hero.title}</Reveal>
          <Reveal as="p" delay={0.1} className="lead">{hero.lead}</Reveal>
        </div>
      </header>

      <section>
        <div className="wrap">
          <RevealGroup className="cards" stagger={0.08}>
            {areas.map((area, i) => {
              const IconComp = OUR_WORK_ICONS[area.icon] || IconDoc;
              return (
                <RevealItem key={area.title || i}>
                  <TiltCard className="card">
                    <div className="num">
                      {area.num || String(i + 1).padStart(2, "0")} / {(area.title || "").toUpperCase()}
                    </div>
                    <div style={{ fontSize: 28, marginBottom: 10 }}><IconComp /></div>
                    <h3>{area.title}</h3>
                    <p>{area.text}</p>
                    <Link className="link" to={area.to || "/our-work"}>
                      Learn more →
                    </Link>
                  </TiltCard>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      <section>
        <div className="wrap">
          <Reveal className="ctaBand">
            <div>
              <div className="eyebrow2">{cta.eyebrow}</div>
              <h2>{cta.title}</h2>
              <p>{cta.text}</p>
            </div>
            <div className="actions">
              <Link className="btn" to="/partner">Start a conversation →</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}