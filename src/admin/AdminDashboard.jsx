import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, query, orderBy, startAt, endAt } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigation } from "../contexts/NavigationContext";
import {
  IconDoc, IconFlask, IconChart, IconUsers, IconArrow, IconGlobe,
  IconBulb, IconChat, IconCheck, IconHandshake,
} from "../components/Icons";

// Visual identity per known nav key; anything the admin adds later (via
// Navigation Menu) falls back to DEFAULT_STYLE and still shows up here.
const SECTION_STYLE = {
  about: { icon: IconUsers, color: "blue" },
  research: { icon: IconFlask, color: "green" },
  data: { icon: IconChart, color: "purple" },
  policies: { icon: IconBulb, color: "gold" },
  evaluations: { icon: IconCheck, color: "teal" },
  knowledge: { icon: IconDoc, color: "rose" },
  dialogue: { icon: IconChat, color: "orange" },
};
const DEFAULT_STYLE = { icon: IconGlobe, color: "blue" };
const STAT_COLORS = ["blue", "green", "purple", "orange"];

async function countByPrefix(prefix) {
  const q = query(
    collection(db, "content"),
    orderBy("sectionKey"),
    startAt(prefix),
    endAt(prefix + "\uf8ff")
  );
  const snap = await getDocs(q);
  return snap.size;
}

export default function AdminDashboard() {
  const { nav: NAV } = useNavigation();
<<<<<<< HEAD
  const [counts, setCounts] = useState({ about: null, research: null, data: null, messages: null });
=======
  const [sectionCounts, setSectionCounts] = useState({});
  const [partnersCount, setPartnersCount] = useState(null);
  const [messagesCount, setMessagesCount] = useState(null);
  const [loading, setLoading] = useState(true);
>>>>>>> 7e95ed2 (Update project)

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const [results, partnersSnap, messagesSnap] = await Promise.all([
          Promise.all(NAV.map((g) => countByPrefix(`${g.key}/`))),
          getDocs(collection(db, "partners")),
          getDocs(collection(db, "messages")),
        ]);
        if (!mounted) return;
        const map = {};
        NAV.forEach((g, i) => { map[g.key] = results[i]; });
        setSectionCounts(map);
        setPartnersCount(partnersSnap.size);
        setMessagesCount(messagesSnap.size);
      } catch (e) {
        console.error(e);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, [NAV]);

  const totalContent = Object.values(sectionCounts).reduce((sum, n) => sum + (n || 0), 0);

  const statCards = [
    { key: "sections", label: "Navigation Sections", value: NAV.length, icon: IconGlobe },
    { key: "content", label: "Total Content Items", value: loading ? null : totalContent, icon: IconDoc },
    { key: "partners", label: "Partners", value: partnersCount, icon: IconHandshake },
    { key: "messages", label: "Partner Messages", value: messagesCount, icon: IconUsers },
  ];

  return (
    <div className="adminPage adminDash">
      <div className="adminWelcome">
        <div>
          <p className="adminWelcomeHi">Welcome back,</p>
          <h1>Admin <span className="adminWave">👋</span></h1>
          <p className="lead">Halkan waxaad ka maareysaa dhammaan content-ka, navigation-ka iyo partners-ka website-ka SOSARI — dhammaantood hal bog.</p>
        </div>
        <div className="adminWelcomeArt">
          <IconGlobe />
          <div className="adminWelcomeArtText">
            KNOWLEDGE<br />PEOPLE<br />PROGRESS<br />SOMALIA
          </div>
        </div>
      </div>

      <div className="adminStatGrid">
        {statCards.map((c, i) => (
          <div key={c.key} className={`adminStatCard adminStat-${STAT_COLORS[i % STAT_COLORS.length]}`}>
            <span className="adminStatIcon"><c.icon /></span>
            <div>
              <b>{c.value === null || c.value === undefined ? "…" : c.value}</b>
              <span>{c.label}</span>
            </div>
          </div>
        ))}
      </div>

      <h2 className="adminSectionHeading">Navigation Sections</h2>
      <div className="adminPanelGrid">
        {NAV.map((group, i) => {
          const style = SECTION_STYLE[group.key] || DEFAULT_STYLE;
          const leaves = group.items || (group.groups ? group.groups.flatMap((g) => g.items) : []);
          const count = sectionCounts[group.key];
          return (
            <div key={group.key} className="adminPanel">
              <div className="adminPanelHead">
                <span className={`adminPanelIcon adminPanelIcon-${style.color}`}><style.icon /></span>
                <div>
                  <h3>{group.label}</h3>
                  <span>{loading ? "Loading…" : `${count || 0} content item${count === 1 ? "" : "s"} · ${leaves.length} link${leaves.length === 1 ? "" : "s"}`}</span>
                </div>
                {leaves[0] && (
                  <Link to={`/admin/section/${leaves[0].key}`} className="adminPanelViewAll">View all <IconArrow /></Link>
                )}
              </div>
              <div className="adminPanelList">
                {leaves.length === 0 && <p className="adminPanelEmpty">Wali link lama darin. Tag Navigation Menu si aad u darto.</p>}
                {leaves.slice(0, 10).map((it) => (
                  <Link key={it.key} to={`/admin/section/${it.key}`} className="adminPanelRow">
                    {it.label} <IconArrow />
                  </Link>
                ))}
                {leaves.length > 10 && (
                  <Link to={`/admin/section/${leaves[0].key}`} className="adminPanelRow adminPanelRowMore">
                    +{leaves.length - 10} kale… <IconArrow />
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}