import { Link } from "react-router-dom";
import Reveal, { RevealGroup, RevealItem } from "../components/Reveal";
import { TiltCard } from "../components/Motion";
import {
  IconDoc,
  IconChart,
  IconUsers,
  IconGlobe,
  IconBulb,
  IconDb,
} from "../components/Icons";

// Liiska 6-da qaybood ee "Our Work" — sawirka 2aad ee la keenay
// (Research, Data & Statistics, Policy & Advisory, M&E & Impact, Knowledge, Capacity Building)
const WORK_AREAS = [
  {
    num: "01",
    icon: <IconDoc />,
    title: "Research",
    text: "Cilmi-baaris la codsaday iyo mid siyaasadeed oo ku saleysan su'aalaha ugu muhiimsan ee Soomaaliya.",
    to: "/section/research",
  },
  {
    num: "02",
    icon: <IconChart />,
    title: "Data & Statistics",
    text: "Naqshadaynta sahamiyada, xog-ururinta, nidaamyada dhijitaalka ah iyo falanqaynta tirakoobka.",
    to: "/section/data",
  },
  {
    num: "03",
    icon: <IconUsers />,
    title: "Policy & Advisory",
    text: "Falanqaynta siyaasadaha, la-talin istaraatiiji ah, iyo horumarinta hay'adaha.",
    to: "/section/policies",
  },
  {
    num: "04",
    icon: <IconGlobe />,
    title: "M&E & Impact",
    text: "Qiimeynta hordhaca, dhexe iyo dhamaadka, kormeer dhinac-saddexaad ah iyo waxbarasho.",
    to: "/section/evaluations",
  },
  {
    num: "05",
    icon: <IconBulb />,
    title: "Knowledge",
    text: "Wadaagista aqoonta, wargeyska caafimaadka xogta iyo natiijooyinka cilmi-baarista.",
    to: "/section/knowledge",
  },
  {
    num: "06",
    icon: <IconDb />,
    title: "Capacity Building",
    text: "Tababar, dhisidda awoodaha hay'adaha iyo caawimaad farsamo oo waara.",
    to: "/section/capacity-building",
  },
];

export default function OurWork() {
  return (
    <>
      {/* Hoos-dhac (hero) yar oo si isku mid ah ula jaanqaada bogga guriga */}
      <header className="hero heroV2" style={{ minHeight: "auto", paddingBottom: 60 }}>
        <div className="wrap">
          <Reveal className="eyebrow2">Our Work</Reveal>
          <Reveal as="h1" delay={0.05}>
            Sida SOSARI <span className="accent">u shaqeeyo</span>.
          </Reveal>
          <Reveal as="p" delay={0.1} className="lead">
            Lix qaybood oo iskuxidhan — cilmi-baaris, xog iyo tirakoob, siyaasad iyo
            la-talin, kormeer iyo qiimeyn, aqoon-wadaag, iyo dhisidda awoodaha —
            oo dhammaantood loogu talagalay in la keeno xaqiiqo caddaymo ku salaysan.
          </Reveal>
        </div>
      </header>

      <section>
        <div className="wrap">
          <RevealGroup className="cards" stagger={0.08}>
            {WORK_AREAS.map((area) => (
              <RevealItem key={area.title}>
                <TiltCard className="card">
                  <div className="num">
                    {area.num} / {area.title.toUpperCase()}
                  </div>
                  <div style={{ fontSize: 28, marginBottom: 10 }}>{area.icon}</div>
                  <h3>{area.title}</h3>
                  <p>{area.text}</p>
                  <Link className="link" to={area.to}>
                    Fiiri faahfaahin →
                  </Link>
                </TiltCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section>
        <div className="wrap">
          <Reveal className="ctaBand">
            <div>
              <div className="eyebrow2">La shaqee SOSARI</div>
              <h2>Ma haysaa su'aal cilmi-baaris, xog, siyaasad ama qiimeyn ah?</h2>
              <p>Keen su'aasha. SOSARI wuxuu isu keeni karaa hab-hoyga, khibradda iyo caddaynta ku habboon.</p>
            </div>
            <div className="actions">
              <Link className="btn" to="/partner">Bilaw wada-hadal →</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}