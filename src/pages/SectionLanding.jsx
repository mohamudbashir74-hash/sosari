import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigation } from "../contexts/NavigationContext";
import { SECTION_META, DEFAULT_SECTION_META } from "../config/sectionMeta";
import { fetchContentForKeys } from "../utils/content";
import ContentCard from "../components/ContentCard";
import Loader from "../components/Loader";
import Reveal, { RevealGroup, RevealItem } from "../components/Reveal";
import { TextReveal, TiltCard, BlobBg } from "../components/Motion";
import AboutOverview from "../components/AboutOverview";
import { RESEARCH_GROUP_META, RESEARCH_CHIP_ICONS } from "../config/researchThemesMeta";
import {
  IconHome, IconChevronRight, IconInstitution, IconFlask, IconDb,
  IconBulb, IconChart, IconDoc, IconChat, IconArrow, IconSearch,
} from "../components/Icons";
import NotFound from "./NotFound";

const ICONS = {
  institution: IconInstitution,
  flask: IconFlask,
  db: IconDb,
  bulb: IconBulb,
  chart: IconChart,
  doc: IconDoc,
  chat: IconChat,
};

export default function SectionLanding() {
  const { nav: NAV } = useNavigation();
  const { parent } = useParams();
  const group = NAV.find((g) => g.key === parent);
  const meta = SECTION_META[parent] || DEFAULT_SECTION_META;
  const Icon = ICONS[meta.icon] || IconDoc;

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [themeQuery, setThemeQuery] = useState("");

  useEffect(() => {
    if (!group) return;
    let mounted = true;
    setLoading(true);
    const allKeys = group.items
      ? group.items.map((i) => i.key)
      : group.groups.flatMap((g) => g.items.map((i) => i.key));
    fetchContentForKeys(allKeys).then((rows) => {
      if (mounted) {
        setItems(rows.sort((a, b) => (b.createdAtMs || 0) - (a.createdAtMs || 0)));
        setLoading(false);
      }
    });
    return () => { mounted = false; };
  }, [parent]);

  if (!group) return <NotFound />;

  const flatItems = group.items || (group.groups ? group.groups.flatMap((g) => g.items) : []);

  return (
    <div className="sectionPageWrap">
      <header className="sectionHero" style={{ "--accent": meta.accent }}>
        <BlobBg />
        <div className="wrap">
          <Reveal className="crumbs" as="nav" aria-label="Breadcrumb">
            <Link to="/"><IconHome /> Home</Link>
            <IconChevronRight className="crumbSep" />
            <span>{group.label}</span>
          </Reveal>

          <div className="sectionHeroBody">
            <Reveal delay={0.05} className="sectionIconBadge">
              <Icon />
            </Reveal>
            <div>
              <Reveal delay={0.1} className="eyebrow">{meta.tagline}</Reveal>
              <TextReveal text={group.label} as="h1" delay={0.14} />
              <Reveal delay={0.22} as="p" className="sectionHeroBlurb">{meta.blurb}</Reveal>
            </div>
          </div>
        </div>
      </header>

      {parent === "about" && <AboutOverview />}

      <section>
        <div className="wrap">
          {group.groups ? (
            <>
              <div className="researchThemesHeader">
                <div>
                  <Reveal className="eyebrow2">Explore</Reveal>
                  <Reveal as="h2" delay={0.05}>
                    Themes under <span className="accentText">{group.label}</span>
                  </Reveal>
                  <Reveal as="p" delay={0.1} className="lead">
                    Discover our key themes and explore the areas where we work to create
                    solutions for a better and more sustainable future.
                  </Reveal>
                </div>
                <Reveal delay={0.14} className="researchThemesArt">
                  <div className="researchSearchBar">
                    <IconSearch />
                    <input
                      type="text"
                      placeholder="Search themes, topics…"
                      value={themeQuery}
                      onChange={(e) => setThemeQuery(e.target.value)}
                    />
                  </div>
                  <div className="researchArtCursive">Knowledge today<br />A brighter tomorrow</div>
                </Reveal>
              </div>

              <div className="groupBlocks">
                {group.groups.map((g, gi) => {
                  const gm = RESEARCH_GROUP_META[g.subcap] || {};
                  const GroupIcon = gm.icon || IconDoc;
                  const q = themeQuery.trim().toLowerCase();
                  const visibleItems = q ? g.items.filter((it) => it.label.toLowerCase().includes(q)) : g.items;
                  if (q && visibleItems.length === 0) return null;
                  return (
                    <div key={g.subcap} className="groupBlock">
                      <div className="groupBlockHead">
                        <span className="groupBlockIcon" style={{ "--gc": gm.color || "var(--blue)" }}>
                          <GroupIcon />
                        </span>
                        <div className="groupBlockHeadText">
                          <Reveal as="h3" delay={gi * 0.04} className="groupBlockTitle">{g.subcap}</Reveal>
                          {gm.subtitle && <span className="groupBlockSubtitle">{gm.subtitle}</span>}
                        </div>
                        <Link to={`/section/${g.items[0].key}`} className="groupBlockViewAll" style={{ "--gc": gm.color || "var(--blue)" }}>
                          View all <IconArrow />
                        </Link>
                      </div>
                      <RevealGroup className="chipGrid" stagger={0.05}>
                        {visibleItems.map((it) => {
                          const ChipIcon = RESEARCH_CHIP_ICONS[it.label] || IconDoc;
                          return (
                            <RevealItem key={it.key}>
                              <Link to={`/section/${it.key}`} className="chip" style={{ "--gc": gm.color || "var(--blue)" }}>
                                <span className="chipIcon"><ChipIcon /></span>
                                {it.label}
                                <IconChevronRight className="chipArrow" />
                              </Link>
                            </RevealItem>
                          );
                        })}
                      </RevealGroup>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              <Reveal className="eyebrow2">Explore</Reveal>
              <Reveal as="h2" delay={0.05}>Sub-sections under {group.label}</Reveal>
              <RevealGroup className="cards" stagger={0.06}>
                {flatItems.map((it, i) => (
                  <RevealItem key={it.key}>
                    <TiltCard>
                      <Link className="card sectionSubCard" to={`/section/${it.key}`}>
                        <div className="num">{String(i + 1).padStart(2, "0")}</div>
                        <h3>{it.label}</h3>
                        <span className="link">Explore →</span>
                      </Link>
                    </TiltCard>
                  </RevealItem>
                ))}
              </RevealGroup>
            </>
          )}
        </div>
      </section>

      <section className="knowledge">
        <div className="wrap">
          <Reveal className="eyebrow2">Latest</Reveal>
          <Reveal as="h2" delay={0.05}>Recent content in {group.label}</Reveal>
          {loading ? (
            <Loader />
          ) : items.length === 0 ? (
            <Reveal as="p" className="lead">No published content yet in this section.</Reveal>
          ) : (
            <RevealGroup className="pubs" stagger={0.07}>
              {items.map((item) => (
                <RevealItem key={item.id}>
                  <TiltCard><ContentCard item={item} /></TiltCard>
                </RevealItem>
              ))}
            </RevealGroup>
          )}
        </div>
      </section>
    </div>
  );
}