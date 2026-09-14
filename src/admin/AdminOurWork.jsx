import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { OUR_WORK_ICONS } from "../pages/OurWork";

const DEFAULTS = {
  eyebrow: "Our Work",
  title: "How SOSARI works.",
  lead:
    "Six integrated areas — research, data and statistics, policy and advisory, monitoring and evaluation, knowledge sharing, and capacity building — all designed to turn evidence into impact.",
  ctaEyebrow: "Work with SOSARI",
  ctaTitle: "Have a research, data, policy or evaluation challenge?",
  ctaText: "Bring the question. SOSARI can assemble the appropriate methods, expertise and evidence pathway.",
  areas: [
    { num: "01", icon: "doc", title: "Research", text: "", to: "/section/research" },
    { num: "02", icon: "chart", title: "Data & Statistics", text: "", to: "/section/data" },
    { num: "03", icon: "users", title: "Policy & Advisory", text: "", to: "/section/policies" },
    { num: "04", icon: "globe", title: "M&E & Impact", text: "", to: "/section/evaluations" },
    { num: "05", icon: "bulb", title: "Knowledge", text: "", to: "/section/knowledge" },
    { num: "06", icon: "db", title: "Capacity Building", text: "", to: "/section/capacity-building" },
  ],
};

const ICON_KEYS = Object.keys(OUR_WORK_ICONS);

const EMPTY_AREA = { num: "", icon: "doc", title: "", text: "", to: "" };

export default function AdminOurWork() {
  const [form, setForm] = useState(DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getDoc(doc(db, "siteSettings", "ourWork")).then((snap) => {
      if (snap.exists()) {
        const data = snap.data();
        setForm({
          ...DEFAULTS,
          ...data,
          areas: Array.isArray(data.areas) && data.areas.length > 0 ? data.areas : DEFAULTS.areas,
        });
      }
      setLoading(false);
    });
  }, []);

  function updateField(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function updateArea(index, key, value) {
    setForm((f) => {
      const areas = f.areas.slice();
      areas[index] = { ...areas[index], [key]: value };
      return { ...f, areas };
    });
  }

  function addArea() {
    setForm((f) => {
      const nextNum = String(f.areas.length + 1).padStart(2, "0");
      return { ...f, areas: [...f.areas, { ...EMPTY_AREA, num: nextNum }] };
    });
  }

  function removeArea(index) {
    if (!window.confirm("Ma hubtaa inaad tirtirto qaybtan?")) return;
    setForm((f) => ({ ...f, areas: f.areas.filter((_, i) => i !== index) }));
  }

  function moveArea(index, dir) {
    setForm((f) => {
      const areas = f.areas.slice();
      const target = index + dir;
      if (target < 0 || target >= areas.length) return f;
      [areas[index], areas[target]] = [areas[target], areas[index]];
      return { ...f, areas };
    });
  }

  async function handleSave(e) {
    e.preventDefault();
    setError("");
    if (form.areas.some((a) => !a.title.trim())) {
      setError("Fadlan geli title (cinwaan) qayb kasta.");
      return;
    }
    setSaving(true);
    setSaved(false);
    try {
      await setDoc(doc(db, "siteSettings", "ourWork"), form, { merge: true });
      setSaved(true);
    } catch (err) {
      console.error(err);
      setError("Keydintu way fashilantay. Isku day mar kale.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="adminPage"><p>Loading…</p></div>;

  return (
    <div className="adminPage">
      <h1>Our Work Page Settings</h1>
      <p className="lead">
        Halkan waxaad ka maareysaa bogga "Our Work" — qoraalka hero-ga, CTA-ga hoose, iyo lixda
        (ama in ka badan) qaybood ee shaqada SOSARI. Waxaad ku dari kartaa qayb cusub, wax ka
        beddeli kartaa mid jira, ama tirtiri kartaa.
      </p>

      {error && <p style={{ color: "crimson" }}>{error}</p>}

      <form className="adminForm" onSubmit={handleSave}>
        <label>Eyebrow (qoraal gaaban ee sare)
          <input value={form.eyebrow} onChange={(e) => updateField("eyebrow", e.target.value)} />
        </label>
        <label>Title (cinwaanka weyn)
          <textarea rows={2} value={form.title} onChange={(e) => updateField("title", e.target.value)} />
        </label>
        <label>Lead text (sharaxaad)
          <textarea rows={3} value={form.lead} onChange={(e) => updateField("lead", e.target.value)} />
        </label>

        <label>CTA Eyebrow
          <input value={form.ctaEyebrow} onChange={(e) => updateField("ctaEyebrow", e.target.value)} />
        </label>
        <label>CTA Title
          <textarea rows={2} value={form.ctaTitle} onChange={(e) => updateField("ctaTitle", e.target.value)} />
        </label>
        <label>CTA Text
          <textarea rows={2} value={form.ctaText} onChange={(e) => updateField("ctaText", e.target.value)} />
        </label>

        <div className="adminFormActions">
          <button className="btn primary" type="submit" disabled={saving}>
            {saving ? "Keydinaya…" : "Keydi"}
          </button>
          {saved && <span style={{ color: "green", marginLeft: 10 }}>✅ La keydiyay</span>}
        </div>
      </form>

      <h2 style={{ marginTop: 34 }}>Work Areas (kaararka)</h2>
      <p className="lead">Isbeddel kasta halkan lama keydiyo ilaa aad taabato "Keydi" ee kore.</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 16 }}>
        {form.areas.map((area, i) => (
          <div key={i} className="adminForm" style={{ maxWidth: 760 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <strong style={{ fontSize: 12 }}>Qaybta {i + 1}</strong>
              <div style={{ display: "flex", gap: 6 }}>
                <button type="button" className="btn outline" style={{ fontSize: 10 }} onClick={() => moveArea(i, -1)} disabled={i === 0}>↑</button>
                <button type="button" className="btn outline" style={{ fontSize: 10 }} onClick={() => moveArea(i, 1)} disabled={i === form.areas.length - 1}>↓</button>
                <button type="button" className="btn outline" style={{ fontSize: 10 }} onClick={() => removeArea(i)}>Delete</button>
              </div>
            </div>

            <label>Number (tusaale: 01)
              <input value={area.num} onChange={(e) => updateArea(i, "num", e.target.value)} />
            </label>
            <label>Title
              <input value={area.title} onChange={(e) => updateArea(i, "title", e.target.value)} />
            </label>
            <label>Text (sharaxaad gaaban)
              <textarea rows={2} value={area.text} onChange={(e) => updateArea(i, "text", e.target.value)} />
            </label>
            <label>Link (goobta uu link-ku tago)
              <input value={area.to} onChange={(e) => updateArea(i, "to", e.target.value)} placeholder="/section/research" />
            </label>
            <label>Icon
              <select value={area.icon} onChange={(e) => updateArea(i, "icon", e.target.value)}>
                {ICON_KEYS.map((key) => (
                  <option key={key} value={key}>{key}</option>
                ))}
              </select>
            </label>
          </div>
        ))}
      </div>

      <div className="adminFormActions" style={{ marginTop: 16 }}>
        <button type="button" className="btn outline" onClick={addArea}>+ Ku dar qayb cusub</button>
        <button type="button" className="btn primary" onClick={handleSave} disabled={saving}>
          {saving ? "Keydinaya…" : "Keydi dhammaan isbeddelada"}
        </button>
        {saved && <span style={{ color: "green", marginLeft: 10 }}>✅ La keydiyay</span>}
      </div>
    </div>
  );
}